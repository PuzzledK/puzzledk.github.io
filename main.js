import windowMaker, { errWin, bringToFront } from "./windowHandlers";

let evaluate;

window.addEventListener("load", () => {
  Module.onRuntimeInitialized = () => {
    evaluate = Module.cwrap("evaluate_with_error", "number", ["string"]);
  };
});

const laptopLogo = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡔⠒⠤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⠤⠤⠤⠵⣄⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠓⠤⢀⣀⣠⠤⠷⠦⠤⠬⣦⣀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⠖⠋⠁⠀⠀⠀⠀⠀⠀⠀⠈⠙⢦⡀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⠀⠀
⠀⠀⣠⡀⣰⠃⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣧⠀
⣿⣮⣿⣷⠃⠀⠀⠀⠀⠀⠀⠀⠸⠿⣿⣷⣶⣤⣠⣤⣶⣾⣿⣿⡇
⠉⢭⡿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠁⠀⣽⡏⣟⣿⡍⠁⠡⠀⣷
⠀⠈⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠢⢀⡠⠚⠉⠑⢤⡔⠁⠀⡇
⠀⠀⠀⠘⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣎⣀⡀⠀⠀⠀⠙⣄⣰⠃
⠀⠀⠀⠀⠙⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢢⡀⠀⢈⠝⠋⣹⠃⠀
⠀⠀⠀⠀⠀⠈⠓⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠚⢁⡤⠞⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠒⠦⠤⠤⠤⠤⠴⠖⠚⠉⠀⠀⠀⠀⠀
`;

function getSystemInfo() {
  const info = [
    `OS: Browser (${navigator.platform})`,
    `Host: ${window.location.hostname}`,
    `Browser: ${navigator.userAgent.split(")")[0].split("(")[1] || "Unknown"}`,
    `CPU Cores: ${navigator.hardwareConcurrency || "Unknown"}`,
    `RAM: ${
      navigator.deviceMemory ? navigator.deviceMemory + " GB" : "Unknown"
    }`,
    `Screen: ${screen.width}x${screen.height}`,
    `Color Depth: ${screen.colorDepth}-bit`,
  ];
  return info;
}

const DOMState = {
  zind: 100,
  wallpaper: "",
};

var commandHistory = [];

const settingsNavItems = ["Wallpaper"];
const wallPaperOptions = ["1.png", "2.jpg", "3.jpeg"];

const changeWallPaper = (elem) => {
  const mainDiv = document.getElementById("mainDiv");
  DOMState.wallpaper = elem;

  localStorage.setItem("wallpaper", elem);

  mainDiv.style.backgroundImage = `url(/assets/wallpapers/${DOMState.wallpaper})`;
};

const cameraState = {
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

const settingState = {
  opened: false,
  window: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
  },
};

const resumeState = {
  opened: false,
  window: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
  },
};

const terminalState = {
  opened: false,
  window: null,
  inputElem: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
    this.inputElem = null;
  },
};

const calcState = {
  opened: false,
  window: null,

  cleanup: function () {
    this.opened = false;
    this.window = null;
  },
};

const commands = {
  clear: "Clear the terminal",
  help: "Show list of available commands",
  neofetch: "Show system information",
};

const handleTerminalInput = (e, inputElement, outElement) => {
  const inpText = inputElement.querySelector("span");
  const inp = inputElement.querySelector("input");

  if (e.key == "Enter") {

    if (inp.value == "") return;

    const outTemp = document.createElement("div");

    const promptClone = inpText.cloneNode(true);
    const textClone = document.createElement("span");
    textClone.textContent = inp.value;
    textClone.style.color = 'white'

    outTemp.appendChild(promptClone);
    outTemp.appendChild(textClone);
    outElement.appendChild(outTemp);

    const command = inp.value.split(" ");
    var tempSpan;
    switch (command[0]) {
      case "neofetch":
        tempSpan = document.createElement("span");

        const container = document.createElement("div");
        container.className = 'flex gap-2 items-start'

        const logoCol = document.createElement("pre");
        logoCol.textContent = laptopLogo;

        logoCol.className = 'm-0 text-[#E95420]'

        const infoCol = document.createElement("pre");
        infoCol.textContent = getSystemInfo().join("\n");
        infoCol.className = 'm-0 py-20';

        container.appendChild(logoCol);
        container.appendChild(infoCol);
        tempSpan.appendChild(container);
        outElement.appendChild(tempSpan);
        break;
      case "help":
        tempSpan = document.createElement("span");
        for (const command in commands) {
          tempSpan.innerHTML += `${command} - ${commands[command]}<br>`;
        }
        outElement.appendChild(tempSpan);
        break;

      case "clear":
        outElement.innerHTML = '';
        break;
      default:
        tempSpan = document.createElement("span");
        tempSpan.textContent =
          'UNRECOGNIZED COMMAND, TYPE "help" TO SEE AVAILABLE COMMANDS';
        tempSpan.className = "text-red-600 font-bold";

        outElement.appendChild(tempSpan);
        break;
    }
    commandHistory.push(inp.value);
    inp.value = "";
    outElement.scrollTop = outElement.scrollHeight;

  } 
  else if(e.key == 'ArrowUp') {
    if(commandHistory.length == 0) return;
    inp.value = commandHistory.at(-1);
    commandHistory.pop();
    commandHistory = [inp.value,...commandHistory];
  }
  else{
    return;
  }
};

function handleCalcInput(e,inputElement,outElement) {
  const inpText = inputElement.querySelector("span");
  const inp = inputElement.querySelector("input");

  if (e.key == "Enter") {

    if (inp.value == "") return;

    const outTemp = document.createElement("div");
    const promptClone = inpText.cloneNode(true);
    const textClone = document.createElement("span");
    textClone.textContent = inp.value;
    textClone.style.color = 'white'

    outTemp.appendChild(promptClone);
    outTemp.appendChild(textClone);
    outElement.appendChild(outTemp);

    var tempSpan;

    try {
        const result = Module.ccall(
          "evaluate_with_error",
          "string",
          ["string"],
          [inp.value]
        );

        tempSpan = document.createElement("span");

        if (result.startsWith("error:")) {
            tempSpan.textContent = `--> ${result.slice(7)}`;
            tempSpan.className = "text-red-600 font-bold";
        } 
        else{
            tempSpan.textContent = `--> ${result}`;
        }

        tempSpan.textContent = `--> ${result}`

        outElement.appendChild(tempSpan);

    } catch (e) {
        tempSpan = document.createElement("span");
        tempSpan.textContent = `--> Invalid Syntax or Unsupported Command / Function`
         
        tempSpan.className = "text-red-600 font-bold";

        outElement.appendChild(tempSpan);
    }

    inp.value = "";
  }
}


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

const handleTerminalOpener = (e) => {
  if (terminalState.opened) return;
  terminalState.opened = true;

  const windowEl = windowMaker("Terminal", terminalState);
  terminalState.window = windowEl;


  windowEl.addEventListener("mousedown", () => {
    bringToFront(terminalState, DOMState);
  });

  const innerWindow = document.createElement("div");
  innerWindow.className =
    "w-full h-full px-1 bg-black overflow-y-scroll";

  const outputSection = document.createElement("div");
  outputSection.className = "flex flex-col space-x-2 text-white";

  const inputSection = document.createElement("div");
  inputSection.className = "flex flex-row space-x-2";

  const startText = document.createElement("span");
  startText.innerText = "root@webOS :  ";
  startText.className = "font-bold text-blue-500";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "text-black outline-0 text-white";

  input.addEventListener("keydown", (e) => {
    handleTerminalInput(e, inputSection, outputSection);
  });

  inputSection.appendChild(startText);
  inputSection.appendChild(input);

  innerWindow.appendChild(outputSection);
  innerWindow.appendChild(inputSection);
  windowEl.appendChild(innerWindow);

  document.body.appendChild(windowEl);
};

const handleResumeOpener = (e) => {
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

const handleCameraOpener = (e) => {
  if (cameraState.opened) return;
  cameraState.opened = true;
  const windowEl = windowMaker("Camera", cameraState);
  cameraState.window = windowEl;

  windowEl.addEventListener("mousedown", () => {
    bringToFront(cameraState, DOMState);
  });

  if (navigator && navigator.mediaDevices) {
    const options = { audio: false, video: { facingMode: "user" } };
    const videoElem = document.createElement("video");
    videoElem.className = "w-full h-full scale-x-[-1]";

    navigator.mediaDevices
      .getUserMedia(options)
      .then((stream) => {
        cameraState.stream = stream;
        videoElem.srcObject = stream;
        videoElem.onloadedmetadata = function (e) {
          videoElem.play();
        };

        windowEl.appendChild(videoElem);
      })
      .catch((err) => {
        errWin(windowEl, err);
      });
  } else {
    errWin(windowEl, "CAMERA NOT SUPPORTED :(");
  }

  document.body.appendChild(windowEl);
};

const handleSettingsOpener = (e) => {
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

const handleCalcOpener = (e) => {
  if (calcState.opened) return;
  calcState.opened = true;

  const windowEl = windowMaker("Calculator", calcState);
  calcState.window = windowEl;


  windowEl.addEventListener("mousedown", () => {
    bringToFront(calcState, DOMState);
  });

  const innerWindow = document.createElement("div");
  innerWindow.className =
    "w-full h-full px-1 bg-black overflow-y-scroll";

  const outputSection = document.createElement("div");
  outputSection.className = "flex flex-col space-x-2 text-white";

  const inputSection = document.createElement("div");
  inputSection.className = "flex flex-row space-x-2";

  const startText = document.createElement("span");
  startText.innerText = ">> ";
  startText.className = "font-bold text-blue-500";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "text-black outline-0 text-white";

  input.addEventListener("keydown", (e) => {
    handleCalcInput(e, inputSection, outputSection);
  });

  inputSection.appendChild(startText);
  inputSection.appendChild(input);

  innerWindow.appendChild(outputSection);
  innerWindow.appendChild(inputSection);
  windowEl.appendChild(innerWindow);

  document.body.appendChild(windowEl);
};
