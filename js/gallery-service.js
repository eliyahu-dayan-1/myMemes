'use strict';

const KEY_PICTURE_KEYWORDS = 'pictureKeywords'


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

var gKeywords = createKeyWords()


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

function getKeyWords() {
    return gKeywords;
}

function getPicturnByKeyWord(txt) {
    if (txt === 'all') return gImgs;
    return gImgs.filter(img => {
        return img.keywords.some(word => word.includes(txt))
    })
}

function getWordsByKeyword(txt) {
    if (txt === 'all') return gKeywords;

    var filterKeyWords = {}
    for (const word in gKeywords) {
        if (word.includes(txt)) {
            filterKeyWords[word] = gKeywords[word];
        }
    }
    return filterKeyWords;
}

function getImgs() {
    return gImgs;
}

function setPopularWord(word) {
    if (gKeywords[word]) gKeywords[word] += 0.05;
    saveToStorage(KEY_PICTURE_KEYWORDS, gKeywords)
}