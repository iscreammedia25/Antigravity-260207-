const fs = require('fs');
const vm = require('vm');
const content = fs.readFileSync('prototype.html', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
    const scriptText = scriptMatch[1];
    try {
        new vm.Script(scriptText);
        console.log("No syntax errors found.");
    } catch (e) {
        console.error("Syntax Error:", e.message);
        console.error(e.stack);
    }
}
