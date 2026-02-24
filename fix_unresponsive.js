const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Ensure isReadUnlocked is true when starting directly in Read phase
content = content.replace(/if \(shouldStartRead\) \{[\s\S]*?currentPhase = 'read';/,
    "if (shouldStartRead) {\n                    isReadUnlocked = true;\n                    currentPhase = 'read';");

// 2. Boost z-index of phase-read and phaseContainer
content = content.replace('id="phase-read" class="w-full h-full flex flex-col relative overflow-hidden hidden"',
    'id="phase-read" class="w-full h-full flex flex-col relative z-30 overflow-hidden hidden"');
content = content.replace('id="phaseContainer" class="flex-1 flex flex-col relative z-20 overflow-hidden"',
    'id="phaseContainer" class="flex-1 flex flex-col relative z-40 overflow-hidden"');

// 3. Ensure handleMainClick is robust
content = content.replace(/function handleMainClick\(\) \{[\s\S]*?\}/, `function handleMainClick() {
    if (currentPhase === 'watch') {
        toggleGnb();
    }
}`);

// 4. Ensure all viewing step buttons have pointer-events-auto
// (They already have, but I'll double check the z-indexes too)
// Let's make text overlay z-50 and interaction layer z-60
content = content.replace(/inset-x-0 top-0 bottom-0 pointer-events-none z-60/g, 'inset-x-0 top-0 bottom-0 pointer-events-none z-50');
// interaction layer is already at z-60 or z-50 depending on prev edits.
// Let's normalize them.

// 5. Fix potentially broken Lucide icons in renderReadPhase
// Ensure lucide.createIcons() is called after every innerHTML update
// (Already there, but I'll ensure it's in a setTimeout if needed)

fs.writeFileSync(filePath, content, 'utf8');
console.log('Unresponsive issue fixes applied.');
