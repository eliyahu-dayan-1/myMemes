'use strict';

function onEditSavedMeme(id) {
    debugger
    setCurrGMeme(id);
    closeAndOpenSection(['gallery-open', 'my-memes-open'], 'editor-open');
    onImageChoose(getGMeme().selectedImgId)
}

function onDownloadSavedMeme(elLink, id) {
    var savedMemes = getSavedMemesById(id)
    elLink.href = savedMemes.url;
}

function onEarseSavedMeme(id) {
    earseSavedMeme(id)
    renderBitImg(getSavedMemes());
}

function renderBitImg(images) {
    var elGallery = document.querySelector('.my-memes');
    elGallery.innerHTML = '';
    images.forEach(image => {
        var elImg = `<div><img class="my-meme-image" src=${image.url}
        alt="">
        <button onclick="onEditSavedMeme(${image.id})" class="memes-edit"><img class="operation-img" src="img/icons/edit-icon.svg"
        alt="edit"></button>
        <a href="#" class="memes-download" onclick="onDownloadSavedMeme(this, ${image.id})" download="my-img.jpg" ><img class="operation-img" src="img/icons/download-icon.png"
        alt="download"></a>
            <button onclick="onEarseSavedMeme(${image.id})" class="memes-earse"><img class="operation-img" src="img/icons/trash.png"
            alt="delete text"></button>
            </div>
            `;

        elGallery.innerHTML += elImg;
    })
}