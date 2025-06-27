import windowMaker, { bringToFront } from "./windowHandlers";
import { terminalState, commands, DOMState } from "../main";

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

var commandHistory = [];

export const handleTerminalInput = (e, inputElement, outElement) => {
  const inpText = inputElement.querySelector("span");
  const inp = inputElement.querySelector("input");

  if (e.key == "Enter") {
    if (inp.value == "") return;

    const outTemp = document.createElement("div");

    const promptClone = inpText.cloneNode(true);
    const textClone = document.createElement("span");
    textClone.textContent = inp.value;
    textClone.style.color = "white";

    outTemp.appendChild(promptClone);
    outTemp.appendChild(textClone);
    outElement.appendChild(outTemp);

    const command = inp.value.split(" ");
    var tempSpan;
    switch (command[0]) {
      case "neofetch":
        tempSpan = document.createElement("span");

        const container = document.createElement("div");
        container.className = "flex gap-2 items-start";

        const logoCol = document.createElement("pre");
        logoCol.textContent = laptopLogo;

        logoCol.className = "m-0 text-[#E95420]";

        const infoCol = document.createElement("pre");
        infoCol.textContent = getSystemInfo().join("\n");
        infoCol.className = "m-0 py-20";

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
        outElement.innerHTML = "";
        break;

      case "ping":
        tempSpan = document.createElement("span");

        if (command.length != 2) {
          tempSpan.textContent = "Invalid Syntax";
          tempSpan.className = "text-red-600 font-bold";
        } 
        else {
          const site = command[1];
          const fetchFunc = async () => {
            try {
              const start = Date.now();
              const res = await fetch(site, { method: "GET" });

              if (!res.ok) {
                tempSpan.textContent = "Site returned HTTP : " + res.status;
                tempSpan.className = "text-red-600 font-bold";
                return;
              }

              const latency = Date.now() - start;
              tempSpan.textContent = `pinged ${site}, Latency: ${latency}ms`;
            } catch (e) {
              tempSpan.textContent = `Failed to ping ${site}: ${e.message}`;
              tempSpan.className = "text-red-600 font-bold";
            }
          };

          fetchFunc();
        }

        outElement.appendChild(tempSpan);
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
  } else if (e.key == "ArrowUp") {
    if (commandHistory.length == 0) return;
    inp.value = commandHistory.at(-1);
    commandHistory.pop();
    commandHistory = [inp.value, ...commandHistory];
  } else {
    return;
  }
};

export const handleTerminalOpener = (e) => {
  if (terminalState.opened) return;
  terminalState.opened = true;

  const windowEl = windowMaker("Terminal", terminalState);
  terminalState.window = windowEl;

  windowEl.addEventListener("mousedown", () => {
    bringToFront(terminalState, DOMState);
  });

  const innerWindow = document.createElement("div");
  innerWindow.className = "w-full h-full px-1 bg-black overflow-y-scroll";

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
