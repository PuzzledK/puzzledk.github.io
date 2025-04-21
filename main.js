import windowMaker,{errWin,bringToFront} from "./windowHandlers";

const DOMState = {
    zind : 100,
    wallpaper : '3.jpeg'
}

const settingsNavItems = ['Wallpaper'];
const wallPaperOptions = ['1.png','2.jpg','3.jpeg'];

const changeWallPaper = (elem) => {
    const mainDiv = document.getElementById('mainDiv');
    DOMState.wallpaper = elem;

    mainDiv.style.backgroundImage = `url(/assets/wallpapers/${DOMState.wallpaper})`;
}

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
    sideNav.className = 'flex flex-col items-center relative space-y-2 border-r-2 border-r-black shadow-2xl shadow-gray-500 w-[15%] pt-2';

    settingsNavItems.map((elem) => {
        const wallPaperElemTxt = document.createElement('p');
        wallPaperElemTxt.textContent = elem;

        const wallPaperBorder = document.createElement('div')
        wallPaperBorder.className = 'border-b-2 border-b-black w-full shadow-2xl';
        
        sideNav.appendChild(wallPaperElemTxt);
        sideNav.appendChild(wallPaperBorder);
    });

    const settingContent = document.createElement('div');
    settingContent.className = 'flex flex-row flex-wrap w-full items-center justify-center space-x-5';

    wallPaperOptions.map((elem) => {
        const imgDiv = document.createElement('div');
        const img = document.createElement('img');

        img.className = 'w-[175px] h-[175px]';
        img.src = `/assets/wallpapers/${elem}`;

        imgDiv.appendChild(img);
        settingContent.appendChild(imgDiv);

        imgDiv.addEventListener('click' ,(e) => {
            e.preventDefault();

            changeWallPaper(elem);
        })

    })
    
    restWindow.appendChild(sideNav);
    restWindow.appendChild(settingContent);

    windowEl.appendChild(restWindow);
    document.body.appendChild(windowEl);
}