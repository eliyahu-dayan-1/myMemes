'use strict';

function onImageChoose(id) {
    setImageById(id)
    closeAndOpenSection(['gallery-open', 'my-memes-open'], 'editor-open')
    renderCanvas()
}

function onWordClick(word) {
    setPopularWord(word);
    renderKeyWord(getWordsByKeyword(word))
    renderImgGallery(getPicturnByKeyWord(word)
    )
}

function renderImgGallery(images) {
    var elGallery = document.querySelector('.choose-image .gallery');
    elGallery.innerHTML = '';
    images.forEach(image => {
        var elImg = `<img class="gallery-image" onclick="onImageChoose(${image.id})" src=${image.url}
            alt="">`
        elGallery.innerHTML += elImg;
    })
}

function renderGallery(images) {
    renderImgGallery(images)
    renderKeyWord()
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
// to do handle this
function onImgInput(ev) {
    loadImageFromInput(ev)
    closeAndOpenSection(['gallery-open'], 'editor-open')
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.src = event.target.result;
        setUserImage(img.src);
        renderCanvas()
    }
    reader.readAsDataURL(ev.target.files[0]);
}

