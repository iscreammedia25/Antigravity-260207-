const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Globalization
const functionsToGlobablize = [
    'handleMainClick', 'toggleGnb', 'startGnbTimer', 'setPhase', 'showGnb', 'hideGnb',
    'cyclePlaybackRate', 'toggleBookmarkModal', 'renderBooks', 'renderHero'
];

functionsToGlobablize.forEach(fn => {
    const regex = new RegExp(`function\\s+${fn}\\s*\\(`, 'g');
    content = content.replace(regex, `window.${fn} = function(`);
});

// 2. Fix potential unresponsiveness in viewing phase
// Increase z-index of interaction layers and ensure pointer-events are correct
content = content.replace(/z-30/g, 'z-40'); // Move text overlay up
content = content.replace(/z-40/g, 'z-50'); // Move interaction layer up
content = content.replace(/z-50/g, 'z-60'); // Move navigation buttons up
content = content.replace(/z-\[60\]/g, 'z-\[70\]'); // Move scene picker up
content = content.replace(/z-\[130\]/g, 'z-\[140\]'); // Move settings up

// 3. Fix handleMainClick to not interfere as much
content = content.replace(/window\.handleMainClick = function\(\) \{[\s\S]*?toggleGnb\(\);[\s\S]*?\}/, `window.handleMainClick = function() {
    if (currentPhase === 'watch') {
        toggleGnb();
    }
}`);

// 4. Ensure window.nextScene and window.prevScene call window.stopAudio
content = content.replace(/window\.prevScene = function \(\) \{/, 'window.prevScene = function () {\n        window.stopAudio();');
content = content.replace(/window\.nextScene = function \(\) \{/, 'window.nextScene = function () {\n        window.stopAudio();');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final Polish complete.');
