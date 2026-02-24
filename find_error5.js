const fs = require('fs');
const html = fs.readFileSync('prototype.html', 'utf8');

const scriptStart = html.indexOf('\n        let selectedScenes');
const scriptEnd = html.lastIndexOf('</script>');
const script = html.slice(scriptStart, scriptEnd);
const lines = script.split('\n');

// Track real brace depth outside of string/template literals
// We just need to find where we go from non-error to error
// Strategy: check every 50 lines, find the block where error appears

function hasBraceIssue(endLine) {
    // Count raw opens/closes in strings is inaccurate, so just check
    // if the depth at the end of line `endLine` is > 0 when it shouldn't be.
    // We'll use raw counts as a heuristic.
    const chunk = lines.slice(0, endLine).join('\n');
    const opens = (chunk.match(/\{/g) || []).length;
    const closes = (chunk.match(/\}/g) || []).length;
    return opens - closes;
}

// Find the range where extra braces start
console.log('Scanning for brace imbalance...\n');
let prevDiff = 0;
for (let i = 100; i <= lines.length; i += 100) {
    const diff = hasBraceIssue(i);
    if (diff !== prevDiff) {
        console.log(`Lines ~${i - 100} to ~${i}: brace diff changed from ${prevDiff} to ${diff}`);
        // Print the area
        for (let j = Math.max(0, i - 110); j < Math.min(lines.length, i + 5); j++) {
            const d = hasBraceIssue(j);
            if (Math.abs(d - prevDiff) >= 1 || j >= i - 5) {
                console.log(`  L${j + 1} [diff=${d}]: ${lines[j].substring(0, 100)}`);
            }
        }
    }
    prevDiff = diff;
}
console.log('\nFinal brace diff:', hasBraceIssue(lines.length));
