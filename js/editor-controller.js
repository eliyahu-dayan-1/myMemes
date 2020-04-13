'use strict';

var gIsCklickDown = false;
var gCanvas;
var gCtx;
var gElTextInput = document.querySelector('#memes-text')
var gElImg;
var gIsNewImg;

// DELL
// var gCurrShape = 'pen';

// var gColor = {
//     fill: '#43cb30',
//     outLine: 'black'
// }

// var gCurrLocation = {
//     clickXY: {},
// }

function onOpenMemesEditor() {

    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

    const img = getImageById(getGMeme().selectedImgId)
    console.log(img)
    renderCanvas(img)

    gCanvas.addEventListener('click', () => {
        if (getIsOnText()) gElTextInput.focus()
        else {
            setIsOnText(false);
            renderCanvas()
        }
    })
}
function onTextChange(elInput) {
    setText(elInput.value);
    setIsOnText(true)
    renderCanvas()
}

function onChangeSize(amount) {
    setFontSize(amount)
    renderCanvas()
}

function onChangeFillColor(color) {
    setFillColor(color)
    renderCanvas()
}

function onChangeOutlineColor(color) {
    setOutlineColor(color)
    renderCanvas()
}

function onChangeFont(elSelect) {
    setFontType(elSelect.value)
    renderCanvas()
}

function onTextUpDown(amount) {
    changeTextLocation(amount)
    renderCanvas()
}


function onDelOrAddText(val) {
    delOrAddText(val)
    setIsOnText(true)
    gCanvas.click()
    renderCanvas()
}

function onSaveImg() {
    setIsOnText(false)
    renderCanvas()
    saveImg()
}

function onCanvasMouseDown(ev) {
    gIsCklickDown = true;
    moveElement(ev)
}

function onCanvasMouseMove(ev) {
    if (gIsCklickDown) {
        moveElement(ev);
    }
}

function onCanvasMouseUp() {
    gIsCklickDown = false;
}


function drawAroundText() {
    // draw rect around texts
    var currLine = getCurrLine();
    if (!currLine) return;
    drawRect(currLine.leftCorX, currLine.topCorY, currLine.width + 10, currLine.height + 10)
}

function onChangeImg() {
    closeAndOpenSection(['my-memes-open', 'editor-open'], 'gallery-open')
}

function moveElement(canvasEv) {
    var touchX = canvasEv.offsetX
    var touchY = canvasEv.offsetY
    var lines = getGMeme().lines;
    var touchLineIndex;

    var tuchLine = lines.find((line, idx) => {
        var isXRange = touchX >= line.leftCorX && touchX <= line.rightCorX;
        var isYRange = touchY >= line.topCorY && touchY <= line.y;
        touchLineIndex = idx;
        return isXRange && isYRange;
    })
    if (!tuchLine) {
        setIsOnText(false)
        renderCanvas()
        return;
    }
    setCurrLineNewCorr(canvasEv, touchLineIndex)
    setIsOnText(true)
    renderCanvas()
}

function renderInputLine() {
    var currLine = getCurrLine();
    if (currLine === undefined) return;
    document.querySelector('#memes-text').value = currLine.txt;
}

function renderCanvas(img = undefined) {
    if (gIsNewImg) loadNewImg(img.url)
    else drawImg(gElImg)

    drawLines()
    renderToolBarOption()
    renderInputLine()
}


function loadNewImg(url) {
    gElImg = new Image()
    gElImg.src = url;
    gElImg.onload = () => {

        var widthImg = gElImg.width;
        var heightImg = gElImg.height;
        var widthBody = document.body.offsetWidth;

        widthImg = (widthBody > 940) ? 500 :
            (widthBody > 650) ? 400 : 340;

        heightImg = widthImg * (heightImg / gElImg.width)

        gCanvas.width = widthImg;
        gCanvas.height = heightImg;
        drawImg(gElImg)
        setGIsNewImg(false)
    }
}

function renderKeyWord(keyWords = getKeyWords()) {
    var elKeyWords = document.querySelector('.key-words');
    elKeyWords.innerHTML = `<button onclick="onWordClick('all')" style="font-size: 2rem; color: grey; text-weight: 900;"}>All</button>`;
    for (const KeyWord in keyWords) {
        var strHtml = `<button onclick="onWordClick('${KeyWord}')" style="font-size:${(keyWords[KeyWord]) + "rem"};"}>${KeyWord}</button>`
        elKeyWords.innerHTML += strHtml
    }
}

function renderToolBarOption() {
    var currLine = getCurrLine();
    if (!currLine) return;
    var elOutline = document.querySelector('#text-outline')
    var elfillText = document.querySelector('#text-fill')
    var elSelect = document.querySelector('.change-font')

    elOutline.value = currLine.outlineColor;
    elfillText.value = currLine.fillColor;
    elSelect.value = currLine.fontType;
}

// draw img from local
function drawImg(elimg) {
    gCtx.drawImage(elimg, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,width,height
}

function drawLine(text, x, y, fill, outLine, font, fontSize, textAlign) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = outLine;
    gCtx.fillStyle = fill;
    gCtx.font = fontSize + " " + font
    gCtx.textAlign = textAlign;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

}

function drawLines() {
    var meme = getGMeme();
    var texts = meme.lines;

    gCtx.drawImage(gElImg, 0, 0, gCanvas.width, gCanvas.height)
    texts.forEach((text) => {
        drawLine(text.txt, text.x, text.y, text.fillColor, text.outlineColor, text.fontType, text.size + "px", text.align)
    })
    if (getIsOnText) drawAroundText()
}

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    // gCtx.lineWidth = '2';
    // gCtx.strokeStyle = 'white'
    // gCtx.rect(x, y, width, height)
    gCtx.stroke()
    gCtx.fillStyle = 'rgba(209, 197, 197, 0.418)'
    gCtx.fillRect(x, y, width, height)
    gCtx.closePath()
}


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function setGIsNewImg(bool) {
    gIsNewImg = bool
}
