import * as React from "react";
import cx from "classnames";
import { kebabCase, capitalize, groupBy } from "lodash";

import { Context, Declaration } from "./context";

interface GroupDeclaration {
  [key: string]: Declaration[];
}

/** Function to group all the modules by standard and responsive features */
function buildTabContent(data: Declaration[]): GroupDeclaration {
  const UNDEFINED = "undefined";
  const mediaGroup = groupBy(data, "media");
  const standardGroup = {
    standard: mediaGroup[UNDEFINED],
  };
  const responsiveGroup = Object.keys(mediaGroup)
    .filter((v) => v !== UNDEFINED)
    .reduce((acc, curr) => {
      const lowerBoundWidthRegex = /(\d+)(px|em|rem|%)/;
      const match = curr.match(lowerBoundWidthRegex);
      if (match) {
        const [lowerBoundWidthRegex] = match;

        acc[lowerBoundWidthRegex as string] = mediaGroup[curr as string];
      }

      return acc;
    }, {} as GroupDeclaration);

  return { ...standardGroup, ...responsiveGroup };
}

/** Function to group all defintions by declaration type */
function buildTabSection(data: Declaration[]): GroupDeclaration {
  return groupBy(data, ({ nodes }) => nodes[0].prop);
}

const TableHeader: React.FunctionComponent<{
  header: string[];
}> = ({ header }) => (
  <thead className={cx("bg-gray-50")}>
    <tr>
      {header.map((label) => (
        <th
          key={label}
          scope="col"
          className={cx(
            "px-6",
            "py-3",
            "text-left",
            "text-xs",
            "font-medium",
            "text-gray-500",
            "uppercase",
            "tracking-wider"
          )}
        >
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

const Reveal: React.FunctionComponent<{
  label: string;
  content: Declaration[];
}> = ({ label, content }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  return (
    <>
      <tr>
        <td colSpan={2} className={cx("px-6", "py-4", "whitespace-nowrap")}>
          <button
            onClick={() => {
              setExpanded(!expanded);
            }}
            className={cx(
              "text-base",
              "text-left",
              "w-full",
              "block",
              "px-3",
              "py-2",
              "rounded-md",
              "font-medium",
              "text-gray-600",
              "transition-colors",
              "hover:bg-gray-100"
            )}
          >
            {label}
          </button>
        </td>
      </tr>
      {expanded &&
        content.map(({ selector, nodes }) => (
          <tr key={selector}>
            <td className={cx("px-6", "py-4")}>
              <div className={cx("flex", "justify-between", "items-center")}>
                <code
                  className={cx(
                    "w-1/2",
                    "whitespace-nowrap",
                    "font-mono",
                    "text-xs",
                    "text-purple-600"
                  )}
                >
                  {selector.replace(/:\w+$/, "")}
                </code>
                <code
                  className={cx(
                    "w-1/2",
                    // "whitespace-nowrap",
                    "font-mono",
                    "text-xs",
                    "text-blue-600"
                  )}
                >
                  {`${nodes[0].prop}: ${nodes[0].value}`}
                </code>
              </div>
            </td>
          </tr>
        ))}
    </>
  );
};

const Tabs: React.FunctionComponent<{
  content: GroupDeclaration;
}> = ({ content }) => {
  const [current, setCurrent] = React.useState<string>(Object.keys(content)[0]);

  return (
    <>
      <div className={cx("my-4", "flex")}>
        {Object.keys(content).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setCurrent(tab);
            }}
            className={cx(
              "text-base",
              "block",
              "mr-2",
              "px-3",
              "py-2",
              "rounded-md",
              "font-medium",
              "text-gray-400",
              "transition-colors",
              "hover:bg-gray-100",
              "hover:text-gray-600",
              {
                [cx("text-gray-800", "bg-gray-100")]: tab === current,
              }
            )}
          >
            {capitalize(tab)}
          </button>
        ))}
      </div>
      <div
        className={cx(
          "mt-2",
          "shadow",
          "overflow-hidden",
          "border-b",
          "border-gray-200",
          "sm:rounded-lg"
        )}
      >
        {Object.keys(content)
          .filter((v) => v === current)
          .map((contentKey) => {
            const groupedSection = buildTabSection(content[contentKey]);

            return (
              <table
                className={cx("min-w-full", "divide-y", "divide-gray-200")}
                key={contentKey}
              >
                <TableHeader header={["Class"]} />
                <tbody
                  className={cx("bg-white", "divide-y", "divide-gray-200")}
                >
                  {Object.keys(groupedSection).map((sectionKey) => (
                    <Reveal
                      label={sectionKey}
                      content={groupedSection[sectionKey]}
                      key={sectionKey}
                    />
                  ))}
                </tbody>
              </table>
            );
          })}
      </div>
    </>
  );
};

const Content: React.FunctionComponent = () => {
  const { state } = React.useContext(Context);

  return (
    <div className={cx("col-span-9", "px-4", "py-10")}>
      <div className={cx("grid", "gap-10", "grid-cols-1")}>
        {Object.keys(state).map((module, index) => {
          const content = state[module];
          const tabContent = buildTabContent(content);
          return (
            <div className={cx("col-span-1", "flex", "flex-col")} key={index}>
              <h2
                id={`${kebabCase(module)}`}
                className={cx("text-3xl", "font-sans", "font-bold")}
              >
                {capitalize(module.replace(/-/g, " "))}
              </h2>
              <Tabs content={tabContent} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
