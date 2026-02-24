const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the extra } in startLearning
content = content.replace(/(if \(shouldStartRead\) \{[\s\S]*?isReadUnlocked = true;[\s\S]*?setPhase\('read'\);\s+\})\s+\}/g, '$1');

// 2. Comprehensive split word replacement for keywords AND common identifiers/DOM API
const fixes = {
    'docume nt': 'document',
    'getEleme ntById': 'getElementById',
    'addEve ntListener': 'addEventListener',
    'querySe lector': 'querySelector',
    'classList.re move': 'classList.remove',
    'classList.ad d': 'classList.add',
    'setAttribute': 'setAttribute',
    'textContent': 'textContent',
    'innerText': 'innerText',
    'innerHTML': 'innerHTML',
    'setTim eout': 'setTimeout',
    'c onst': 'const',
    'co nst': 'const',
    'con st': 'const',
    'f unction': 'function',
    'fu nction': 'function',
    'r eturn': 'return',
    're turn': 'return',
    'i f': 'if',
    'e lse': 'else',
    'l et': 'let',
    'v ar': 'var',
    'creat eIcons': 'createIcons',
    'isH istoryMode': 'isHistoryMode',
    'booksD ata': 'booksData',
    'mockH istory': 'mockHistory',
    'mockS cenes': 'mockScenes',
    'currentM odalBookId': 'currentModalBookId',
    'renderR eadPhase': 'renderReadPhase',
    'renderB ooks': 'renderBooks',
    'renderH ero': 'renderHero',
    'playbackR ate': 'playbackRate',
    'playS entenceAudio': 'playSentenceAudio',
    'playF ullSceneAudio': 'playFullSceneAudio',
    'stopA udio': 'stopAudio'
};

Object.keys(fixes).forEach(key => {
    const regex = new RegExp(key.replace(/ /g, '\\s+'), 'g');
    content = content.replace(regex, fixes[key]);
});

// Final check on keywords specifically at start of lines or after whitespace
content = content.replace(/\bc\s+onst\b/g, 'const');
content = content.replace(/\br\s+eturn\b/g, 'return');
content = content.replace(/\bf\s+unction\b/g, 'function');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Advanced unified fix applied.');
