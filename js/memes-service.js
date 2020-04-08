'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [{ id: 1, url: 'img/meme-imgs/meme-imgs-(square)/1.jpg', keywords: ['trunp'] },
            { id: 2, url: 'img/meme-imgs/meme-imgs-(square)/2.jpg', keywords: ['dog', 'loves', 'animal'] },
            { id: 3, url: 'img/meme-imgs/meme-imgs-(square)/3.jpg', keywords: ['sleep', 'baby', 'dog'] },
            ];
    
    
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat dfa', size: 50, align: 'left', outlineColor: 'red', fillColor: 'white', x: 20 , y: 40,
        },
        {
            txt: 'I never eat dfa', size: 50, align: 'left', outlineColor: 'red', fillColor: 'white', x: 400 , y:24
        },
    ]     
} 

function setText(text){
    gMeme.lines[0].txt = text
}

function setImageById(id){
    gMeme.selectedImgId = id
}

function getGMeme() {
    return gMeme;
}

function setFontSize(amount){
    var currImgId = gMeme.selectedImgId;
    gMeme.lines[currImgId].size += amount
}

function getImageById(id){
    return gImgs.find(img => img.id === id)
}