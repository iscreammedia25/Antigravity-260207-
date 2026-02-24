const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the extra } in startLearning (just in case)
content = content.replace(/(if \(shouldStartRead\) \{[\s\S]*?isReadUnlocked = true;[\s\S]*?setPhase\('read'\);\s+\})\s+\}/g, '$1');

// 2. Comprehensive split word replacement
const fixes = {
    'c onst': 'const',
    'co nst': 'const',
    'f unction': 'function',
    'r eturn': 'return',
    'i f': 'if',
    'e lse': 'else',
    'l et': 'let',
    'phas eContainer': 'phaseContainer',
    'booksD ata': 'booksData',
    'creat eIcons': 'createIcons',
    'isRead Unlocked': 'isReadUnlocked',
    'curr entPhase': 'currentPhase',
    'currentP hase': 'currentPhase',
    'renderB ooks': 'renderBooks',
    'renderR eadPhase': 'renderReadPhase',
    'selec tedReadingMode': 'selectedReadingMode',
    'toggleS ettings': 'toggleSettings',
    'narra tionSpeed': 'narrationSpeed',
    'textS ize': 'textSize',
    'playF ullSceneAudio': 'playFullSceneAudio',
    'playS entenceAudio': 'playSentenceAudio',
    'nextS cene': 'nextScene',
    'prevS cene': 'prevScene',
    'jumpT oScene': 'jumpToScene',
    'goToR eadStep': 'goToReadStep',
    'selectR eadingMode': 'selectReadingMode'
};

Object.keys(fixes).forEach(key => {
    const regex = new RegExp(key.replace(/ /g, '\\s+'), 'g');
    content = content.replace(regex, fixes[key]);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final unified fix applied.');
