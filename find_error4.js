const fs = require('fs');
const html = fs.readFileSync('prototype.html', 'utf8');

// Extract main script block
const scriptStart = html.indexOf('\n        let selectedScenes');
const scriptEnd = html.lastIndexOf('</script>');
const script = html.slice(scriptStart, scriptEnd);
const lines = script.split('\n');
console.log('Script lines:', lines.length);

// Count braces, ignoring strings and template literals
let braceDepth = 0;
let parenDepth = 0;
let bracketDepth = 0;
let inString1 = false; // single quote
let inString2 = false; // double quote
let inTemplate = 0; // backtick nesting

let prevBrace = 0;
let issues = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
        const c = line[j];
        const prev = j > 0 ? line[j - 1] : '';
        if (prev === '\\') continue; // skip escaped

        if (!inString1 && !inString2 && inTemplate === 0) {
            if (c === "'") inString1 = true;
            else if (c === '"') inString2 = true;
            else if (c === '`') inTemplate = 1;
            else if (c === '{') braceDepth++;
            else if (c === '}') braceDepth--;
            else if (c === '(') parenDepth++;
            else if (c === ')') parenDepth--;
        } else if (inString1 && c === "'" && prev !== '\\') inString1 = false;
        else if (inString2 && c === '"' && prev !== '\\') inString2 = false;
        else if (inTemplate > 0) {
            if (c === '`') inTemplate--;
            else if (c === '$' && line[j + 1] === '{') { inTemplate++; j++; braceDepth++; }
        }
    }
    if (braceDepth < 0) {
        issues.push(`Line ${i + 1}: braceDepth went negative (${braceDepth}): ${line.substring(0, 80)}`);
    }
}

console.log('\nFinal counts:');
console.log('  Brace depth:', braceDepth, '(should be 0)');
console.log('  Paren depth:', parenDepth, '(should be 0)');
console.log('  Template depth:', inTemplate, '(should be 0)');

if (issues.length) {
    console.log('\nIssues found:');
    issues.forEach(i => console.log(' ', i));
}

// Also look for unmatched special tokens
const openCount = (script.match(/\{/g) || []).length;
const closeCount = (script.match(/\}/g) || []).length;
console.log('\nRaw brace counts (includes strings):');
console.log('  Open {:', openCount, ' Close }:', closeCount, ' Diff:', openCount - closeCount);
