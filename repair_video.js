const fs = require('fs');
const path = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix video tag attributes and initial src
// Old: <video id="studyVideo" class="w-full h-full object-contain pointer-events-auto"
//                    onplay="document.getElementById('nextPhaseContainer').classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');"
//                    onended="onVideoEnded()" src="public/video/Intro.mp4"></video>
const videoTagOld = /<video id="studyVideo" class="w-full h-full object-contain pointer-events-auto"\s+onplay="[^"]+"\s+onended="onVideoEnded\(\)" src="public\/video\/Intro\.mp4"><\/video>/;

const videoTagNew = `<video id="studyVideo" class="w-full h-full object-contain pointer-events-auto" 
                    onplay="document.getElementById('nextPhaseContainer').classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');"
                    onended="onVideoEnded()" 
                    muted autoplay playsinline
                    src="./public/Video/the_silent_stick_watch.mp4"></video>`;

if (content.match(videoTagOld)) {
    content = content.replace(videoTagOld, videoTagNew);
    console.log('Fixed video tag attributes and initial src in prototype.html');
} else {
    // Fallback if the regex is too strict due to whitespace
    content = content.replace(/id="studyVideo"[^>]*src="public\/video\/Intro\.mp4"/, 'id="studyVideo" class="w-full h-full object-contain pointer-events-auto" muted autoplay playsinline src="./public/Video/the_silent_stick_watch.mp4"');
    console.log('Fixed video tag using fallback search');
}

// 2. Fix fallback URL and add play() in startLearning
// Old: video.src = book.videoUrl || "./public/Video/The_silent_stick_watch.mp4";
//      video.load();
const startLearningOld = /video\.src = book\.videoUrl \|\| "\.\/public\/Video\/The_silent_stick_watch\.mp4";\s+video\.load\(\);/;
const startLearningNew = `video.src = book.videoUrl || "./public/Video/the_silent_stick_watch.mp4";
            video.load();
            video.play().catch(err => console.log("Auto-play blocked:", err));`;

if (content.match(startLearningOld)) {
    content = content.replace(startLearningOld, startLearningNew);
    console.log('Fixed startLearning video source and play call');
} else {
    // Try a more generic replacement
    content = content.replace(/video\.src = book\.videoUrl \|\| "\.\/public\/Video\/The_silent_stick_watch\.mp4";/, 'video.src = book.videoUrl || "./public/Video/the_silent_stick_watch.mp4";');
    content = content.replace(/video\.load\(\);/g, (match, offset) => {
        // Only replace video.load() inside startLearning block roughly
        if (offset > content.indexOf('function startLearning()') && offset < content.indexOf('function setPhase(phase)')) {
            return 'video.load();\n            video.play().catch(err => console.log("Auto-play blocked:", err));';
        }
        return match;
    });
    console.log('Fixed startLearning fallback using generic replacement');
}

fs.writeFileSync(path, content);
console.log('Successfully applied video fixes to prototype.html');
