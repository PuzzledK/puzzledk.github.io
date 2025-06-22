const windowMaker = (windowName,stateManager) => {
    const windowEl = document.createElement('div');
    windowEl.className = [
        'flex flex-col absolute left-2 top-2',
        'bg-black shadow-lg rounded-lg',
        'w-[96vw] max-w-[900px] min-w-[180px]',
        'h-[70vh] max-h-[90vh] min-h-[180px]',
        'sm:left-10 sm:top-5',
        'sm:w-[90vw] sm:min-w-[280px] sm:h-[60vh] sm:min-h-[200px]'
    ].join(' ');

    const windowButtonsNav = document.createElement('div');
    windowButtonsNav.className = [
        'flex justify-between items-center w-full',
        'bg-black px-2',
        'h-12 min-h-12',
        'sm:h-[44px] sm:min-h-[44px]'
    ].join(' ');

    const navText = document.createElement('p');
    navText.className = [
        'truncate font-semibold',
        'text-white',
        'text-base sm:text-lg md:text-xl',
        'flex-1 text-left'
    ].join(' ');
    navText.textContent = windowName;

    const closeBtn = document.createElement('button');
    closeBtn.className = [
        'w-8 h-8 flex items-center justify-center rounded-full',
        'bg-red-600 text-white hover:bg-red-700 transition',
        'text-base sm:text-lg'
    ].join(' ');
    closeBtn.textContent = 'X';

    closeBtn.addEventListener('click', (e) => {
        windowEl.classList.add('out');

        windowEl.addEventListener('animationend',() => {
            windowEl.remove();
            if (stateManager && stateManager.cleanup) {
                stateManager.cleanup();
            }
        })
        
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

    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = [
        'w-8 h-8 flex items-center justify-center rounded-full',
        'bg-green-600 text-white hover:bg-green-700 transition ml-2',
        'text-base sm:text-lg'
    ].join(' ');
    fullscreenBtn.textContent = '⛶';

    let isFullscreen = false;
    let prevStyle = {};
    fullscreenBtn.addEventListener('click', () => {
        if (!isFullscreen) {
            prevStyle = {
                left: windowEl.style.left,
                top: windowEl.style.top,
                width: windowEl.style.width,
                height: windowEl.style.height,
            };
            windowEl.style.left = '0px';
            windowEl.style.top = '0px';
            windowEl.style.width = '100vw';
            windowEl.style.height = '100vh';
            windowEl.style.maxWidth = '100vw';
            windowEl.style.maxHeight = '100vh';
            windowEl.style.minWidth = '0';
            windowEl.style.minHeight = '0';
            windowEl.style.zIndex = 9999;
            isFullscreen = true;
        } else {
            windowEl.style.left = prevStyle.left || '40px';
            windowEl.style.top = prevStyle.top || '20px';
            windowEl.style.width = prevStyle.width || '90vw';
            windowEl.style.height = prevStyle.height || '60vh';
            windowEl.style.maxWidth = '900px';
            windowEl.style.maxHeight = '90vh';
            windowEl.style.minWidth = '180px';
            windowEl.style.minHeight = '180px';
            windowEl.style.zIndex = '';
            isFullscreen = false;
        }
    });

    const resizeHandle = document.createElement('div');
    resizeHandle.className = [
        'absolute right-0 bottom-0 z-10',
        'w-5 h-5 sm:w-6 sm:h-6',
        'cursor-nwse-resize'
    ].join(' ');
    resizeHandle.style.background = 'transparent';

    let resizing = false;
    let startX, startY, startWidth, startHeight;

    resizeHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        resizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = windowEl.offsetWidth;
        startHeight = windowEl.offsetHeight;
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!resizing) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        let newWidth = startWidth + dx;
        let newHeight = startHeight + dy;
        
        const maxWidth = window.innerWidth * 0.98;
        const maxHeight = window.innerHeight * 0.95;
        newWidth = Math.max(window.innerWidth * 0.2, Math.min(newWidth, maxWidth));
        newHeight = Math.max(window.innerHeight * 0.2, Math.min(newHeight, maxHeight));
        windowEl.style.width = newWidth + 'px';
        windowEl.style.height = newHeight + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (resizing) {
            resizing = false;
            document.body.style.userSelect = '';
        }
    });

    const buttonGroup = document.createElement('div');
    // Button group stays right-aligned
    buttonGroup.className = 'flex gap-2 items-center flex-shrink-0';
    buttonGroup.appendChild(fullscreenBtn);
    buttonGroup.appendChild(closeBtn);

    windowButtonsNav.appendChild(navText);
    windowButtonsNav.appendChild(buttonGroup);
    windowEl.appendChild(windowButtonsNav);
    windowEl.appendChild(resizeHandle);

    return windowEl;
}

export const errWin = (windowEl,err) => {
    const errDiv = document.createElement('div');
    errDiv.className = 'flex w-full h-full items-center justify-center text-white';

    const text = document.createElement('h4');
    text.textContent = err;

    errDiv.appendChild(text);
    windowEl.appendChild(errDiv);
}

export const bringToFront = (stateManager,DOMState) => {
    if(stateManager.window){
        stateManager.window.style.zIndex = DOMState.zind++;
    }
}

export default windowMaker;
