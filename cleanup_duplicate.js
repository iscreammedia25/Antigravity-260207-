const fs = require('fs');
const filePath = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(filePath, 'utf8');

// The duplicate block starts right after lucide.createIcons() at end of new viewing block
// and runs until the old nextScene/prevScene stubs.
// We need to remove lines from the stale duplicate viewing section.

// Find and remove the duplicate old viewing code that starts with:
//     });
//                 }
//
//                 const script = scene.fetchedScript || scene.script;
// ... and ends at the closing of the old renderReadPhase function

const duplicateStart = `            }\n                    });\n                }\n\n                const script = scene.fetchedScript || scene.script;`;
const duplicateEnd = `            lucide.createIcons();\n        }`;

const startIdx = content.indexOf(duplicateStart);

if (startIdx !== -1) {
    const endIdx = content.indexOf(duplicateEnd, startIdx);
    if (endIdx !== -1) {
        const removeUntil = endIdx + duplicateEnd.length;
        // Replace duplicate+old closing with just the closing brace for renderReadPhase
        content = content.slice(0, startIdx) + '\n        }\n' + content.slice(removeUntil);
        console.log('✅ Duplicate viewing block removed successfully');
    } else {
        console.log('❌ Could not find end of duplicate block');
    }
} else {
    console.log('❌ Could not find start of duplicate block');
}

fs.writeFileSync(filePath, content);
console.log('Done. Lines in file:', content.split('\n').length);
