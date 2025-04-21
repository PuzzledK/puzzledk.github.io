import windowMaker,{errWin,bringToFront} from "./windowHandlers";

let DOMState = {
    zind : 100,
    wallpaper : '3.jpeg'
}

let settingsNavItems = ['Wallpaper','Temp Setting 1','Temp Setting 2'];

const cameraState = {
    opened: false,
    stream: null,
    window: null,

    cleanup: function() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.opened = false;
        this.window = null;
    }
};

const settingState = {
    opened : false,
    window : null,

    cleanup: function(){
        this.opened = false;
        this.window = null;
    }
}

document.addEventListener('DOMContentLoaded',(e) => {
    const mainDiv = document.getElementById('mainDiv');
    const camera = document.getElementById('camera');
    const settings = document.getElementById('settings');

    // mainDiv.classList.add(`bg-[url(/assets/wallpapers/${DOMState.wallpaper})]`);

    mainDiv.style.backgroundImage = `url(/assets/wallpapers/${DOMState.wallpaper})`;

    camera.addEventListener('click',handleCameraOpener);
    settings.addEventListener('click',handleSettingsOpener);

})

const handleCameraOpener = (e) => {
    if(cameraState.opened) return;
    cameraState.opened = true;
    const windowEl = windowMaker('Camera',cameraState);
    cameraState.window = windowEl;

    windowEl.addEventListener('mousedown',()=>{
        bringToFront(cameraState,DOMState);
    })

    if(navigator && navigator.mediaDevices){
        const options = {audio: false, video: { facingMode: "user"}};
        const videoElem = document.createElement('video');
        videoElem.className = 'w-full h-full scale-x-[-1]';

        navigator.mediaDevices.getUserMedia(options).then((stream) => {
            cameraState.stream = stream;
            videoElem.srcObject = stream;
            videoElem.onloadedmetadata = function(e) {
                videoElem.play();
            };

            windowEl.appendChild(videoElem);
        }).catch((err) => {
            errWin(windowEl,err);
        })
    }
    else{
        errWin(windowEl,"CAMERA NOT SUPPORTED :(");
    }
    
    document.body.appendChild(windowEl);
}

const handleSettingsOpener = (e) => {
    if(settingState.opened) return;

    settingState.opened = true;

    const windowEl = windowMaker("Settings",settingState);
    settingState.window = windowEl;

    windowEl.addEventListener('mousedown',()=>{
        bringToFront(settingState,DOMState);
    })

    const restWindow = document.createElement('div');
    restWindow.className = 'w-full h-full bg-white flex';

    const sideNav = document.createElement('div');
    sideNav.className = 'flex flex-col h-full relative space-y-2 border-r-2 border-r-black shadow-2xl shadow-gray-500 w-[15%] pt-2';

    settingsNavItems.map((elem) => {
        const wallPaperElem = document.createElement('div');
        wallPaperElem.className = 'flex flex-row items-center space-x-1 border-b-2 border-b-black w-full text-center';
        wallPaperElem.textContent = elem;

        sideNav.appendChild(wallPaperElem);
    })
    
    restWindow.appendChild(sideNav);

    windowEl.appendChild(restWindow);
    document.body.appendChild(windowEl);
}