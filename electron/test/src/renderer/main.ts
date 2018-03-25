import { ipcRenderer } from "electron";
import { test } from "./test";

var closeEl = document.querySelector("header");
closeEl.addEventListener("click", function() {
  ipcRenderer.send("close-main-window");
});
