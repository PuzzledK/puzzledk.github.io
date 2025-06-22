import windowMaker, { bringToFront } from "./windowHandlers";
import {
  DOMState,
  settingState,
  wallPaperOptions,
  settingsNavItems,
} from "../main";

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

  const wallpaperContent = document.createElement("div");
  wallpaperContent.id = "setting-content";
  wallpaperContent.className =
    "flex flex-row flex-wrap w-full justify-center space-x-5 pt-5 px-5";

  wallPaperOptions.map((elem) => {
    const wrapper = document.createElement("div");
    wrapper.className =
      "relative w-full sm:w-[48%] md:w-[31%] aspect-video mb-6";

    const fgDiv = document.createElement("div");
    fgDiv.className =
      "w-full h-full bg-white border-4 border-black flex items-center justify-center z-10 font-serif text-xl font-bold hover:translate-x-2 hover:translate-y-2 duration-150 cursor-pointer overflow-hidden relative";

    const img = document.createElement("img");
    img.src = `/assets/wallpapers/${elem}`;
    img.className = "w-full h-full object-cover";
    fgDiv.appendChild(img);

    const bgDiv = document.createElement("div");
    bgDiv.className = "w-full h-full bg-black absolute top-2 left-2 z-0";

    fgDiv.addEventListener("click", (e) => {
      e.preventDefault();
      changeWallPaper(elem);
    });

    wrapper.appendChild(fgDiv);
    wrapper.appendChild(bgDiv);
    wallpaperContent.appendChild(wrapper);
  });

  restWindow.appendChild(sideNav);
  restWindow.appendChild(wallpaperContent);

  windowEl.appendChild(restWindow);
  document.body.appendChild(windowEl);
};
