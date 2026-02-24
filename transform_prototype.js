const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Identify the script block
const scriptStartIdx = content.indexOf('<script>') + '<script>'.length;
const scriptEndIdx = content.lastIndexOf('</script>');

if (scriptStartIdx === -1 || scriptEndIdx === -1) {
    console.error('Could not find script block');
    process.exit(1);
}

let script = content.substring(scriptStartIdx, scriptEndIdx);

// 2. Perform replacements for robustness
// Ensure all functions are global
const functionsToGlobablize = [
    'renderReadPhase', 'startLearning', 'setPhase', 'showGnb', 'hideGnb',
    'toggleSettings', 'setNarration', 'setPageTurn', 'setNarrationSpeed', 'setTextSize',
    'toggleScenePicker', 'renderSceneThumbnails', 'playFullSceneAudio', 'playSentenceAudio',
    'stopAudio', 'prevScene', 'nextScene', 'jumpToScene', 'goToReadStep', 'selectReadingMode',
    'exitReadPhase', 'updateSettingsUI', 'renderHero', 'renderBooks'
];

functionsToGlobablize.forEach(fn => {
    // Replace "function name(" with "window.name = function(" for those not already window.
    const regex = new RegExp(`function\\s+${fn}\\s*\\(`, 'g');
    script = script.replace(regex, `window.${fn} = function(`);
});

// 3. Remove known duplicates (now they are all window. prefixed)
const duplicatesToRemove = [
    'window.getTextPositionClass = function(', // It might have been turned into window.
    'window.exitReadPhase = function(',
    'window.toggleScenePicker = function('
];

duplicatesToRemove.forEach(prefix => {
    let firstIdx = script.indexOf(prefix);
    if (firstIdx !== -1) {
        let secondIdx = script.indexOf(prefix, firstIdx + 1);
        while (secondIdx !== -1) {
            // Find the end of the function block (naive brace matching or just up to the next function start)
            // A better way: find the next "window." or ending script tag
            let blockEnd = script.indexOf('window.', secondIdx + 1);
            if (blockEnd === -1) blockEnd = script.length;

            console.log(`Removing duplicate of ${prefix}`);
            script = script.substring(0, secondIdx) + script.substring(blockEnd);
            secondIdx = script.indexOf(prefix, secondIdx + 1);
        }
    }
});

// Special case for getTextPositionClass which might still be "function getTextPositionClass"
const getTextPosRegex = /function\s+getTextPositionClass\s*\(index\)\s*\{[\s\S]*?default:\s*return\s*"top-8\s+left-8\s+md:top-16\s+md:left-16\s+text-left\s+items-start";\s*\}\s*\}/g;
let matches = [...script.matchAll(getTextPosRegex)];
if (matches.length > 1) {
    for (let i = 1; i < matches.length; i++) {
        script = script.replace(matches[i][0], '');
        console.log('Removed duplicate getTextPositionClass');
    }
}

// 4. Reconstruct the file
const newContent = content.substring(0, scriptStartIdx) + script + content.substring(scriptEndIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Final consolidation complete.');
