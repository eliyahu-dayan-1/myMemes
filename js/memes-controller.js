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

    
    renderImgGallery(getImgs())
    renderCanvas()
    renderInputLine()
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

function onSaveImg(){
    saveImg()
}


function renderInputLine(){
    var currLine = getCurrLine();
    if(currLine === undefined) return;
    document.querySelector('#memes-text').value = currLine.txt; 
}

function onCanvasMouseDown(ev){
    gIsCklickDown = true
    moveElement(ev)
};

function onCanvasMouseMove(ev){
    if(gIsCklickDown){
         moveElement(ev);
    }
};

function onCanvasMouseUp(){
    gIsCklickDown = false;
}

function moveElement(canvasEv){
    var touchX = canvasEv.offsetX
    var touchY = canvasEv.offsetX
    var lines = getGMeme().lines;

    console.log('lines', lines)
    var tuchLine = lines.find(line => {
        var isXRange = touchX >= line.leftCorX && touchX <= line.rightCorX;
        var isYRange = touchY >= line.leftCorY && touchY <= line.y;
        return isXRange && isYRange;
    })
    if(!tuchLine) return;
    setCurrLineNewCorr(canvasEv)
    renderCanvas
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
        img.onload = () => {
            gCanvas.width = img.width;
            gCanvas.height = img.height;
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,width,height
            
            texts.forEach((text) => {
            // TODO change x and y
                drawText(text.txt, text.x, text.y, text.fillColor, text.outlineColor, text.fontType, text.size + "px", text.align)
                drawAroundText()
            })
        }
    }

}

function renderImgGallery(images){
    var elGallery = document.querySelector('.choose-image .gallery');
    images.forEach(image => {
        var elImg =`<img class="gallery-image" onclick="onImageClick(${image.id})" src=${image.url}
            alt="">`   
        elGallery.innerHTML += elImg;
    })
}

function renderBitImg(images){
    var elGallery = document.querySelector('.my-memes');
    elGallery.innerHTML = '';
    images.forEach(image => {
        var elImg =`<img class="my-meme-image" src=${image.url}
            alt="">`;
        elGallery.innerHTML += elImg;
    })
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

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.rect(x, y, width, height)
    gCtx.stroke()
    // gCtx.fillStyle = 'orange'
    // gCtx.fillRect(x, y, width, height)
    gCtx.closePath()
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
    var isEditorOpen = bodyClassList.includes('build-open');

    elBtn.innerText = isEditorOpen? 'Choose Image': 'Edit Canvas';
}

function renderOption(){
    // TODO render the option of picture
}

function drawAroundText(){
    // TODO draw rect aroune texts
    var currLine = getCurrLine();
    drawRect(currLine.LeftCorX, currLine.LeftCorY, currLine.width + 10, currLine.height + 10)
}
