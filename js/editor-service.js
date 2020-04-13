'use strict';

var isOnText = false;
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
    calcRecAroundText()
}

function getIsOnText() {
    return isOnText;
}

function getNewLine() {
    var xCord = gCanvas ? gCanvas.width / 2 : 0;

    var linesLength = gMeme.lines.length;
    var yCord = (linesLength > 1)?   gCanvas.height / 2:
                (linesLength === 0) ? gCanvas.height * 0.14 :
                (linesLength === 1) ? gCanvas.height * 0.8: undefined;
            

    var widthBody = document.body.offsetWidth;

    return {
        txt: 'put your text here',
        size: (widthBody > 940) ? 35 : (widthBody > 750) ? 31 : 26,
        align: 'center',
        outlineColor: gUserPerfer.outlineColor,
        fillColor: gUserPerfer.fillColor,
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

function getGMeme() {
    return gMeme;
}

function getImageById(id) {
    return gImgs.find(img => img.id === id)
}

function changeTextLocByKey(ev){
    console.log(ev)
    var currLine =  getCurrLine()
    var moveXTo = (ev.code === "ArrowLeft")? -5:
                    (ev.code === "ArrowRight")? 5: 0 ;

    var moveYTo = (ev.code === "ArrowUp")? -5:
    (ev.code === "ArrowDown")? 5: 0 ;
    currLine.y += moveYTo
    currLine.x += moveXTo
    calcRecAroundText()
}



function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function removeLine() {
    var currLineIdx = gMeme.selectedLineIdx;

    gMeme.lines.splice(currLineIdx, 1)
    var currLineLength = gMeme.lines.length;

    gMeme.selectedLineIdx = (currLineLength === currLineIdx && currLineIdx) ? currLineIdx - 1 : currLineIdx;
}

function changeText(text) {
    var currLineId = gMeme.selectedLineIdx;

    if (!gMeme.lines[currLineId]) {
        addLine()
    };

    if (gMeme.lines[currLineId].txt === 'put your text here') text = text.slice(-1);;

    gMeme.lines[currLineId].txt = text
    calcRecAroundText()
}

function setNewLine() {
    addLine()
}

function setUserImage(url) {
    var lastId = gImgs[gImgs.length - 1].id;
    var newId = (lastId !== undefined) ? lastId + 1 : 0;
    gImgs.push({ id: newId, url, keywords: [] });
    setImageById(newId);
}

function setImageById(id) {
    gMeme.selectedImgId = id
}

function setIsOnText(val) {
    isOnText = val;
}

function setCurrGMeme(id) {
    debugger
    var savedMeme = getSavedMemesById(id);
    gMeme = savedMeme.obj;
}

function setCurrLineNewCorr(canvasEv, touchLineIdx) {
    changeCurrLineById(touchLineIdx)
    var currLine = getCurrLine();
    console.log(canvasEv)

    // var newCurrX = canvasEv.offsetX;
    // var newCurrY = canvasEv.offsetY;
    var newCurrX = currLine.x + canvasEv.movementX;
    var newCurrY = currLine.y + canvasEv.movementY;
    
    currLine.x = newCurrX;
    currLine.y = newCurrY;
    calcRecAroundText()
}

function setFillColor(color) {
    gUserPerfer.fillColor = color;

    var currLine = getCurrLine()
    if (currLine) currLine.fillColor = color;
}


function setOutlineColor(color) {
    gUserPerfer.outlineColor = color;

    var currLine = getCurrLine()
    if (currLine) currLine.outlineColor = color;
}

function setFontType(fontType) {
    gUserPerfer.fontType = fontType;

    var currLine = getCurrLine()
    if (currLine) currLine.fontType = fontType;
}

function setFontSize(amount) {
    var currLineId = gMeme.selectedLineIdx;
    if (!gMeme.lines[currLineId]) return;

    gMeme.lines[currLineId].size += amount
    calcRecAroundText()
}

function delOrAddText(val) {
    if (val) addLine();
    else removeLine()
}

function changeTextfocus(amount) {
    if (amount === 1 && gMeme.lines.length - 1 > gMeme.selectedLineIdx) gMeme.selectedLineIdx++;
    if (amount === -1 && gMeme.selectedLineIdx > 0) gMeme.selectedLineIdx--;
}

function changeCurrLineById(id) {
    gMeme.selectedLineIdx = id;
}

function calcRecAroundText() {
    var currLineIdx = gMeme.selectedLineIdx;
    var currLine = gMeme.lines[currLineIdx]

    var textWidth = gCtx.measureText(currLine.txt).width;
    var textHeight = currLine.size;

    currLine.height = textHeight;
    currLine['width'] = textWidth;
    currLine['leftCorX'] = currLine.x - (currLine.width / 2);
    currLine['rightCorX'] = currLine.x + (currLine.width / 2);
    currLine['topCorY'] = currLine.y - (currLine.height);
}

function saveImg() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    var lastImage = gSavedMemes[gSavedMemes.length - 1];

    var newId = (lastImage) ? lastImage.id + 1 : 0;
    gSavedMemes.push({
        id: newId, url: imgContent, obj: getGMeme()
    })

    saveToStorage(SAVE_MEME_KEY, gSavedMemes)
}

