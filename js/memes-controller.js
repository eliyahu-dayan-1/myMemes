'use strict';

var gIsCklickDown = false;
var gCanvas;
var gCtx;
var gCurrShape = 'pen';
var gColor = {
    fill: '#43cb30',
    outLine: 'black'
}
var gCurrLocation = {
    clickXY: {},
}

function init() {
    gCanvas = document.querySelector('#my-canvas')
    gCtx = gCanvas.getContext('2d')

    setNewLine()

    renderCanvas()
    renderInputLine()

    //     resizeCanvas()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}

function onTextChange(elInput){
    setText(elInput.value);
    renderCanvas()
}

function onImageClick(id){
    setImageById(id)
    var elBtn = document.querySelector('.editor-display')
    onEditorDisplayBtn(elBtn)
    renderCanvas()
}

function onChangeSize(amount){
    console.log("alive")
    console.log(amount)
    setFontSize(amount)
    renderCanvas()
}

function onTextUpDown(amount){
    setTextLocation(amount)
    renderCanvas()
}

function onSwitch(amount){
    setTextIdx(amount)
    renderInputLine()
    renderCanvas()
}

function onDelOrAddText(val){
    setDelOrAddText(val)
    renderInputLine()
    renderCanvas()
}


function renderInputLine(){
    var currLine = getCurrLine();
    if(currLine === undefined) return;
    document.querySelector('#memes-text').value = currLine.txt; 
}


function renderCanvas() {
    var meme = getGMeme();
    var texts = meme.lines;
    var img = getImageById(meme.selectedImgId);
    // drawImg(img.url)
    drawImg(img.url)

    function drawImg(url) {
        var img = new Image()
        img.src = url;
        gCanvas.width = img.width;
        gCanvas.height = img.height;
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,width,height
            
            texts.forEach((text) => {
            // TODO change x and y
                drawText(text.txt, text.x, text.y, text.fillColor, text.outlineColor, text.fontType, text.size + "px", text.align)
            })
        }
    }


}

// draw img from local
function drawImg(url) {
    var img = new Image()
    img.src = url;
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,width,height
    }
}

function drawText(text, x, y, fill, outLine, font, fontSize , textAlign) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = outLine;
    gCtx.fillStyle = fill;
    gCtx.font =  fontSize + " " + font 
    gCtx.textAlign = textAlign;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}


function toggelEditor() {
    document.body.classList.toggle('build-open')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onEditorDisplayBtn(elBtn){
    toggelEditor();
    var bodyClassList = document.body.classList.value;
    var isEditorOpen = bodyClassList.includes('build-open') 


    elBtn.innerText = isEditorOpen? 'Choose Image': 'Edit Canvas';
}

