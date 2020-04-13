'use strict';


const SAVE_MEME_KEY = 'saveMemes'
var gSavedMemes = getSavedMemes()


function getSavedMemesById(id) {
    return gSavedMemes.find(image => image.id === id)
}

function getSavedMemes() {
    var imagesUrls = loadFromStorage(SAVE_MEME_KEY);
    if (!imagesUrls || !imagesUrls.length) imagesUrls = [];
    return imagesUrls;
}

function setCurrGMeme(id) {
    var savedMeme = getSavedMemesById(id);
    gMeme = savedMeme.obj;
}

function earseSavedMeme(id) {
    var savedMemes = getSavedMemes();

    savedMemes.map((meme, memeIdx) => {
        if (meme.id === id) savedMemes.splice(memeIdx, 1);
    });
    gSavedMemes = savedMemes;
    saveToStorage(SAVE_MEME_KEY, gSavedMemes)
}