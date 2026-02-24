const fs = require('fs');
const html = fs.readFileSync('prototype.html', 'utf8');
const start = html.indexOf('<script>\n        let selectedScenes') + '<script>'.length;
const end = html.lastIndexOf('</script>');
const script = html.slice(start, end);
const lines = script.split('\n');

// Use proper JS parsing - add the code line by line and track where error first appears
// Use a smarter state machine that ignores strings

function isValid(code) {
    try { new Function(code + '\n}}}}}'); return true; }  // pad with closing braces so "incomplete" code might work
    catch (e) {
        // If the error is NOT "unexpected end of input", then there's a different issue
        if (e.message.includes('Unexpected end of input')) return false;
        return true; // a different error means it got further
    }
}

// Binary search for the line where it first becomes invalid
let lo = 0, hi = lines.length;
while (hi - lo > 10) {
    const mid = Math.floor((lo + hi) / 2);
    const chunk = lines.slice(0, mid).join('\n');
    if (!isValid(chunk)) {
        hi = mid;
    } else {
        lo = mid;
    }
}

console.log(`\nSuspect area: lines ${lo} to ${hi} (script-relative)\n`);
for (let i = Math.max(0, lo - 5); i < Math.min(lines.length, hi + 5); i++) {
    console.log(`  ${i + 1}: ${lines[i].substring(0, 120)}`);
}

// Also check the raw error with parenpadding trick
try {
    new Function(script);
    console.log('\nNo error!');
} catch (e) {
    console.log('\nError:', e.message);
    // use v8 stack trick
    const stack = e.stack || '';
    const m = stack.match(/<anonymous>:(\d+):(\d+)/);
    if (m) {
        const errLine = parseInt(m[1]) - 1; // subtract 1 for "function anonymous("
        console.log(`Error at script line ~${errLine}`);
        if (errLine > 0 && errLine <= lines.length) {
            for (let i = Math.max(0, errLine - 5); i < Math.min(lines.length, errLine + 5); i++) {
                console.log(`  ${i + 1}: ${lines[i].substring(0, 120)}`);
            }
        }
    }
}
