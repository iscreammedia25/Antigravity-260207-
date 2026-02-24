const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove duplicate getTextPositionClass (flexible match)
const getTextPosRegex = /function\s+getTextPositionClass\s*\(index\)\s*\{[\s\S]*?default:\s*return\s*"top-8\s+left-8\s+md:top-16\s+md:left-16\s+text-left\s+items-start";\s*\}\s*\}/g;
let matches = [...content.matchAll(getTextPosRegex)];
if (matches.length > 1) {
    // Remove all but the first
    for (let i = 1; i < matches.length; i++) {
        content = content.replace(matches[i][0], '');
        console.log('Removed duplicate getTextPositionClass');
    }
}

// 2. Remove duplicate exitReadPhase (flexible match)
const exitReadRegex = /window\.exitReadPhase\s*=\s*function\s*\(\)\s*\{[\s\S]*?location\.reload\(\);\s*\};/g;
matches = [...content.matchAll(exitReadRegex)];
if (matches.length > 1) {
    for (let i = 1; i < matches.length; i++) {
        content = content.replace(matches[i][0], '');
        console.log('Removed duplicate exitReadPhase');
    }
}

// 3. Remove duplicate toggleScenePicker (flexible match)
const togglePickerRegex = /window\.toggleScenePicker\s*=\s*function\s*\(\)\s*\{[\s\S]*?lucide\.createIcons\(\);\s*\};/g;
matches = [...content.matchAll(togglePickerRegex)];
if (matches.length > 1) {
    for (let i = 1; i < matches.length; i++) {
        content = content.replace(matches[i][0], '');
        console.log('Removed duplicate toggleScenePicker');
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleanup complete.');
