const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

const identifiers = [
    'document', 'window', 'function', 'const', 'return', 'console', 'getElementById',
    'addEventListener', 'querySelector', 'classList', 'setAttribute', 'setTimeout',
    'innerHTML', 'innerText', 'textContent', 'isHistoryMode', 'booksData', 'mockHistory',
    'mockScenes', 'currentModalBookId', 'renderReadPhase', 'renderBooks', 'renderHero',
    'isReadUnlocked', 'currentPhase', 'currentSceneIndex', 'setPhase', 'createIcons',
    'phaseContainer', 'toggleSettings', 'playFullSceneAudio', 'playSentenceAudio',
    'stopAudio', 'exitLearningMode', 'isSettingsOpen', 'isNarrationOn', 'isPageTurnOn'
];

identifiers.forEach(id => {
    // Generate many possible split versions (even with multiple spaces)
    const chars = id.split('');
    let pattern = chars[0];
    for (let i = 1; i < chars.length; i++) {
        pattern += '\\s*';
        pattern += chars[i];
    }
    const regex = new RegExp('\\b' + pattern + '\\b', 'g');
    content = content.replace(regex, id);
});

// Also fix the else block specifically again
content = content.replace(/} els\s+overlay/g, '} else {\n                overlay');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Definitive fix applied.');
