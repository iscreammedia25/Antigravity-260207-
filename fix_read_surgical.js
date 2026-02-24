const fs = require('fs');
const filePath = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Surgical replacement of the Read phase content
const phaseReadStart = '<div id="phase-read" class="w-full h-full flex flex-col relative overflow-hidden hidden">';
const phaseReadEnd = '            </div>\n        </main>'; // This is the end tag for phase-read

// Find the index of phase-read start
const startIdx = content.indexOf(phaseReadStart);
if (startIdx !== -1) {
    // Find the closing div of phase-read. 
    // It's at line 568 in the previous view_file.
    // Let's find it by searching from startIdx.
    // We need to match the indentation of line 568.
    const closingDiv = '            </div>\n        </main>';
    const endIdx = content.indexOf(closingDiv, startIdx);

    if (endIdx !== -1) {
        const replacement = phaseReadStart + `
                <!-- Background Layer: Cover Image (Darkened) -->
                <div id="read-bg" class="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style="filter: brightness(0.3) blur(8px)">
                </div>
                <!-- Dynamic Content Container -->
                <div id="phaseContainer" class="flex-1 flex flex-col relative z-20 overflow-hidden">
                    <!-- renderReadPhase() will inject content here -->
                </div>`;

        // Note: the original code had </div> at 568. 
        // My replacement includes phaseReadStart, so I replace from startIdx to the end of the content before </main>.

        content = content.substring(0, startIdx) + replacement + '\n' + content.substring(endIdx);
    }
}

// 2. Fix renderReadPhase
// Ensure it targets #phaseContainer and sets background
const renderReadPhaseStart = 'function renderReadPhase() {';
const renderReadPhaseContent = `function renderReadPhase() {
            const phaseContainer = document.getElementById('phaseContainer');
            if (!phaseContainer) return;

            // Set background cover from current book
            const book = booksData.find(b => b.id === currentModalBookId) || booksData.find(b => b.id === 'silent-stick') || booksData[0];
            const bgElement = document.getElementById('read-bg');
            if (bgElement && book) {
                bgElement.style.backgroundImage = \`url('\${book.src}')\`;
            }

            if (currentReadStep === 'selection') {
                phaseContainer.innerHTML = \`
                    <div class="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
                        <h2 class="text-6xl font-black text-white mb-16 font-fredoka text-center drop-shadow-2xl">
                            How would you like to read?
                        </h2>
                        <div class="flex gap-12 max-w-6xl w-full mb-16 px-8">
                            <!-- E-Book Card -->
                            <button onclick="selectReadingMode('ebook')" id="card-ebook"
                                class="flex-1 group relative p-12 rounded-[48px] border-4 transition-all duration-300 \${selectedReadingMode === 'ebook' ? 'bg-sky-500/30 border-sky-400 shadow-[0_0_50px_rgba(56,189,248,0.4)] scale-105' : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'}">
                                <div class="w-28 h-28 rounded-3xl flex items-center justify-center mb-10 mx-auto transition-all \${selectedReadingMode === 'ebook' ? 'bg-white text-sky-500' : 'bg-white/20 text-white group-hover:bg-white/30'}">
                                    <i data-lucide="book" class="w-14 h-14"></i>
                                </div>
                                <h3 class="text-4xl font-black mb-4 text-white font-fredoka">E-Book</h3>
                                <p class="text-xl font-medium text-slate-300 opacity-90 leading-relaxed">Classic reading experience with clean text.</p>
                                \${selectedReadingMode === 'ebook' ? '<div class="absolute -top-4 -right-4 w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white"><i data-lucide="check" class="w-6 h-6"></i></div>' : ''}
                            </button>

                            <!-- Interactive Card -->
                            <button onclick="selectReadingMode('interactive')" id="card-interactive"
                                class="flex-1 group relative p-12 rounded-[48px] border-4 transition-all duration-300 \${selectedReadingMode === 'interactive' ? 'bg-orange-500/30 border-orange-400 shadow-[0_0_50px_rgba(251,146,60,0.4)] scale-105' : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'}">
                                <div class="w-28 h-28 rounded-3xl flex items-center justify-center mb-10 mx-auto transition-all \${selectedReadingMode === 'interactive' ? 'bg-white text-orange-500' : 'bg-white/20 text-white group-hover:bg-white/30'}">
                                    <i data-lucide="sparkles" class="w-14 h-14"></i>
                                </div>
                                <h3 class="text-4xl font-black mb-4 text-white font-fredoka">Interactive</h3>
                                <p class="text-xl font-medium text-slate-300 opacity-90 leading-relaxed">Read along with voice, images, and fun effects!</p>
                                \${selectedReadingMode === 'interactive' ? '<div class="absolute -top-4 -right-4 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white"><i data-lucide="check" class="w-6 h-6"></i></div>' : ''}
                            </button>
                        </div>

                        <button onclick="goToReadStep('intro')" \${!selectedReadingMode ? 'disabled' : ''} 
                            class="w-full max-w-xl h-24 bg-white text-slate-900 rounded-[32px] text-4xl font-black shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none drop-shadow-2xl">
                            OK
                        </button>
                    </div>
                \`;
                lucide.createIcons();
            } else if (currentReadStep === 'intro') {`;

// Replace renderReadPhase (from start to the intro check)
const rrPhaseRegex = /function renderReadPhase\(\) \{[\s\S]*?if \(currentReadStep === 'intro'\) \{/;
content = content.replace(rrPhaseRegex, renderReadPhaseContent);

// 3. Ensure setPhase calls renderReadPhase
const spRegex = /document.getElementById\(\`phase-\$\{phase\}\`\)\.classList\.remove\('hidden'\);/g;
// Use a more specific replacement to avoid double-injecting if it already exists
if (!content.includes('if (phase === \'read\') renderReadPhase();')) {
    content = content.replace(spRegex, "document.getElementById(`phase-${phase}`).classList.remove('hidden');\n            if (phase === 'read') renderReadPhase();");
}

fs.writeFileSync(filePath, content);
console.log('Surgically fixed Read phase and background in prototype.html');
