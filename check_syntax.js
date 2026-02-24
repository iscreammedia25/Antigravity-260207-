const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.join(__dirname, 'prototype.html');
const content = fs.readFileSync(filePath, 'utf8');

const scriptStart = content.indexOf('<script>') + '<script>'.length;
const scriptEnd = content.lastIndexOf('</script>');
const script = content.substring(scriptStart, scriptEnd);

try {
    new vm.Script(script);
    console.log('Syntax check passed.');
} catch (e) {
    console.error('Syntax error found:');
    console.error(e.message);
    // Try to find the line number
    const lines = script.split('\n');
    const match = e.stack.match(/evalmachine\.<anonymous>:(\d+)/);
    if (match) {
        const lineNum = parseInt(match[1]);
        console.error(`Error around line ${lineNum} of the script block.`);
        console.error(`Script line: ${lines[lineNum - 1]}`);
    }
}
