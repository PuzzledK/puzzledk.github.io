document.addEventListener('DOMContentLoaded',(e) => {
    const camera = document.getElementById('camera');

    camera.addEventListener('mousedown',handleCameraOpener);

})

const windowMaker = () => {
    const window = document.createElement('div');
    window.className = 'flex flex-col h-1/3 w-1/3 absolute left-40 top-10 bg-black';

    const windowButtonsNav = document.createElement('div');
    windowButtonsNav.className = 'flex h-[10%] justify-end w-full bg-gray-500 items-baseline px-2 items-center'

    const closeBtn = document.createElement('button');
    closeBtn.className = 'w-[1.2rem] h-[1.2rem] flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition'
    closeBtn.textContent = 'X'

    closeBtn.addEventListener('click',(e) => {
        window.remove();
    })

    let dragging = false;
    let offsetX,offsetY;
    window.addEventListener('mousedown',(e) => {
        dragging = true;
        window.classList.add('cursor-grabbing')

        offsetX = e.clientX - window.getBoundingClientRect().left;
        offsetY = e.clientY - window.getBoundingClientRect().top;
    })

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
      
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
      
        window.style.left = newX + 'px';
        window.style.top = newY + 'px';
      });

    document.addEventListener('mouseup', () => {
        if (!dragging) return;
      
        dragging = false;
        window.classList.remove('cursor-grabbing');
    });

    windowButtonsNav.appendChild(closeBtn);
    window.appendChild(windowButtonsNav);

    return window;
}

const handleCameraOpener = (e) => {

    const window = windowMaker();

    if(navigator && navigator.mediaDevices){
        const options = {audio: false, video: { facingMode: "user", width: 300, height: 300 }};
        const videoElem = document.createElement('video');


    }
    else{
        const errDiv = document.createElement('div');
        errDiv.className = 'flex w-full h-full items-center text-center';

        const text = document.createElement('h4');
        text.textContent = 'CAMERA NOT SUPPORTED :(';

        errDiv.appendChild(text);
        window.appendChild(errDiv);
    }
    
    document.body.appendChild(window);
}

