const fs = require('fs');
const filePath = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove muted attribute from video tag
content = content.replace(/muted autoplay playsinline/g, 'autoplay playsinline');

// 2. Fix onVideoEnded button HTML
// Fixing "< button" and "</button >"
content = content.replace(/< button onclick/g, '<button onclick');
content = content.replace(/<\/button >/g, '</button>');

// Also check for any other weird spaces in tags within onVideoEnded or elsewhere
content = content.replace(/< div class/g, '<div class');
content = content.replace(/<\/div >/g, '</div>');
content = content.replace(/< !--/g, '<!--');
content = content.replace(/-- >/g, '-->');

fs.writeFileSync(filePath, content);
console.log('Fixed video muted attribute and tag syntax in prototype.html');
