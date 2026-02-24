const fs = require('fs');
let content = fs.readFileSync('c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html', 'utf8');

// Remove the incorrectly-placed comment lines and fix the indentation mess
const bad1 = `        window.exitReadPhase = function () {
            stopAudio();
            currentPhase = 'home';
            location.reload();
        };

            } // end else if (currentReadStep === 'viewing')
        } // end renderReadPhase

        function toggleBookmarkModal() {
                            const book = booksData.find(b => b.id === currentModalBookId);
                            if (book) {
                                book.isBookmarked = !book.isBookmarked;
                                updateBookmarkIcon(book.isBookmarked);
                                renderBooks();
                            }
                        }`;

const good1 = `        window.exitReadPhase = function () {
            stopAudio();
            currentPhase = 'home';
            location.reload();
        };

            } // end else if (currentReadStep === 'viewing')
        } // end renderReadPhase

        function toggleBookmarkModal() {
            const book = booksData.find(b => b.id === currentModalBookId);
            if (book) {
                book.isBookmarked = !book.isBookmarked;
                updateBookmarkIcon(book.isBookmarked);
                renderBooks();
            }
        }`;

if (content.includes(bad1)) {
    content = content.replace(bad1, good1);
    console.log('✅ Fixed toggleBookmarkModal indentation');
} else {
    console.log('❌ Pattern 1 not found. Searching for exitReadPhase...');
    const idx = content.indexOf('window.exitReadPhase');
    if (idx !== -1) {
        const excerpt = content.slice(idx, idx + 1000);
        console.log('Found at:', idx, '\nContext:\n', excerpt.substring(0, 500));
    }
}

// Also fix subsequent functions indentation - they were all at 24-space indent, should be 8
// Find all function definitions after the good1 block that have wrong indent
const wrongIndentFuncs = [
    '                        function updateBookmarkIcon(',
    '                        function addBookWithAnimation(',
    '                        function startLearning(',
    '                        function exitLearningMode(',
    '                        function resetLearningMode(',
    '                        function showGnb(',
    '                        function hideGnb(',
    '                        function toggleGnb(',
    '                        function startGnbTimer(',
    '                        function handleMainClick(',
    '                        function setPhase(',
    '                        function togglePlay(',
    '                        function skipVideo(',
    '                        function updateProgressBar(',
    '                        function getTextPositionClass(',
    '                        function fetchSceneScript(',
    '                        function playFullSceneAudio(',
    '                        function playSentenceAudio(',
    '                        function stopAudio(',
    '                        function toggleSettings(',
    '                        function setNarration(',
    '                        function setPageTurn(',
    '                        function setNarrationSpeed(',
    '                        function setTextSize(',
    '                        function selectReadingMode(',
    '                        function showReadCompletePraise(',
    '                        function showSpeakSelectionModal(',
    '                        function toggleSceneSelection(',
    '                        function toggleSelectAll(',
    '                        function updateSelectionUI(',
    '                        function confirmSpeakSelection(',
    '                        function goToReadStep(',
    '                        function prevScene(',
    '                        function nextScene(',
    '                        function changeScene(',
    '                        function toggleScenePicker(',
    '                        function jumpToScene(',
    '                        function onVideoEnded(',
];

let fixCount = 0;
for (const wrong of wrongIndentFuncs) {
    const correct = wrong.replace('                        function', '        function');
    while (content.includes(wrong)) {
        content = content.replace(wrong, correct);
        fixCount++;
    }
}
console.log(`Fixed ${fixCount} function indentations`);

fs.writeFileSync('c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html', content);
console.log('Done.');

// Verify
try {
    const html2 = fs.readFileSync('c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html', 'utf8');
    const s = html2.indexOf('<script>\n        let selectedScenes') + '<script>'.length;
    const e = html2.lastIndexOf('</script>');
    const script = html2.slice(s, e);
    new Function(script);
    console.log('✅ Script OK - no syntax errors!');
} catch (err) {
    console.log('❌ Still has error:', err.message);
}
