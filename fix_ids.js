const fs = require('fs');
const filePath = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(filePath, 'utf8');

// Fix phase ID template literal
content = content.replace(/document\.getElementById\(`phase - \$\{ phase \} `\)/g, 'document.getElementById(`phase-${phase}`)');

// Fix tab ID template literal
content = content.replace(/document\.getElementById\(`tab - \$\{ t \} `\)/g, 'document.getElementById(`tab-${t}`)');

// [CHECK] Are there more? Search for common patterns
// Check for "scene - card - " etc
content = content.replace(/document\.getElementById\(`scene - card - \$\{ idx \} `\)/g, 'document.getElementById(`scene-card-${idx}`)');
content = content.replace(/document\.getElementById\(`scene - check - \$\{ idx \} `\)/g, 'document.getElementById(`scene-check-${idx}`)');
content = content.replace(/document\.getElementById\(`scene - check - \$\{ i \} `\)/g, 'document.getElementById(`scene-check-${i}`)');
content = content.replace(/document\.getElementById\(`scene - card - \$\{ i \} `\)/g, 'document.getElementById(`scene-card-${i}`)');

// [CHECK] renderHero
content = content.replace(/document\.getElementById\(`phase - \$\{ t \} `\)/g, 'document.getElementById(`phase-${t}`)'); // just in case

// [NEW] Fix video tag initial src one more time to be absolutely sure
// In some previous view, I saw src="public/video/Intro.mp4" (step 1003)
// I already ran a repair script but let's be thorough here as well.
content = content.replace(/src="public\/video\/Intro\.mp4"/g, 'src="./public/Video/the_silent_stick_watch.mp4"');

fs.writeFileSync(filePath, content);
console.log('Fixed ID spaces and video paths in prototype.html');
