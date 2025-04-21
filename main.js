let cameraOpened = false;

document.addEventListener('DOMContentLoaded',(e) => {
    const camera = document.getElementById('camera');

    camera.addEventListener('mousedown',handleCameraOpener);

})

const windowMaker = () => {
    const windowEl = document.createElement('div');
    windowEl.className = 'flex flex-col h-[500px] w-[900px] absolute left-40 top-10 bg-black';

    const windowButtonsNav = document.createElement('div');
    windowButtonsNav.className = 'flex h-[5%] justify-end w-full bg-gray-500 items-baseline px-2 items-center';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'w-[1.2rem] h-[1.2rem] flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition';
    closeBtn.textContent = 'X';

    closeBtn.addEventListener('click', (e) => {
        cameraOpened = false;
        windowEl.remove();
    });

    let dragging = false;
    let offsetX, offsetY;

    windowButtonsNav.addEventListener('mousedown', (e) => {
        dragging = true;
        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;
        windowButtonsNav.classList.remove('cursor-grab');
        windowButtonsNav.classList.add('cursor-grabbing');
        e.preventDefault(); // Prevent text selection
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const windowRect = windowEl.getBoundingClientRect();

        const sideNav = document.getElementById('sideNav');

        const minX = sideNav.getBoundingClientRect().width;
        const maxX = viewportWidth - windowRect.width;
        const maxY = viewportHeight - windowRect.height;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Clamp positions
        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        windowEl.style.position = 'absolute';
        windowEl.style.left = newX + 'px';
        windowEl.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!dragging) return;

        dragging = false;
        windowEl.classList.remove('cursor-grabbing');
    });

    windowButtonsNav.appendChild(closeBtn);
    windowEl.appendChild(windowButtonsNav);

    return windowEl;
};


const handleCameraOpener = (e) => {
    if(cameraOpened) return;
    cameraOpened = true;
    const window = windowMaker();
    let streams;

    if(navigator && navigator.mediaDevices){
        const options = {audio: false, video: { facingMode: "user"}};
        const videoElem = document.createElement('video');
        videoElem.className = 'w-full h-full scale-x-[-1]';

        navigator.mediaDevices.getUserMedia(options).then((stream) => {
            streams = stream;
            videoElem.srcObject = stream;
            videoElem.onloadedmetadata = function(e) {
                videoElem.play();
            };

            window.appendChild(videoElem);
        }).catch((err) => {
            const errDiv = document.createElement('div');
            errDiv.className = 'flex w-full h-full items-center justify-center text-white';

            const text = document.createElement('h4');
            text.textContent = err;

            errDiv.appendChild(text);
            window.appendChild(errDiv);
        })
    }
    else{
        const errDiv = document.createElement('div');
        errDiv.className = 'flex w-full h-full items-center justify-center text-white';

        const text = document.createElement('h4');
        text.textContent = 'CAMERA NOT SUPPORTED :(';

        errDiv.appendChild(text);
        window.appendChild(errDiv);
    }

    const btn = window.querySelector('button');
    btn.addEventListener('click',() => {
        if (streams) {
            streams.getTracks().forEach(track => track.stop());
        }
    })
    
    document.body.appendChild(window);
}

