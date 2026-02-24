const fs = require('fs');
const html = fs.readFileSync('prototype.html', 'utf8');

// Extract script content
const scriptStart = html.indexOf('<script>') + '<script>'.length;
const scriptEnd = html.lastIndexOf('</script>');
const script = html.slice(scriptStart, scriptEnd);

const lines = script.split('\n');
console.log('Total script lines:', lines.length);

// Count backticks per line to find unclosed template literals
let depth = 0;
let problems = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let inEscape = false;
    for (let j = 0; j < line.length; j++) {
        if (inEscape) { inEscape = false; continue; }
        if (line[j] === '\\') { inEscape = true; continue; }
        if (line[j] === '`') {
            depth += (depth % 2 === 0) ? 1 : -1;
            // simplified: just toggle
        }
    }
    if (depth > 3) {
        problems.push({ line: i + 1, depth, content: line.substring(0, 100) });
    }
}

// Try Node.js syntax check on script
try {
    new Function(script);
    console.log('OK: No syntax error');
} catch (e) {
    console.log('Syntax Error:', e.message);
    // Find approximate location
    const match = e.stack.match(/Function \(anonymous\):(\d+)/);
    if (match) {
        const errLine = parseInt(match[1]);
        console.log('\nAround error line', errLine, 'in script:');
        for (let i = Math.max(0, errLine - 5); i < Math.min(lines.length, errLine + 3); i++) {
            console.log(`  ${i + 1}: ${lines[i].substring(0, 120)}`);
        }
    }
}
