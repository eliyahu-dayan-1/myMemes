'use strict';

const SAVE_MEME_KEY = 'saveMemes'

var gImageUrls = getGImageUrls()

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [{ id: 1, url: 'img/meme-imgs/meme-imgs-(square)/1.jpg', keywords: ['trump','speech'] },
            { id: 2, url: 'img/meme-imgs/meme-imgs-(square)/2.jpg', keywords: ['dog', 'loves', 'animal'] },
            { id: 3, url: 'img/meme-imgs/meme-imgs-(square)/3.jpg', keywords: ['sleep', 'baby', 'dog'] },
            { id: 4, url: 'img/meme-imgs/meme-imgs-(square)/4.jpg', keywords: ['sleep', 'cat', 'computer'] },
            { id: 5, url: 'img/meme-imgs/meme-imgs-(square)/5.jpg', keywords: ['win', 'baby'] },
            { id: 6, url: 'img/meme-imgs/meme-imgs-(square)/6.jpg', keywords: ['explain'] },
            { id: 7, url: 'img/meme-imgs/meme-imgs-(square)/7.jpg', keywords: ['baby', 'shoke'] },
            { id: 8, url: 'img/meme-imgs/meme-imgs-(square)/8.jpg', keywords: ['happy', 'artist'] },
            { id: 9, url: 'img/meme-imgs/meme-imgs-(square)/9.jpg', keywords: ['laugh', 'baby'] },
            { id: 10, url: 'img/meme-imgs/meme-imgs-(square)/10.jpg', keywords: ['laugh', 'presedent', 'obama'] },
            { id: 11, url: 'img/meme-imgs/meme-imgs-(square)/11.jpg', keywords: ['football', 'win'] },
            { id: 12, url: 'img/meme-imgs/meme-imgs-(square)/12.jpg', keywords: ['question'] },
            { id: 13, url: 'img/meme-imgs/meme-imgs-(square)/13.jpg', keywords: ['life'] },
            { id: 14, url: 'img/meme-imgs/meme-imgs-(square)/14.jpg', keywords: ['dark', 'afraid'] },
            { id: 15, url: 'img/meme-imgs/meme-imgs-(square)/15.jpg', keywords: ['exactly', 'speech'] },
            { id: 16, url: 'img/meme-imgs/meme-imgs-(square)/16.jpg', keywords: ['laugh'] },
            { id: 17, url: 'img/meme-imgs/meme-imgs-(square)/17.jpg', keywords: ['putin', 'presedent'] },
            { id: 18, url: 'img/meme-imgs/meme-imgs-(square)/18.jpg', keywords: ['baz', 'speech'] }
        ];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
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
    var currImgId = gMeme.selectedLineIdx;

    if(!gMeme.lines[currImgId]){
        addLine()
        return
    };

    gMeme.lines[currImgId].txt = text
    calcRecAroundText()
}

function calcRecAroundText(){
    var currLineIdx = gMeme.selectedLineIdx;
    var currLine = gMeme.lines[currLineIdx]

    var textWidth = gCtx.measureText(currLine.txt).width;
    var textHeight = currLine.size;

    currLine['height'] = textHeight;
    currLine['width'] = textWidth;
    currLine['leftCorX']= currLine.x - (currLine.width/2);
    currLine['rightCorX']= currLine.x + (currLine.width/2);
    currLine['leftCorY'] = currLine.y - (currLine.height);
}

function setImageById(id){
    gMeme.selectedImgId = id
}

// TODO underStand what the problemo
function setCurrLineNewCorr(canvasEv){    
    var currLine = gMeme.lines[gMeme.selectedLineIdx];

    var newCurrX = currLine.x + canvasEv.movementX;
    var newCurrY = currLine.y + canvasEv.movementY;

    // console.log("before X Y", gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y)
    
    currLine.x = newCurrX;
    currLine.y = newCurrY;

    // console.log("after X Y", gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y)
}

function setTextLocation(amount){
    var currImgId = gMeme.selectedImgId;
    if(!gMeme.lines[currImgId]) return;

    var yCordinate = gMeme.lines[currImgId].y;
    if(amount === 1 &&  gCanvas.height > yCordinate) gMeme.lines[gMeme.selectedLineIdx].y++;
    if(amount === -1 &&  yCordinate > 0) gMeme.lines[gMeme.selectedLineIdx].y--;

}

function getImgs(){
    return gImgs;
}

function getGImageUrls(){
    var imagesUrls = loadFromStorage(SAVE_MEME_KEY);
    if(!imagesUrls || !imagesUrls.length) imagesUrls = [];
    return imagesUrls;
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

    gMeme.lines[currImgId].size += amount
}

function setDelOrAddText(val){
    if(val) addLine();
    else removeLine()
}

function setTextIdx(amount){
    if(amount === 1 &&  gMeme.lines.length > gMeme.selectedLineIdx) gMeme.selectedLineIdx++;
    if(amount === -1 &&  gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--;

}


function getImageById(id){
    return gImgs.find(img => img.id === id)
}

function saveImg(){
    var imgContent = gCanvas.toDataURL('image/jpeg');
    saveImgUrl(imgContent)
}    

function saveImgUrl(url){
    var imagesUrls = getGImageUrls()
    imagesUrls.push({url: url})

    gImageUrls = imagesUrls
    
    saveToStorage(SAVE_MEME_KEY , gImageUrls)
}
