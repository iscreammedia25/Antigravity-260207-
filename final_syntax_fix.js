const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix the extra } in startLearning
// Find the block: if (shouldStartRead) { ... isReadUnlocked = true; ... setPhase('read'); } }
// and change to if (shouldStartRead) { ... isReadUnlocked = true; ... setPhase('read'); }
content = content.replace(/(if \(shouldStartRead\) \{[\s\S]*?isReadUnlocked = true;[\s\S]*?setPhase\('read'\);\s+\})\s+\}/, '$1');

// 2. Fix the co nst typo again just in case there are more
content = content.replace(/\bc\s+onst\b/g, 'const');
content = content.replace(/\bf\s+unction\b/g, 'function');
content = content.replace(/\br\s+eturn\b/g, 'return');
content = content.replace(/\bl\s+et\b/g, 'let');
content = content.replace(/\bi\s+f\b/g, 'if');
content = content.replace(/\be\s+lse\b/g, 'else');
content = content.replace(/\bp\s+has\s+eContainer\b/g, 'phaseContainer');
content = content.replace(/\bb\s+ooksD\s+ata\b/g, 'booksData');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Final syntax fix applied.');
