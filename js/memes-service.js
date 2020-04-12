'use strict';

const SAVE_MEME_KEY = 'saveMemes'

var gSavedMemes = getSavedMemes()

var isOnText = false;

var gImgs = [{ id: 1, url: 'img/meme-imgs/meme-imgs-(square)/1.jpg', keywords: ['trump', 'speech'] },
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
{ id: 18, url: 'img/meme-imgs/meme-imgs-(square)/18.jpg', keywords: ['baz', 'speech'] },
{ id: 19, url: 'img/meme-imgs/meme-imgs-(various)/2.jpg', keywords: ['dance', 'glad'] },
{ id: 20, url: 'img/meme-imgs/meme-imgs-(various)/003.jpg', keywords: ['trump', 'speech'] },
{ id: 21, url: 'img/meme-imgs/meme-imgs-(various)/004.jpg', keywords: ['dog', 'animal'] },
];

const KEY_PICTURE_KEYWORDS = 'pictureKeywords'

var gKeywords = createKeyWords()

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
    ]
}

var gUserPerfer = {
    outlineColor: '#cd0000', 
    fillColor: '#FFFFFF', 
    fontType: 'impact',
};

function addLine() {
    gMeme.lines.push(getNewLine())
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function getIsOnText(){
    return isOnText;
}

function setIsOnText(val){
    isOnText = val;
}



function createKeyWords() {
    var existKeyWords = loadFromStorage(KEY_PICTURE_KEYWORDS) || {};

    var keyWords = gImgs.reduce((accumulator, img) => {
        img.keywords.map(word => {
            if (accumulator[word] === undefined) accumulator[word] = 1.2;
        })
        return accumulator;
    }, existKeyWords)

    saveToStorage(KEY_PICTURE_KEYWORDS, keyWords);

    return keyWords;
}

function getNewLine() {
    var xCord = gCanvas ? gCanvas.width / 2 : 0;

    var linesLength = gMeme.lines.length;
    var yCord = (linesLength === 0)? gCanvas.height * 0.14:
                (linesLength === 1)? gCanvas.height * 0.92 :
                gCanvas.height/2;

    return {
        txt: '', size: 50,
        align: 'center',
        outlineColor: gUserPerfer.outlineColor,
        fillColor: gUserPerfer.fillColor ,
        x: xCord,
        y: yCord,
        fontType: gUserPerfer.fontType,
        height: 50,
        width: 10,
        leftCorX: xCord,
        rightCorX: xCord,
        topCorY: yCord - 45,
    }
}

function getKeyWords() {
    return gKeywords;
}

function getPicturnByKeyWord(txt) {
    if (txt === 'all') return gImgs;
    return gImgs.filter(img =>{
        return img.keywords.some(word => word.includes(txt))
    })
}

function getWordsByKeyword(txt) {
    if (txt === 'all') return gKeywords;
    // txt.toUpperCase() === txt.toLowerCase()

    var filterKeyWords = {}
    for (const word in gKeywords) {
        if (word.includes(txt)) {
            filterKeyWords[word] = gKeywords[word];
        }
    }
    // filterKeyWords['all'] = 2;
    return filterKeyWords;
}

function getImgs() {
    return gImgs;
}

function getSavedMemesById(id) {
    return gSavedMemes.find(image => image.id === id)
}

function getSavedMemes() {
    var imagesUrls = loadFromStorage(SAVE_MEME_KEY);
    if (!imagesUrls || !imagesUrls.length) imagesUrls = [];
    return imagesUrls;
}

function getGMeme() {
    return gMeme;
}

function getImageById(id) {
    return gImgs.find(img => img.id === id)
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setCurrGMeme(id) {
    var savedMeme = getSavedMemesById(id);
    gMeme = savedMeme.obj;
}

function removeLine() {
    var currLineIdx = gMeme.selectedLineIdx;

    gMeme.lines.splice(currLineIdx, 1)
    var currLineLength = gMeme.lines.length;

    gMeme.selectedLineIdx = (currLineLength === currLineIdx && currLineIdx) ? currLineIdx - 1 : currLineIdx;
}

function setText(text) {
    var currImgId = gMeme.selectedLineIdx;

    if (!gMeme.lines[currImgId]) {
        addLine()
        return
    };

    gMeme.lines[currImgId].txt = text
    calcRecAroundText()
}

function setNewLine() {
    addLine()
}

function setPopularWord(word) {
    if(gKeywords[word]) gKeywords[word] += 0.05;
    saveToStorage(KEY_PICTURE_KEYWORDS, gKeywords)
}

function setImageById(id) {
    gMeme.selectedImgId = id
}

// TODO underStand what the problemo
function setCurrLineNewCorr(canvasEv, touchLineIdx) {
    changeCurrLineById(touchLineIdx)
    var currLine = getCurrLine();

    var newCurrX = currLine.x + canvasEv.movementX;
    var newCurrY = currLine.y + canvasEv.movementY;

    currLine.x = newCurrX;
    currLine.y = newCurrY;
    calcRecAroundText()
}

function setFillColor(color){
    gUserPerfer.fillColor = color;

    var currLine = getCurrLine()
    if(currLine) currLine.fillColor = color;
}

function setFontType(fontType){
    gUserPerfer.fontType = fontType;

    var currLine = getCurrLine()
    if(currLine) currLine.fontType = fontType;
}


function setOutlineColor(color){
    gUserPerfer.outlineColor = color;

    var currLine = getCurrLine()
    if(currLine) currLine.outlineColor = color;
}

function changeTextLocation(amount) {
    var currImgId = gMeme.selectedImgId;
    if (!gMeme.lines[currImgId]) return;

    var yCordinate = gMeme.lines[currImgId].y;
    if (amount === 1 && gCanvas.height > yCordinate) gMeme.lines[gMeme.selectedLineIdx].y++;
    if (amount === -1 && yCordinate > 0) gMeme.lines[gMeme.selectedLineIdx].y--;
}

function changeFontSize(amount) {
    var currLineId = gMeme.selectedLineIdx;
    if (!gMeme.lines[currLineId]) return;

    gMeme.lines[currLineId].size += amount
    calcRecAroundText()
}

function setDelOrAddText(val) {
    if (val) addLine();
    else removeLine()
}

function changeTextfocus(amount) {
    if (amount === 1 && gMeme.lines.length - 1 > gMeme.selectedLineIdx) gMeme.selectedLineIdx++;
    if (amount === -1 && gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--;
    console.log(gMeme.selectedLineIdx)
}

function changeCurrLineById(id){
    gMeme.selectedLineIdx = id;
}

function calcRecAroundText() {
    var currLineIdx = gMeme.selectedLineIdx;
    var currLine = gMeme.lines[currLineIdx]

    var textWidth = gCtx.measureText(currLine.txt).width;
    var textHeight = currLine.size;

    currLine['height'] = textHeight;
    currLine['width'] = textWidth;
    currLine['leftCorX'] = currLine.x - (currLine.width / 2);
    currLine['rightCorX'] = currLine.x + (currLine.width / 2);
    currLine['topCorY'] = currLine.y - (currLine.height);
}

function earseSavedMeme(id) {
    var savedMemes = getSavedMemes();

    savedMemes.map((meme, memeIdx) => {
        if (meme.id === id) savedMemes.splice(memeIdx, 1);
    });
    gSavedMemes = savedMemes;
    saveToStorage(SAVE_MEME_KEY, gSavedMemes)
}

function saveImg() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    saveImgUrl(imgContent)
}

function saveImgUrl(url) {
    var lastImage = gSavedMemes[gSavedMemes.length - 1];
    var newId = (lastImage) ? lastImage.id + 1 : 0;
    gSavedMemes.push({ id: newId, url: url, obj: getGMeme()})

    saveToStorage(SAVE_MEME_KEY, gSavedMemes)
}
