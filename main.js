import windowMaker,{errWin} from "./windowMakers";
let zind = 10;

const bringToFront = (window) => {
    window.style.zIndex = zind++;
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
    const camera = document.getElementById('camera');
    const settings = document.getElementById('settings');

    camera.addEventListener('click',handleCameraOpener);
    settings.addEventListener('click',handleSettingsOpener);

})

const handleCameraOpener = (e) => {
    if(cameraState.opened) return;
    cameraState.opened = true;
    const windowEl = windowMaker('Camera',cameraState);
    cameraState.window = windowEl;

    windowEl.addEventListener('mousedown',()=>{
        bringToFront(windowEl);
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
        bringToFront(windowEl);
    })

    const restWindow = document.createElement('div');
    restWindow.className = 'w-full h-full bg-white'

    windowEl.appendChild(restWindow);
    document.body.appendChild(windowEl);
}