import windowMaker, {errWin,bringToFront} from "./windowHandlers";
import { DOMState,cameraState } from "../main";

export const handleCameraOpener = (e) => {
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