import { DOMState,resumeState } from "../main";
import windowMaker,{bringToFront} from "./windowHandlers"

export const handleResumeOpener = (e) => {

  if (resumeState.opened) return;
  resumeState.opened = true;

  const windowEl = windowMaker("Resume", resumeState);
  resumeState.window = windowEl;

  const imgDiv = document.createElement("div");
  imgDiv.className = "w-full h-full bg-white overflow-scroll px-14";

  const img = document.createElement("img");
  img.src = "/assets/resume.svg";

  windowEl.addEventListener("mousedown", () => {
    bringToFront(resumeState, DOMState);
  });

  imgDiv.appendChild(img);
  windowEl.appendChild(imgDiv);
  document.body.appendChild(windowEl);
};