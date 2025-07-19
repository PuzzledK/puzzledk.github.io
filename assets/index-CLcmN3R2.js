(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(n){if(n.ep)return;n.ep=!0;const t=e(n);fetch(n.href,t)}})();const k=(r,a)=>{const e=document.createElement("div");e.className=["flex flex-col absolute left-2 top-2","bg-black shadow-lg rounded-lg","w-[96vw] max-w-[900px] min-w-[180px]","h-[70vh] max-h-[90vh] min-h-[180px]","sm:left-10 sm:top-5","sm:w-[90vw] sm:min-w-[280px] sm:h-[60vh] sm:min-h-[200px]"].join(" ");const s=document.createElement("div");s.className=["flex justify-between items-center w-full","bg-black px-2","h-12 min-h-12","sm:h-[44px] sm:min-h-[44px]"].join(" ");const n=document.createElement("p");n.className=["truncate font-semibold","text-white","text-base sm:text-lg md:text-xl","flex-1 text-left"].join(" "),n.textContent=r;const t=document.createElement("button");t.className=["w-8 h-8 flex items-center justify-center rounded-full","bg-red-600 text-white hover:bg-red-700 transition","text-base sm:text-lg"].join(" "),t.textContent="X",t.addEventListener("click",c=>{e.classList.add("out"),e.addEventListener("animationend",()=>{e.remove(),a&&a.cleanup&&a.cleanup()})});let o=!1,l,d;s.addEventListener("mousedown",c=>{o=!0,l=c.clientX-e.offsetLeft,d=c.clientY-e.offsetTop,s.classList.remove("cursor-grab"),s.classList.add("cursor-grabbing"),c.preventDefault()}),document.addEventListener("mousemove",c=>{if(!o)return;const P=window.innerWidth,z=window.innerHeight,b=e.getBoundingClientRect(),D=document.getElementById("sideNav").getBoundingClientRect().width,j=P-b.width,R=z-b.height;let A=c.clientX-l,H=c.clientY-d;A=Math.max(D,Math.min(A,j)),H=Math.max(0,Math.min(H,R)),e.style.position="absolute",e.style.left=A+"px",e.style.top=H+"px"}),document.addEventListener("mouseup",()=>{o&&(o=!1,e.classList.remove("cursor-grabbing"))});const i=document.createElement("button");i.className=["w-8 h-8 flex items-center justify-center rounded-full","bg-green-600 text-white hover:bg-green-700 transition ml-2","text-base sm:text-lg"].join(" "),i.textContent="⛶";let p=!1,m={};i.addEventListener("click",()=>{p?(e.style.left=m.left||"40px",e.style.top=m.top||"20px",e.style.width=m.width||"90vw",e.style.height=m.height||"60vh",e.style.maxWidth="900px",e.style.maxHeight="90vh",e.style.minWidth="180px",e.style.minHeight="180px",e.style.zIndex="",p=!1):(m={left:e.style.left,top:e.style.top,width:e.style.width,height:e.style.height},e.style.left="0px",e.style.top="0px",e.style.width="100vw",e.style.height="100vh",e.style.maxWidth="100vw",e.style.maxHeight="100vh",e.style.minWidth="0",e.style.minHeight="0",e.style.zIndex=9999,p=!0)});const h=document.createElement("div");h.className=["absolute right-0 bottom-0 z-10","w-5 h-5 sm:w-6 sm:h-6","cursor-nwse-resize"].join(" "),h.style.background="transparent";let f=!1,S,g,T,u;h.addEventListener("mousedown",c=>{c.stopPropagation(),f=!0,S=c.clientX,g=c.clientY,T=e.offsetWidth,u=e.offsetHeight,document.body.style.userSelect="none"}),document.addEventListener("mousemove",c=>{if(!f)return;const P=c.clientX-S,z=c.clientY-g;let b=T+P,M=u+z;const D=window.innerWidth*.98,j=window.innerHeight*.95;b=Math.max(window.innerWidth*.2,Math.min(b,D)),M=Math.max(window.innerHeight*.2,Math.min(M,j)),e.style.width=b+"px",e.style.height=M+"px"}),document.addEventListener("mouseup",()=>{f&&(f=!1,document.body.style.userSelect="")});const w=document.createElement("div");return w.className="flex gap-2 items-center flex-shrink-0",w.appendChild(i),w.appendChild(t),s.appendChild(n),s.appendChild(w),e.appendChild(s),e.appendChild(h),e},O=(r,a)=>{const e=document.createElement("div");e.className="flex w-full h-full items-center justify-center text-white";const s=document.createElement("h4");s.textContent=a,e.appendChild(s),r.appendChild(e)},I=(r,a)=>{r.window&&(r.window.style.zIndex=a.zind++)},W=`
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
`;function U(){return[`OS: Browser (${navigator.platform})`,`Host: ${window.location.hostname}`,`Browser: ${navigator.userAgent.split(")")[0].split("(")[1]||"Unknown"}`,`CPU Cores: ${navigator.hardwareConcurrency||"Unknown"}`,`RAM: ${navigator.deviceMemory?navigator.deviceMemory+" GB":"Unknown"}`,`Screen: ${screen.width}x${screen.height}`,`Color Depth: ${screen.colorDepth}-bit`]}var v=[];const $=(r,a,e)=>{const s=a.querySelector("span"),n=a.querySelector("input");if(r.key=="Enter"){if(n.value=="")return;const o=document.createElement("div"),l=s.cloneNode(!0),d=document.createElement("span");d.textContent=n.value,d.style.color="white",o.appendChild(l),o.appendChild(d);const i=n.value.split(" ");var t;switch(i[0]){case"neofetch":e.appendChild(o),t=document.createElement("span");const p=document.createElement("div");p.className="flex gap-2 items-start";const m=document.createElement("pre");m.textContent=W,m.className="m-0 text-[#E95420]";const h=document.createElement("pre");h.textContent=U().join(`
`),h.className="m-0 py-20",p.appendChild(m),p.appendChild(h),t.appendChild(p),e.appendChild(t);break;case"help":e.appendChild(o),t=document.createElement("span");for(const f in B)t.innerHTML+=`${f} - ${B[f]}<br>`;e.appendChild(t);break;case"clear":e.innerHTML="";break;case"ping":if(t=document.createElement("span"),i.length!=2)t.textContent="Invalid Syntax",t.className="text-red-600 font-bold";else{const f=i[1],g=(u=>{u.match(/^https?:\/\//)||(u="https://"+u);try{return new URL(u).toString()}catch{return null}})(f);if(!g){t.textContent=`Invalid URL: ${f}`,t.className="text-red-600 font-bold";return}(async()=>{try{const u=Date.now(),w=await fetch(g,{method:"HEAD",mode:"no-cors",cache:"no-store",headers:{"User-Agent":"Mozilla/5.0"}}),c=Date.now()-u;t.textContent=`Pinged ${g}, Latency: ${c}ms`}catch(u){t.textContent=`Failed to ping ${g}: ${u.message}`,t.className="text-red-600 font-bold"}})()}e.appendChild(o),e.appendChild(t);break;default:t=document.createElement("span"),t.textContent='UNRECOGNIZED COMMAND, TYPE "help" TO SEE AVAILABLE COMMANDS',t.className="text-red-600 font-bold",e.appendChild(t);break}v.push(n.value),n.value="",e.scrollTop=e.scrollHeight}else if(r.key=="ArrowUp"){if(v.length==0)return;n.value=v.at(-1),v.pop(),v=[n.value,...v]}else return},X=r=>{if(N.opened)return;N.opened=!0;const a=k("Terminal",N);N.window=a,a.addEventListener("mousedown",()=>{I(N,x)});const e=document.createElement("div");e.className="w-full h-full px-1 bg-black overflow-y-scroll";const s=document.createElement("div");s.className="flex flex-col space-x-2 text-white";const n=document.createElement("div");n.className="flex flex-row space-x-2 w-full";const t=document.createElement("span");t.innerText="root@webOS :  ",t.className="font-bold text-blue-500";const o=document.createElement("input");o.type="text",o.className="text-black outline-0 text-white w-3/4",o.addEventListener("keydown",l=>{$(l,n,s)}),n.appendChild(t),n.appendChild(o),e.appendChild(s),e.appendChild(n),a.appendChild(e),document.body.appendChild(a)},F=r=>{if(E.opened)return;E.opened=!0;const a=k("Resume",E);E.window=a;const e=document.createElement("div");e.className="w-full h-full bg-white overflow-scroll px-14 pt-16 relative";const s=`
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
                <p class="mb-1">Supports variables, function declarations, if-then-else control flow, and local scopes. Intended as a hands-on learning tool for compiler/interpreter design.</p>
                <p class="text-md text-blue-600 hover:underline"><a href="https://github.com/PuzzledK/Math-Solver" target="_blank" rel="noopener noreferrer">GitHub: github.com/PuzzledK/Math-Solver</a></p>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-900">Chat-Application <span class="font-normal text-gray-600">| C, Sockets</span></h3>
                <p class="mb-1">A terminal-based chat application using TCP/IP socket programming in C.</p>
                <p class="mb-1">Supports multiple client-server messaging through basic threading model. Provides foundation to explore network programming and concurrent communication.</p>
                <p class="mb-1">Provides foundation to explore network programming and concurrent communication.</p>
                <p class="text-md text-blue-600 hover:underline"><a href="https://github.com/PuzzledK/Chat-application-in-C-sockets" target="_blank" rel="noopener noreferrer">GitHub: github.com/PuzzledK/Chat-application-in-C-sockets</a></p>
            </div>
        </div>

    </div>
  `;e.innerHTML=s;const n=document.createElement("button");n.textContent="Download Resume (PDF)",n.className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg z-10",n.addEventListener("click",()=>{const t=document.createElement("a");t.href="/assets/INDRA_RESUME.pdf",t.download="INDRA_RESUME.pdf",document.body.appendChild(t),t.click(),document.body.removeChild(t)}),a.addEventListener("mousedown",()=>{I(E,x)}),e.prepend(n),a.appendChild(e),document.body.appendChild(a)},K=r=>{if(y.opened)return;y.opened=!0;const a=k("Camera",y);if(y.window=a,a.addEventListener("mousedown",()=>{I(y,x)}),navigator&&navigator.mediaDevices){const e={audio:!1,video:{facingMode:"user"}},s=document.createElement("video");s.className="w-full h-full scale-x-[-1]",navigator.mediaDevices.getUserMedia(e).then(n=>{y.stream=n,s.srcObject=n,s.onloadedmetadata=function(t){s.play()},a.appendChild(s)}).catch(n=>{O(a,n)})}else O(a,"CAMERA NOT SUPPORTED :(");document.body.appendChild(a)},G=r=>{const a=document.getElementById("mainDiv");x.wallpaper=r,localStorage.setItem("wallpaper",r),a.style.backgroundImage=`url(/assets/wallpapers/${x.wallpaper})`},q=r=>{if(C.opened)return;C.opened=!0;const a=k("Settings",C);C.window=a,a.addEventListener("mousedown",()=>{I(C,x)});const e=document.createElement("div");e.className="w-full h-full bg-white flex overflow-auto";const s=document.createElement("div");s.className="flex flex-col items-center relative space-y-2 border-r-2 border-r-black shadow-2xl shadow-gray-500 w-[15%] pt-2",J.map(t=>{const o=document.createElement("p");o.textContent=t;const l=document.createElement("div");l.className="border-b-2 border-b-black w-full shadow-2xl",s.appendChild(o),s.appendChild(l)});const n=document.createElement("div");n.id="setting-content",n.className="flex flex-wrap justify-center gap-6 p-5 items-start",V.map(t=>{const o=document.createElement("div");o.className="relative w-[50%] sm:w-[30%] md:w-[20%] aspect-square";const l=document.createElement("div");l.className="w-full h-full bg-white border-4 border-black z-10 relative cursor-pointer hover:translate-x-3 hover:translate-y-3 transition-transform duration-200 overflow-hidden";const d=document.createElement("img");d.src=`/assets/wallpapers/${t}`,d.className="w-full h-full object-cover",l.appendChild(d);const i=document.createElement("div");i.className="w-full h-full bg-black absolute top-3 left-3 z-0",l.addEventListener("click",p=>{p.preventDefault(),G(t)}),o.appendChild(l),o.appendChild(i),n.appendChild(o)}),e.appendChild(s),e.appendChild(n),a.appendChild(e),document.body.appendChild(a)};function Y(r,a,e){const s=a.querySelector("span"),n=a.querySelector("input");if(r.key=="Enter"){if(n.value=="")return;const o=document.createElement("div"),l=s.cloneNode(!0),d=document.createElement("span");d.textContent=n.value,d.style.color="white",o.appendChild(l),o.appendChild(d),e.appendChild(o);var t;if(n.value.trim().toLowerCase()==="help"){const i=document.createElement("div");i.style.whiteSpace="pre-line",i.style.color="#aaf",i.textContent=`
Supported commands and features:

Operators:
  +   Addition
  -   Subtraction
  *   Multiplication
  /   Division
  ^   Exponentiation
  ( ) Parentheses
  e   Euler's number

Functions (input/output in degrees where applicable):
  sin(x), cos(x), tan(x)
  asin(x), acos(x), atan(x)
  sqrt(x), log(x) [base 10], ln(x) [base e]

Variables:
  Assignment: x = 5
  Usage: x + 2
  Variable names: alphabets only (e.g., foo, bar)

Blocks:
  { ... } to group multiple expressions/statements, separated by semicolons

If-Then-Else Expressions:
  if(<condition>) then <expr> else <expr>
  Supported: ==, !=, >, <, >=, <=

User-defined functions:
  def f(x, y) { x + y; }   or   def sq(x) x^2
  f(2, 3)

Commands:
  help   Show this help message

Numbers:
  Integer and floating-point numbers (e.g., 42, 3.14)

Type an expression like: sin(30) + cos(60), x = 2, def sq(x) x^2, or use blocks and if-then-else.
      `.trim(),e.appendChild(i),n.value="";return}else if(n.value.trim().toLowerCase()==="clear"){e.innerHTML="",n.value="";return}try{const i=Module.ccall("evaluate_with_error","string",["string"],[n.value]);t=document.createElement("span"),i.startsWith("error:")?(t.textContent=`--> ${i.slice(7)}`,t.className="text-red-600 font-bold"):i!=""&&(t.textContent=`--> ${i}`),e.appendChild(t)}catch{t=document.createElement("span"),t.textContent="--> Invalid Syntax or Unsupported Command / Function",t.className="text-red-600 font-bold",e.appendChild(t)}n.value=""}}const _=r=>{if(L.opened)return;L.opened=!0;const a=k("Calculator",L);L.window=a,a.addEventListener("mousedown",()=>{I(L,x)});const e=document.createElement("div");e.className="w-full h-full px-1 bg-black overflow-y-scroll";const s=document.createElement("div");s.className="w-full flex flex-col space-y-1 text-white items-center justify-center text-center";const n=document.createElement("h1");n.textContent="Welcome to The Calculator";const t=document.createElement("p");t.textContent="This is an expression solver that I have made in C++ and compiled for the web using WASM. This is my attempt to dive into the world of interpreters !!";const o=document.createElement("p");o.textContent="The source code to this project can be found at:  ";const l=document.createElement("a");l.className="text-blue-600",l.textContent="https://github.com/PuzzledK/Math-Solver",l.href="https://github.com/PuzzledK/Math-Solver",l.target="_blank",l.rel="noopener noreferrer";const d=document.createElement("div");d.className="flex flex-col space-x-2 text-white";const i=document.createElement("div");i.className="flex flex-row space-x-2";const p=document.createElement("span");p.innerText=">> ",p.className="font-bold text-blue-500";const m=document.createElement("input");m.type="text",m.className="text-black outline-0 text-white",m.addEventListener("keydown",h=>{Y(h,i,d)}),s.appendChild(n),s.appendChild(t),s.appendChild(o),o.appendChild(l),s.appendChild(o),i.appendChild(p),i.appendChild(m),e.appendChild(s),e.appendChild(d),e.appendChild(i),a.appendChild(e),document.body.appendChild(a)},x={zind:100,wallpaper:""},J=["Wallpaper"],V=["1.png","2.jpg","3.jpeg"],y={opened:!1,stream:null,window:null,cleanup:function(){this.stream&&(this.stream.getTracks().forEach(r=>r.stop()),this.stream=null),this.opened=!1,this.window=null}},C={opened:!1,window:null,cleanup:function(){this.opened=!1,this.window=null}},E={opened:!1,window:null,cleanup:function(){this.opened=!1,this.window=null}},N={opened:!1,window:null,inputElem:null,cleanup:function(){this.opened=!1,this.window=null,this.inputElem=null}},L={opened:!1,window:null,cleanup:function(){this.opened=!1,this.window=null}},B={clear:"Clear the terminal",help:"Show list of available commands",neofetch:"Show system information",ping:"Ping a website"};document.addEventListener("DOMContentLoaded",r=>{const a=document.getElementById("mainDiv"),e=document.getElementById("camera"),s=document.getElementById("settings"),n=document.getElementById("terminal"),t=document.getElementById("calcIcon"),o=document.getElementById("resumeIcon");let l=localStorage.getItem("wallpaper");l=l||"1.png",x.wallpaper=l,a.style.backgroundImage=`url(/assets/wallpapers/${l})`,e.addEventListener("click",K),s.addEventListener("click",q),o.addEventListener("click",F),n.addEventListener("click",X),t.addEventListener("click",_)});
