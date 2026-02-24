const fs = require('fs');
const html = fs.readFileSync('prototype.html', 'utf8');

// Get the main script block - everything between <script> tags, using last occurrence
const scriptStart = html.indexOf('<script>') + '<script>'.length;
const scriptEnd = html.lastIndexOf('</script>');
const script = html.slice(scriptStart, scriptEnd);

const lines = script.split('\n');
console.log('Total script lines:', lines.length);

// Binary search for the error line
function hasError(code) {
    try { new Function(code); return false; }
    catch (e) { return true; }
}

// Find first line that causes the error by building up gradually
// Start from end - find where error disappears
let lo = 0, hi = lines.length;
while (lo < hi - 50) {
    const mid = Math.floor((lo + hi) / 2);
    // Check first 'mid' lines
    const partial = lines.slice(0, mid).join('\n');
    if (hasError(partial)) {
        hi = mid;
    } else {
        lo = mid;
    }
}

console.log(`\nError is likely around script line: ${lo} to ${hi}`);
console.log('\nSuspect lines:');
for (let i = Math.max(0, lo - 3); i < Math.min(lines.length, hi + 5); i++) {
    console.log(`  ${i + 1}: ${lines[i].substring(0, 150)}`);
}
