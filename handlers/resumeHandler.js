import { DOMState, resumeState } from "../main";
import windowMaker, { bringToFront } from "./windowHandlers";

export const handleResumeOpener = (e) => {
  if (resumeState.opened) return;
  resumeState.opened = true;

  const windowEl = windowMaker("Resume", resumeState);
  resumeState.window = windowEl;

  const resumeHtmlContainer = document.createElement("div");
  resumeHtmlContainer.className = "w-full h-full bg-white overflow-scroll px-14 pt-16 relative";

  const resumeContent = `
    <div class="font-sans text-gray-800 p-6 max-w-4xl mx-auto bg-white shadow-lg my-8">

        <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div class="text-center sm:text-left mb-4 sm:mb-0">
                <h1 class="text-4xl font-bold mb-1">Indra Mohan Khatri</h1>
                <p class="text-lg text-gray-600">+91 9462449229 | indramohankhatri@gmail.com</p>
                <p class="text-lg text-gray-600"><a href="https://indra.smartfellas.net">indra.smartfellas.net</a> | <a href = "https://github.com/PuzzledK">github.com/PuzzledK</a></p>
                <p class="text-md text-gray-600">Al-05 Hinglaj Nagar, Barmer, Rajasthan</p>
            </div>
        </div>

        <div class="mb-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">PROFILE</h2>
            <p class="mb-2">
                An aspiring Web Developer with a constant urge to improve at every stage of life and a very keen interest in new technologies.
            </p>
            <p>
                Passionate about full-stack development and problem-solving. Strong foundation in core computer science concepts and a fast learner when it comes to emerging tools and frameworks.
            </p>
        </div>

        <div class="mb-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">EDUCATION</h2>

            <div class="mb-4">
                <div class="flex justify-between items-baseline">
                    <h3 class="text-lg font-semibold text-gray-900">Thapar Institute of Engineering and Technology, Patiala, Punjab</h3>
                    <span class="text-md text-gray-600">Aug 2022 Present</span>
                </div>
                <p class="text-md text-gray-700">Bachelor of Computer Engineering</p>
                <p class="text-md text-gray-700">GPA: 9.04 (Current)</p>
            </div>

            <div class="mb-4">
                <div class="flex justify-between items-baseline">
                    <h3 class="text-lg font-semibold text-gray-900">Mayur Nobles Academy, Barmer, Rajasthan</h3>
                    <span class="text-md text-gray-600">May 2020 May 2022</span>
                </div>
                <p class="text-md text-gray-700">Senior Secondary (XII)</p>
                <p class="text-md text-gray-700">Score: 97.33%</p>
            </div>

            <div>
                <div class="flex justify-between items-baseline">
                    <h3 class="text-lg font-semibold text-gray-900">Tiny Tots Sr. Sec. School, Barmer, Rajasthan</h3>
                    <span class="text-md text-gray-600">May 2007 May 2019</span>
                </div>
                <p class="text-md text-gray-700">Secondary (X)</p>
                <p class="text-md text-gray-700">Score: 87.5%</p>
            </div>
        </div>

        <div class="mb-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">TECHNICAL SKILLS</h2>
            <ul class="list-disc list-inside space-y-1">
                <li><span class="font-semibold">Languages:</span> C/C++, Python, JavaScript, HTML/CSS, SQL</li>
                <li><span class="font-semibold">Frameworks:</span> React, NodeJS</li>
                <li><span class="font-semibold">Databases:</span> MongoDB, PostgreSQL</li>
            </ul>
        </div>

        <div class="mb-6">
            <h2 class="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">PROJECTS</h2>

            <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900">ThaProt-G <span class="font-normal text-gray-600">| React, NodeJS</span></h3>
                <p class="mb-1">A college website connecting alumni and students, featuring events, project showcases, and gallery. Includes an admin portal for content management.</p>
                <p class="text-md text-blue-600 hover:underline"><a href="https://thaprotg.thapar.edu" target="_blank" rel="noopener noreferrer">URL - thaprotg.thapar.edu</a></p>
                <p class="text-md text-blue-600 hover:underline"><a href="https://github.com/Madhav-Mahajan-13/ThaprotG-Pages" target="_blank" rel="noopener noreferrer">GitHub: github.com/Madhav-Mahajan-13/ThaprotG-Pages</a></p>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900">C++ Interpreter <span class="font-normal text-gray-600">| C++</span></h3>
                <p class="mb-1">A custom interpreter built entirely from scratch with lexer, parser, and AST design.</p>
                <p class="mb-1">Supports variables, function declarations, if-then-else control flow, and local scopes.</p>
                <p class="mb-1">Intended as a hands-on learning tool for compiler/interpreter design.</p>
                <p class="text-md text-blue-600 hover:underline"><a href="https://github.com/PuzzledK/Math-Solver" target="_blank" rel="noopener noreferrer">GitHub: github.com/PuzzledK/Math-Solver</a></p>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Chat-Application <span class="font-normal text-gray-600">| C, Sockets</span></h3>
                <p class="mb-1">A terminal-based chat application using TCP/IP socket programming in C.</p>
                <p class="mb-1">Supports multiple client-server messaging through basic threading model.</p>
                <p class="mb-1">Provides foundation to explore network programming and concurrent communication.</p>
                <p class="text-md text-blue-600 hover:underline"><a href="https://github.com/PuzzledK/Chat-application-in-C-sockets" target="_blank" rel="noopener noreferrer">GitHub: github.com/PuzzledK/Chat-application-in-C-sockets</a></p>
            </div>
        </div>

    </div>
  `;

  resumeHtmlContainer.innerHTML = resumeContent;

  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download Resume (PDF)";
  downloadButton.className = "absolute top-4 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg z-10";

  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "/assets/INDRA_RESUME.pdf";
    link.download = "INDRA_RESUME.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  windowEl.addEventListener("mousedown", () => {
    bringToFront(resumeState, DOMState);
  });

  resumeHtmlContainer.prepend(downloadButton);
  windowEl.appendChild(resumeHtmlContainer);
  document.body.appendChild(windowEl);
};