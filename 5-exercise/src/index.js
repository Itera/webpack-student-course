import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { getCurrentDate } from "./utils.js";

const root = createRoot(document.getElementById("app"));

const element = createElement(
  "h1",
  undefined,
  `Hello world! Current time: ${getCurrentDate()}`
);

root.render(element);
