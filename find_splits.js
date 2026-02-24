const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prototype.html');
const content = fs.readFileSync(filePath, 'utf8');

const scriptStart = content.indexOf('<script>') + '<script>'.length;
const scriptEnd = content.lastIndexOf('</script>');
const script = content.substring(scriptStart, scriptEnd);

const regex = /([a-zA-Z]{2,})\s+([a-zA-Z]{2,})/g;
let match;
const suspicious = [];

while ((match = regex.exec(script)) !== null) {
    const word = match[0];
    const first = match[1];
    const second = match[2];

    // Ignore common valid combinations
    const valid = ['const ', 'let ', 'var ', 'function ', 'if ', 'else ', 'return ', 'new ', 'of ', 'in ', 'await ', 'async ', 'case ', 'throw ', 'import ', 'export '];
    if (valid.some(v => word.startsWith(v))) continue;

    // Ignore if first is a keyword and second is something else?
    // Actually let's just list everything and filter manually.
    suspicious.push({
        word: word,
        line: script.substring(0, match.index).split('\n').length
    });
}

console.log(JSON.stringify(suspicious, null, 2));
