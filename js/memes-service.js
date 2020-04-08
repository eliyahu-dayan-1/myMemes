'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [{ id: 1, url: '../img/meme-imgs/meme-imgs-(square)/1.jpg', keywords: ['trunp'] },
            { id: 2, url: '../img/meme-imgs/meme-imgs-(square)/2.jpg', keywords: ['dog', 'loves', 'animal'] },
            { id: 3, url: '../img/meme-imgs/meme-imgs-(square)/3.jpg', keywords: ['sleep', 'baby', 'dog'] },
            ];
    
    
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat dfa', size: '50px', align: 'left', outlineColor: 'red', fillColor: 'white' 
        },
     {
        txt: 'I never eat dfa', size: '50px', align: 'left', outlineColor: 'red', fillColor: 'white', fontType:'Impact'
    }]
} 


function getGMeme() {
    return gMeme;
}

function getImageById(id){
    return gImgs.find(img => img.id === id)
}