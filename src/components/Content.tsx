import * as React from "react";
import cx from "classnames";
import { kebabCase, capitalize, groupBy } from "lodash";

import { Context } from "./context";

const Content: React.FunctionComponent = () => {
  const { state } = React.useContext(Context);

  return (
    <div className={cx("col-span-9", "p-4")}>
      <div className={cx("grid", "gap-10", "grid-cols-1")}>
        {Object.keys(state).map((module, index) => {
          const content = state[module];
          console.log(groupBy(content, "media"));
          return (
            <div className={cx("col-span-1", "flex", "flex-col")} key={index}>
              <h2
                id={`${kebabCase(module)}`}
                className={cx("text-2xl", "font-sans", "font-bold")}
              >
                {capitalize(module.replace(/-/g, " "))}
              </h2>
              <div
                className={cx(
                  "mt-4",
                  "shadow",
                  "overflow-hidden",
                  "border-b",
                  "border-gray-200",
                  "sm:rounded-lg"
                )}
              >
                <table
                  className={cx("min-w-full", "divide-y", "divide-gray-200")}
                >
                  <thead className={cx("bg-gray-50")}>
                    <tr>
                      <th
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
                        Class
                      </th>
                      <th
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
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={cx("bg-white", "divide-y", "divide-gray-200")}
                  >
                    {content.map(({ selector }) => (
                      <tr key={selector}>
                        <td
                          className={cx(
                            "px-6",
                            "py-4",
                            "whitespace-nowrap",
                            "font-mono",
                            "text-purple-600"
                          )}
                        >
                          {selector}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
