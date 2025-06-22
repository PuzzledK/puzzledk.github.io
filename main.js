import { handleTerminalOpener } from "./handlers/terminalHandlers";
import { handleResumeOpener } from "./handlers/resumeHandler";
import { handleCameraOpener } from "./handlers/cameraHandler";
import { handleSettingsOpener } from "./handlers/settingsHandler";
import { handleCalcOpener } from "./handlers/calcHandler";

export const DOMState = {
  zind: 100,
  wallpaper: "",
};

export const settingsNavItems = ["Wallpaper"];
export const wallPaperOptions = ["1.png", "2.jpg", "3.jpeg"];

export const cameraState = {
  opened: false,
  stream: null,
  window: null,

  cleanup: function () {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    this.opened = false;
    this.window = null;
  },
};

export const settingState = {
  opened: false,
  window: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
  },
};

export const resumeState = {
  opened: false,
  window: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
  },
};

export const terminalState = {
  opened: false,
  window: null,
  inputElem: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
    this.inputElem = null;
  },
};

export const calcState = {
  opened: false,
  window: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
  },
};

export const commands = {
  clear: "Clear the terminal",
  help: "Show list of available commands",
  neofetch: "Show system information",
};

document.addEventListener("DOMContentLoaded", (e) => {
  const mainDiv = document.getElementById("mainDiv");
  const camera = document.getElementById("camera");
  const settings = document.getElementById("settings");
  const terminal = document.getElementById("terminal");
  const calcIcon = document.getElementById("calcIcon");

  const resume = document.getElementById("resumeIcon");

  let wallp = localStorage.getItem("wallpaper");
  wallp = wallp ? wallp : "1.png";
  DOMState.wallpaper = wallp;
  mainDiv.style.backgroundImage = `url(/assets/wallpapers/${wallp})`;

  camera.addEventListener("click", handleCameraOpener);
  settings.addEventListener("click", handleSettingsOpener);
  resume.addEventListener("click", handleResumeOpener);
  terminal.addEventListener("click", handleTerminalOpener);
  calcIcon.addEventListener("click", handleCalcOpener);
});