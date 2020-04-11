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

var gElContainer;

function init() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');

    gElContainer = document.querySelector('.canvas-container');
    renderGallery(getImgs())
    renderCanvas()
    window.addEventListener('resize', function(event){
        renderCanvas()
    });
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}

function onKeyPress(ev){
    // TODO on presskey
    // console.log(ev)
    // document.querySelector('#memes-text').value += ev.key;
}

function onTextChange(elInput) {
    setText(elInput.value);
    setIsOnText(true)
    renderCanvas()
}

function onImageClick(id) {
    setImageById(id)
    onEditorDisplayBtn()
    renderCanvas()
}

function onChangeSize(amount) {
    changeFontSize(amount)
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

function onSwitch(amount) {
    changeTextfocus(amount)
    renderCanvas()
}

function onDelOrAddText(val) {
    setDelOrAddText(val)
    renderCanvas()
}

function onSaveImg() {
    saveImg()
}

function onCanvasMouseDown(ev) {
    gIsCklickDown = true;
    moveElement(ev)
    // console.log(gIsCklickDown)
}

function onCanvasMouseMove(ev) {
    if (gIsCklickDown) {
        moveElement(ev);
        // console.log(gIsCklickDown)
    }
}

function onCanvasMouseUp() {
    gIsCklickDown = false;
    // console.log(gIsCklickDown)
}

function onMyMemes() {
    renderBitImg(getSavedMemes());
    document.body.classList.add('my-memes-open')
}

function onGalleryClick() {
    document.body.classList.remove('my-memes-open')
}

function onEditSavedMeme(id) {
    setCurrGMeme(id)
    renderCanvas()
}

function onDownloadSavedMeme(elLink, id) {
    var savedMemes = getSavedMemesById(id)
    elLink.href = savedMemes.url;
}

function onEarseSavedMeme(id) {
    earseSavedMeme(id)
    renderBitImg(getSavedMemes());
}

function onWordClick(word) {
    setPopularWord(word);
    renderKeyWord(getWordsByKeyword(word))
    renderImgGallery(getPicturnByKeyWord(word)
    )
}

function drawAroundText() {
    // draw rect around texts
    var currLine = getCurrLine();
    if (!currLine) return;
    drawRect(currLine.leftCorX, currLine.topCorY, currLine.width + 10, currLine.height + 10)
}

function onEditorDisplayBtn() {
    toggelEditor();
    var bodyClassList = document.body.classList.value;
    var isEditorOpen = bodyClassList.includes('build-open');
}

// TODO move element
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
    if (!tuchLine){
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

function renderCanvas() {
    var meme = getGMeme();
    var texts = meme.lines;
    var img = getImageById(meme.selectedImgId);

    drawImg(img.url)
    renderToolBarOption()
    renderInputLine()

    function drawImg(url) {
        var img = new Image()
        img.src = url;
        img.onload = () => {
            
            var widthImg = img.width;
            var heightImg = img.height;
            var widthContainer = gElContainer.offsetWidth; 

            if(widthImg + 20 > widthContainer){
                widthImg = widthContainer - 40
                heightImg = widthImg * (heightImg/ img.width)    
            } 

            gCanvas.width = widthImg;
            gCanvas.height = heightImg;

            
            gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,width,height

            texts.forEach((text) => {
                // TODO change x and y
                drawText(text.txt, text.x, text.y, text.fillColor, text.outlineColor, text.fontType, text.size + "px", text.align)
            })
            if(getIsOnText()) drawAroundText()
        }
    }
}

function renderImgGallery(images) {
    var elGallery = document.querySelector('.choose-image .gallery');
    elGallery.innerHTML = '';
    images.forEach(image => {
        var elImg = `<img class="gallery-image" onclick="onImageClick(${image.id})" src=${image.url}
            alt="">`
        elGallery.innerHTML += elImg;
    })
}

function renderGallery(images) {
    renderImgGallery(images)
    renderKeyWord()
}


function renderBitImg(images) {
    var elGallery = document.querySelector('.my-memes');
    elGallery.innerHTML = '';
    images.forEach(image => {
        var elImg = `<div><img class="my-meme-image" src=${image.url}
        alt="">
        <button onclick="onEditSavedMeme(${image.id})" class="memes-edit">🖍</button>
        <a href="#" class="memes-download" onclick="onDownloadSavedMeme(this, ${image.id})" download="my-img.jpg" >⬇</a>
            <button onclick="onEarseSavedMeme(${image.id})" class="memes-earse">🗑</button>
            </div>
            `;

        elGallery.innerHTML += elImg;
    })
}

function renderKeyWord(keyWords = getKeyWords()) {
    var elKeyWords = document.querySelector('.key-words');
    elKeyWords.innerHTML = `<button onclick="onWordClick('all')" style="font-size: 2rem; color: grey; text-weight: 900;"}>All</button>`;
    for (const KeyWord in keyWords) {
        var strHtml = `<button onclick="onWordClick('${KeyWord}')" style="font-size:${(keyWords[KeyWord]) + "rem"};"}>${KeyWord}</button>`
        elKeyWords.innerHTML += strHtml
    }
}

function renderToolBarOption(){
    var currLine = getCurrLine();
    if(!currLine) return;
    var elOutline = document.querySelector('#text-outline')
    var elfillText = document.querySelector('#text-fill')
    var elSelect = document.querySelector('.change-font')
    
    elOutline.value = currLine.outlineColor;
    elfillText.value = currLine.fillColor;
    elSelect.value = currLine.fontType;
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

function drawText(text, x, y, fill, outLine, font, fontSize, textAlign) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = outLine;
    gCtx.fillStyle = fill;
    gCtx.font = fontSize + " " + font
    gCtx.textAlign = textAlign;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

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


function toggelEditor() {
    document.body.classList.toggle('build-open')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
// to do handle this
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = function (event) {
        debugger
        var img = new Image();
        img.onload = onImageReady.bind(null)
        img.src = event.target.result;
        setGMemeImage(event.target.result)
    }
    reader.readAsDataURL(ev.target.files[0]);
}

