const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the extra } in startLearning
content = content.replace(/(if \(shouldStartRead\) \{[\s\S]*?isReadUnlocked = true;[\s\S]*?setPhase\('read'\);\s+\})\s+\}/g, '$1');

// 2. Aggressive regex for split words based on known keywords
const keywords = [
    'document', 'window', 'function', 'const', 'return', 'console', 'getElementById',
    'addEventListener', 'querySelector', 'classList', 'setAttribute', 'setTimeout',
    'innerHTML', 'innerText', 'textContent', 'isHistoryMode', 'booksData', 'mockHistory',
    'mockScenes', 'currentModalBookId', 'renderReadPhase', 'renderBooks', 'renderHero',
    'isReadUnlocked', 'currentPhase', 'currentSceneIndex', 'setPhase', 'createIcons'
];

keywords.forEach(kw => {
    // Generate many possible split versions
    for (let i = 1; i < kw.length; i++) {
        const split = kw.substring(0, i) + ' ' + kw.substring(i);
        const regex = new RegExp(split.replace(/ /g, '\\s+'), 'g');
        content = content.replace(regex, kw);
    }
});

// Also fix some common multi-word splittings
const additional = {
    'doc ument': 'document',
    'docu ment': 'document',
    'docum ent': 'document',
    'docume nt': 'document',
    'ele ment': 'element',
    'identi fier': 'identifier',
    'con sole': 'console',
    'func tion': 'function'
};

Object.keys(additional).forEach(key => {
    const regex = new RegExp(key.replace(/ /g, '\\s+'), 'g');
    content = content.replace(regex, additional[key]);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Ultimate fix applied.');
