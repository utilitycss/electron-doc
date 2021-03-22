import * as React from "react";
import cx from "classnames";
import { kebabCase, capitalize } from "lodash";

import { Context } from "./context";

import logo from "../assets/logo.svg";

const Link: React.FunctionComponent<{
  label: string;
}> = ({ label }) => {
  return (
    <a
      href={`#{${kebabCase(label)}}`}
      className={cx(
        "font-sans",
        "transition-colors",
        "hover:bg-gray-800",
        "text-white",
        "text-base",
        "block",
        "px-3",
        "py-2",
        "rounded-md"
      )}
    >
      {label}
    </a>
  );
};

const Sidebar: React.FunctionComponent = () => {
  const { state } = React.useContext(Context);

  return (
    <div className={cx("col-span-3", "bg-gray-900", "p-6", "min-h-screen")}>
      <ul className={cx("sticky", "top-6")}>
        <li className={cx("mb-6", "flex")}>
          <u
            dangerouslySetInnerHTML={{
              __html: logo,
            }}
          />
        </li>
        <li className={cx("mb-6")}>
          <h3 className={cx("font-sans", "text-white", "text-xl", "font-bold")}>
            Overview
          </h3>
          <ul className={cx("mt-4")}>
            <li>
              <Link label={"Stats"} />
            </li>
          </ul>
        </li>
        <li>
          <h3 className={cx("font-sans", "text-white", "text-xl", "font-bold")}>
            Modules
          </h3>
          <ul className={cx("mt-4")}>
            {Object.keys(state).map((module, index) => (
              <li key={index}>
                <Link label={capitalize(module)} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
