const fs = require('fs');
const html = fs.readFileSync('prototype.html', 'utf8');

// Extract main script (between line 453 and 1761 approximately)
const scriptStart = html.indexOf('<script>\n        let selectedScenes');
const scriptEnd = html.indexOf('\n    </script>', scriptStart);
const script = html.slice(scriptStart + '<script>'.length, scriptEnd);

const lines = script.split('\n');
console.log('Script lines extracted:', lines.length);

// Count backtick depth through the file
let depth = 0;
let maxDepth = 0;
let lastDepthChangeLine = 0;
let suspectLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let prevDepth = depth;

    for (let j = 0; j < line.length; j++) {
        if (j > 0 && line[j - 1] === '\\') continue; // skip escaped chars
        if (line[j] === '`') {
            depth += (depth === 0) ? 1 : -1;
            lastDepthChangeLine = i + 1;
        }
    }

    if (depth > 1) {
        suspectLines.push({ lineNum: i + 1, depth, preview: line.substring(0, 120) });
    }
    if (depth > maxDepth) maxDepth = depth;
}

console.log('Final backtick depth (should be 0):', depth);
console.log('Max depth reached:', maxDepth);
console.log('Last depth change at script line:', lastDepthChangeLine);

if (suspectLines.length > 0) {
    console.log('\nLines with depth > 1:');
    suspectLines.slice(-20).forEach(l => console.log(`  ${l.lineNum}: [depth=${l.depth}] ${l.preview}`));
}

// Try to eval
try {
    new Function(script);
    console.log('\n✅ Script OK - no syntax error!');
} catch (e) {
    console.log('\n❌ Error:', e.message);
}
