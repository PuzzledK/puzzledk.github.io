import windowMaker, {bringToFront} from "./windowHandlers";
import { DOMState,settingState,wallPaperOptions,settingsNavItems } from "../main";

const changeWallPaper = (elem) => {
  const mainDiv = document.getElementById("mainDiv");
  DOMState.wallpaper = elem;

  localStorage.setItem("wallpaper", elem);

  mainDiv.style.backgroundImage = `url(/assets/wallpapers/${DOMState.wallpaper})`;
};

export const handleSettingsOpener = (e) => {
  if (settingState.opened) return;

  settingState.opened = true;

  const windowEl = windowMaker("Settings", settingState);
  settingState.window = windowEl;

  windowEl.addEventListener("mousedown", () => {
    bringToFront(settingState, DOMState);
  });

  const restWindow = document.createElement("div");
  restWindow.className = "w-full h-full bg-white flex";

  const sideNav = document.createElement("div");
  sideNav.className =
    "flex flex-col items-center relative space-y-2 border-r-2 border-r-black shadow-2xl shadow-gray-500 w-[15%] pt-2";

  settingsNavItems.map((elem) => {
    const wallPaperElemTxt = document.createElement("p");
    wallPaperElemTxt.textContent = elem;

    const wallPaperBorder = document.createElement("div");
    wallPaperBorder.className = "border-b-2 border-b-black w-full shadow-2xl";

    sideNav.appendChild(wallPaperElemTxt);
    sideNav.appendChild(wallPaperBorder);
  });

  const settingContent = document.createElement("div");
  settingContent.id = "setting-content";
  settingContent.className =
    "flex flex-row flex-wrap w-full justify-center space-x-5 pt-5";

  wallPaperOptions.map((elem) => {
    const img = document.createElement("img");

    img.className = "w-[150px] h-[150px] border-4 border-black";
    img.src = `/assets/wallpapers/${elem}`;

    settingContent.appendChild(img);

    img.addEventListener("click", (e) => {
      e.preventDefault();

      changeWallPaper(elem);
    });
  });

  restWindow.appendChild(sideNav);
  restWindow.appendChild(settingContent);

  windowEl.appendChild(restWindow);
  document.body.appendChild(windowEl);
};