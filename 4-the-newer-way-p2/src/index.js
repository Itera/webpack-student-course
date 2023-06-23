import { getCurrentDate } from "./utils.js";

const currentDate = getCurrentDate();
document.getElementById(
  "mainContainer"
).innerHTML = `Hello world! Current time: ${currentDate}`;
