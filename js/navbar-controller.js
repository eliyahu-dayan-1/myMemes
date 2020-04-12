'use strict';


function onMyMemes() {
    renderBitImg(getSavedMemes());
    closeAndOpenSection(['gallery-open', 'editor-open'], 'my-memes-open')
}

function onGalleryClick() {
    closeAndOpenSection(['my-memes-open'],'')
}

function toggleMenu(){
    document.body.classList.toggle('menu-open')
}

function closeAndOpenSection(closesArr, openStr){
    closesArr.forEach(close => document.body.classList.remove(close))
    if(openStr) document.body.classList.add(openStr)
}