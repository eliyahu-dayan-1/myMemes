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
        getNewLine()
        ]     
} 

function addLine(){
    gMeme.lines.push(getNewLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function setNewLine(){
    addLine()
}

function getNewLine(){
    console.log(gCanvas)
    var yCord = gCanvas ? gCanvas.width/2 : 0;
    var xCord = gCanvas ? gCanvas.height/2 : 0;
    return {
        txt: '', size: 50, align: 'center', outlineColor: 'red', fillColor: 'white', x: xCord , y: yCord, fontType: 'Impact'
    }
}

function removeLine(){
    var currLineIdx = gMeme.selectedLineIdx;

    gMeme.lines.splice(currLineIdx, 1)
    var currLineLength = gMeme.lines.length;

    currLineIdx = currLineLength > currLineIdx? currLineIdx: currLineIdx - 1
}

function setText(text){
    var currImgId = gMeme.selectedImgId;
    if(!gMeme.lines[currImgId]) return;

    gMeme.lines[currImgId].txt = text
}

function setImageById(id){
    gMeme.selectedImgId = id
}

function setTextLocation(amount){
    var currImgId = gMeme.selectedImgId;
    if(!gMeme.lines[currImgId]) return;

    var yCordinate = gMeme.lines[currImgId].y;
    if(amount === 1 &&  gCanvas.height > yCordinate) gMeme.lines[gMeme.selectedLineIdx].y++;
    if(amount === -1 &&  yCordinate > 0) gMeme.lines[gMeme.selectedLineIdx].y--;
    console.log(yCordinate)
    console.log(gCanvas.height)
    console.log(amount)

}

function getGMeme() {
    return gMeme;
}

function getCurrLine(){
    return  gMeme.lines[gMeme.selectedLineIdx];
}

function setFontSize(amount){
    var currImgId = gMeme.selectedImgId;
    if(!gMeme.lines[currImgId]) return;
    console.log(gMeme.lines[currImgId])
    gMeme.lines[currImgId].size += amount
}

function setDelOrAddText(val){
    if(val) addLine();
    else removeLine()
}

function setTextIdx(amount){
    if(amount === 1 &&  gMeme.lines.length > gMeme.selectedLineIdx) gMeme.selectedLineIdx++;
    if(amount === -1 &&  gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--;

    console.log(amount)
    console.log(gMeme.selectedLineIdx)
}


function getImageById(id){
    return gImgs.find(img => img.id === id)
}