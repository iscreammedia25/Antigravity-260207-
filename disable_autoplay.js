const fs = require('fs');
const filePath = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove autoplay attribute from video tag
// Old: <video id="studyVideo" ... autoplay playsinline ...>
content = content.replace(/autoplay playsinline/g, 'playsinline');

// 2. Remove explicit video.play() in startLearning
// Old: video.play().catch(err => console.log("Auto-play blocked:", err));
content = content.replace(/video\.play\(\)\.catch\(err => console\.log\("Auto-play blocked:", err\)\);/g, '// video.play() removed as per user request (manual play required)');

fs.writeFileSync(filePath, content);
console.log('Disabled autoplay in prototype.html');
