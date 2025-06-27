import windowMaker,{bringToFront} from "./windowHandlers";
import { calcState,DOMState } from "../main";

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

export const handleCalcOpener = (e) => {
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

  const introSection = document.createElement("div");
  introSection.className = 'w-full flex flex-col space-y-1 text-white items-center justify-center text-center';

  const introH1 = document.createElement('h1');
  introH1.textContent = "Welcome to The Calculator";

  const introP = document.createElement('p');
  introP.textContent = "This is an expression solver that I have made in C++ and compiled for the web using WASM. This is my attempt to dive into the world of interpreters !!";

  const introP2 = document.createElement('p');
  introP2.textContent = "The source code to this project can be found at:  ";

  const linkElem = document.createElement('a');
  linkElem.className = 'text-blue-600'
  linkElem.textContent = "https://github.com/PuzzledK/Math-Solver";
  linkElem.href = "https://github.com/PuzzledK/Math-Solver";
  linkElem.target = "_blank"; 
  linkElem.rel = "noopener noreferrer"; 



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

  introSection.appendChild(introH1);
  introSection.appendChild(introP);
  introSection.appendChild(introP2);
  introP2.appendChild(linkElem);
  introSection.appendChild(introP2);

  inputSection.appendChild(startText);
  inputSection.appendChild(input);

  innerWindow.appendChild(introSection);
  innerWindow.appendChild(outputSection);
  innerWindow.appendChild(inputSection);
  windowEl.appendChild(innerWindow);

  document.body.appendChild(windowEl);
};