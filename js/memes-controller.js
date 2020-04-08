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

    renderCanvas()

    //     resizeCanvas()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}



function renderCanvas() {
    var meme = getGMeme();
    var texts = meme.lines;
    var img = getImageById(meme.selectedImgId);
    var placeToText = getPlaceToText();
    // drawImg(img.url)
    drawImg(img.url)

    function drawImg(url) {
        var img = new Image()
        img.src = url;
        gCanvas.width = img.width;
        gCanvas.height = img.height;
        img.onload = () => {
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,width,height
            texts.forEach((text, idx) => {
                drawText(text.txt, gCanvas.width * 0.1, placeToText[idx], text.fillColor, text.outlineColor, text.fontType, text.size, text.align)
            })
        }
    }


}

function getPlaceToText() {
    var canvasHeight = gCanvas.height;
    return {
        0: canvasHeight * 0.1,
        1: canvasHeight * 0.9,
        2: canvasHeight * 0.4,
        3: canvasHeight * 0.4,
        4: canvasHeight * 0.4,
        5: canvasHeight * 0.4,
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
