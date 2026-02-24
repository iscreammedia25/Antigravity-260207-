const fs = require('fs');
const filePath = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(filePath, 'utf8');
let changed = false;

// 1. Remove the duplicate renderBooks block (the new one I added, not the original at line 646)
// The duplicate starts with "        function renderBooks() {\n            const container = document.getElementById('bookContainer');\n            if (!container) return;"
// while the original uses "container.innerHTML = booksData.map(book => `" directly (no if-return guard)
const dupStart = `        function scrollContainer(amount) {\n            const container = document.getElementById('bookContainer');\n            if (container) container.scrollLeft += amount;\n        }\n\n        function renderBooks() {\n            const container = document.getElementById('bookContainer');\n            if (!container) return;`;

const dupEnd = `            lucide.createIcons();\n        }\n\n        function renderReadPhase() {`;

const startIdx = content.indexOf(dupStart);
const endIdx = content.indexOf(dupEnd);

if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
    // Remove everything from dupStart to end of the duplicate renderBooks, keep renderReadPhase
    content = content.slice(0, startIdx) + '\n        function renderReadPhase() {' + content.slice(endIdx + dupEnd.length);
    changed = true;
    console.log('✅ Removed duplicate renderBooks and scrollContainer');
} else {
    console.log('⚠️ Could not find duplicate block precisely. Trying alternate approach...');

    // Alternate: find and remove just the duplicate renderBooks between scrollContainer and renderReadPhase
    const altPattern = /function scrollContainer[\s\S]*?lucide\.createIcons\(\);\s*\}\s*\n\s*function renderReadPhase/;
    if (altPattern.test(content)) {
        content = content.replace(altPattern, 'function renderReadPhase');
        changed = true;
        console.log('✅ Removed duplicate via regex');
    }
}

// 2. Fix '#SC01' -> 'SC01' for background lookup
const old = "s.scene_no === '#SC01'";
const fix = "s.scene_no === 'SC01'";
if (content.includes(old)) {
    content = content.split(old).join(fix);
    changed = true;
    console.log('✅ Fixed #SC01 -> SC01');
} else {
    console.log('ℹ️ SC01 already correct or not found');
}

if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Done. Total lines:', content.split('\n').length);
} else {
    console.log('No changes made.');
}
