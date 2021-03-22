import * as React from "react";
import cx from "classnames";

import Sidebar from "./Sidebar";
import Content from "./Content";
import { ContextState, ContextProvider } from "./context";

declare global {
  interface Window {
    resData: string;
  }
}

let data: ContextState;
if (process.env.NODE_ENV === "production") {
  data = JSON.parse(window.resData);
} else {
  data = require("../mocks/modules.json");
}

const App: React.FunctionComponent = () => {
  return (
    <ContextProvider data={data}>
      <div className={cx("grid", "gap-4", "grid-cols-12")}>
        <Sidebar />
        <Content />
      </div>
    </ContextProvider>
  );
};

export default App;
