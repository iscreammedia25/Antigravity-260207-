const fs = require('fs');
let content = fs.readFileSync('c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html', 'utf8');

// The old exitReadPhase definition (that was still from the old nested block)
const oldCode = `                        window.exitReadPhase = function () { // lint: New function to exit the read phase and return to home.
                            stopAudio();
                            currentPhase = 'home';
                            location.reload(); // Simple way to restore home state in prototype
                        };

                        function toggleBookmarkModal() {`;

// New: properly close the viewing block and renderReadPhase function
const newCode = `        window.exitReadPhase = function () {
            stopAudio();
            currentPhase = 'home';
            location.reload();
        };

            } // end else if (currentReadStep === 'viewing')
        } // end renderReadPhase

        function toggleBookmarkModal() {`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync('c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html', content);
    console.log('✅ Fixed exitReadPhase and closed viewing/renderReadPhase blocks');
} else {
    console.log('❌ Target not found. Showing neighborhood:');
    const idx = content.indexOf('window.exitReadPhase');
    if (idx !== -1) {
        console.log(JSON.stringify(content.slice(idx - 50, idx + 300)));
    }
}
