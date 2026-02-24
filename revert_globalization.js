const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Revert globalization: window.Name = function( -> function Name(
// We want to keep window. assignments for window.onclick etc if any, 
// but for our main functions, standard declaration is better for local scope.
const functionsToRevert = [
    'renderReadPhase', 'startLearning', 'setPhase', 'showGnb', 'hideGnb',
    'toggleSettings', 'setNarration', 'setPageTurn', 'setNarrationSpeed', 'setTextSize',
    'toggleScenePicker', 'renderSceneThumbnails', 'playFullSceneAudio', 'playSentenceAudio',
    'stopAudio', 'prevScene', 'nextScene', 'jumpToScene', 'goToReadStep', 'selectReadingMode',
    'exitReadPhase', 'updateSettingsUI', 'renderHero', 'renderBooks', 'handleMainClick', 'toggleGnb', 'startGnbTimer'
];

functionsToRevert.forEach(fn => {
    const regex = new RegExp(`window\\.${fn}\\s*=\\s*function\\s*\\(`, 'g');
    content = content.replace(regex, `function ${fn}(`);
});

// 2. Fix inner calls: ensure they don't use window. prefix indoors if not needed
// But actually, Name() will work even if it's window.Name. 
// The problem is Name() failing if it's ONLY window.Name and not in local scope.

// 3. Ensure startLearning shows the read phase container if jumping directly
content = content.replace(/currentPhase = 'read';\s+currentSceneIndex = 0;\s+renderReadPhase\(\);/,
    "currentPhase = 'read';\n                    currentSceneIndex = 0;\n                    setPhase('read');");

// 4. Fix handleMainClick to be standard function
content = content.replace(/window\.handleMainClick = function \(\) \{[\s\S]*?\}/, `function handleMainClick() {
    if (currentPhase === 'watch') {
        toggleGnb();
    }
}`);

// 5. Ensure getTextPositionClass is correctly defined once
// (Keeping it as is since it was already function getTextPositionClass)

fs.writeFileSync(filePath, content, 'utf8');
console.log('Revert and Visibility Fix complete.');
