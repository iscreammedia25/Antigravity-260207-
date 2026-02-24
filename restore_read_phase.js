const fs = require('fs');
const filePath = 'c:/Users/LG/Documents/GitHub/Antigravity-260207-/prototype.html';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix renderReadPhase - selection step background and images
const selectionRegex = /if \(currentReadStep === 'selection'\) \{[\s\S]*?\} else if \(currentReadStep === 'intro'\)/;
const newSelectionContent = `if (currentReadStep === 'selection') {
                // [FIX] Background to SC01 for selection screen as per user request
                const filteredScenes = mockScenes.filter(s => s.id === currentModalBookId);
                const sc01 = filteredScenes.find(s => s.scene_no === '#SC01') || filteredScenes[0];
                if (bgElement && sc01) {
                    bgElement.style.backgroundImage = \`url('\${sc01.image_url}')\`;
                }

                phaseContainer.innerHTML = \`
                    <div class="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">
                        <h2 class="text-6xl font-black text-white mb-16 font-fredoka text-center drop-shadow-2xl">
                            How would you like to read?
                        </h2>
                        <div class="flex gap-12 max-w-6xl w-full mb-16 px-8">
                            <!-- E-Book Card -->
                            <button onclick="selectReadingMode('ebook')" id="card-ebook"
                                class="flex-1 group relative p-12 rounded-[48px] border-4 transition-all duration-300 \${selectedReadingMode === 'ebook' ? 'bg-sky-500/30 border-sky-400 shadow-[0_0_50px_rgba(56,189,248,0.4)] scale-105' : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'}">
                                <div class="w-28 h-28 rounded-3xl flex items-center justify-center mb-10 mx-auto transition-all \${selectedReadingMode === 'ebook' ? 'bg-white text-sky-500 shadow-xl' : 'bg-white/20 text-white group-hover:bg-white/30'} overflow-hidden">
                                    <img src="./public/UI/Ebook.png" class="w-full h-full object-contain p-4" />
                                </div>
                                <h3 class="text-4xl font-black mb-4 text-white font-fredoka">E-Book</h3>
                                <p class="text-xl font-medium text-slate-300 opacity-90 leading-relaxed">Classic reading experience with clean text.</p>
                                \${selectedReadingMode === 'ebook' ? '<div class="absolute -top-4 -right-4 w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white"><i data-lucide="check" class="w-6 h-6"></i></div>' : ''}
                            </button>

                            <!-- Ani-book Card -->
                            <button onclick="selectReadingMode('interactive')" id="card-interactive"
                                class="flex-1 group relative p-12 rounded-[48px] border-4 transition-all duration-300 \${selectedReadingMode === 'interactive' ? 'bg-orange-500/30 border-orange-400 shadow-[0_0_50px_rgba(251,146,60,0.4)] scale-105' : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'}">
                                <div class="w-28 h-28 rounded-3xl flex items-center justify-center mb-10 mx-auto transition-all \${selectedReadingMode === 'interactive' ? 'bg-white text-orange-500 shadow-xl' : 'bg-white/20 text-white group-hover:bg-white/30'} overflow-hidden">
                                    <img src="./public/UI/Anibook.png" class="w-full h-full object-contain p-4" />
                                </div>
                                <h3 class="text-4xl font-black mb-4 text-white font-fredoka">Ani-book</h3>
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
            } else if (currentReadStep === 'intro')`;

content = content.replace(selectionRegex, newSelectionContent);

// 2. Fix viewing step navigation buttons and structure
const viewingRegex = /\} else if \(currentReadStep === 'viewing'\) \{[\s\S]*?\}/;
const newViewingContent = `} else if (currentReadStep === 'viewing') {
                const filteredScenes = mockScenes.filter(s => s.id === currentModalBookId);
                const scene = filteredScenes[currentSceneIndex];
                if (!scene) return;

                // Sync background to current scene image
                if (bgElement) {
                    bgElement.style.backgroundImage = \`url('\${scene.image_url}')\`;
                    bgElement.style.filter = 'brightness(1.0) blur(0px)';
                }

                if (!scene.fetchedScript && !scene.isFetching) {
                    scene.isFetching = true;
                    fetchSceneScript(scene).then(() => {
                        scene.isFetching = false;
                        if (currentSceneIndex === filteredScenes.indexOf(scene)) {
                            renderReadPhase();
                        }
                    });
                }

                const script = scene.fetchedScript || scene.script;
                const sentencesHtml = script.split('\\n').filter(s => s.trim().length > 0).map((sentence, idx) => \`
                    <span onclick="event.stopPropagation(); playSentenceAudio(\${idx})" 
                          class="cursor-pointer hover:text-orange-300 transition-colors pointer-events-auto inline-block mr-3 mb-2 \${(playingSentenceIndex === idx || isSceneAudioPlaying) ? 'text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)] scale-105' : ''}">
                        \${sentence}
                    </span>
                \`).join('');

                const dotsHtml = filteredScenes.map((_, index) => \`
                    <div class="w-3 h-3 rounded-full transition-all duration-300 \${index === currentSceneIndex ? 'bg-[#FF6B00] scale-125 shadow-[0_0_10px_#FF6B00]' : 'bg-white/40'}"></div>
                \`).join('');

                const positionClass = getTextPositionClass(currentSceneIndex);

                phaseContainer.innerHTML = \`
                    <div class="flex-1 flex flex-col relative z-20 overflow-hidden animate-in fade-in duration-500">
                        <!-- Main Content (Full Background Photo) -->
                        <div class="absolute inset-0 bg-black z-0">
                             <img src="\${scene.image_url}" class="w-full h-full object-cover" />
                        </div>

                        <!-- Shared Text Overlay -->
                        <div class="absolute z-50 p-12 max-w-[1400px] transition-all duration-500 ease-in-out flex items-start gap-8 pointer-events-none \${positionClass.replace('items-start', '').replace('items-end', '')} \${positionClass.includes('left-') ? 'ml-32' : ''} \${positionClass.includes('right-') ? 'mr-32' : ''}">
                            <!-- Play Button -->
                            <button onclick="event.stopPropagation(); playFullSceneAudio()" class="mt-40 w-14 h-14 bg-[#FF6B00] rounded-full shadow-[0_4px_15px_rgba(255,107,0,0.5)] flex items-center justify-center text-white hover:bg-[#FF8500] hover:scale-110 active:scale-95 transition-all pointer-events-auto flex-shrink-0 \${isSceneAudioPlaying ? 'ring-4 ring-orange-300' : ''}">
                                <i data-lucide="play" class="w-8 h-8 \${isSceneAudioPlaying ? 'fill-current' : ''}"></i>
                            </button>

                            <div class="flex-1 pointer-events-auto">
                                <p class="text-white font-black font-fredoka leading-[1.3] drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] whitespace-pre-line \${positionClass.includes('text-right') ? 'text-right' : 'text-left'} \${textSize === 'normal' ? 'text-4xl md:text-5xl lg:text-6xl' : textSize === 'large' ? 'text-5xl md:text-6xl lg:text-7xl' : 'text-6xl md:text-7xl lg:text-8xl'}">
                                    \${sentencesHtml}
                                </p>
                            </div>
                        </div>

                        <!-- Footer Controls -->
                        <div class="absolute bottom-12 inset-x-12 flex items-center justify-between z-30 transition-all duration-500">
                             <!-- Settings Button -->
                            <button onclick="toggleSettings()" class="w-16 h-16 bg-black/40 backdrop-blur-3xl rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all shadow-xl">
                                <i data-lucide="settings" class="w-8 h-8"></i>
                            </button>

                            <!-- Dot Pagination -->
                            <button onclick="toggleScenePicker()" class="flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/20 hover:scale-105 active:scale-95 transition-all group">
                                <div class="text-white group-hover:text-[#FF6B00] transition-colors"><i data-lucide="chevron-up" class="w-6 h-6"></i></div>
                                <div class="flex items-center gap-2">\${dotsHtml}</div>
                            </button>

                            <div class="w-16"></div>
                        </div>

                        <!-- Scene Picker -->
                        \${isScenePickerOpen ? \`
                        <div class="absolute inset-0 bg-black/80 backdrop-blur-2xl z-[70] animate-in slide-in-from-bottom duration-500" onclick="toggleScenePicker()">
                            <div class="p-16 h-full flex flex-col justify-end" onclick="event.stopPropagation()">
                                <div class="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
                                    \${filteredScenes.map((s, idx) => \`
                                        <button onclick="jumpToScene(\${idx})" class="relative flex-shrink-0 w-64 aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all hover:scale-105 \${idx === currentSceneIndex ? 'ring-4 ring-orange-500' : 'opacity-60'}">
                                            <img src="\${s.image_url}" class="w-full h-full object-cover" />
                                            <div class="absolute bottom-4 left-4 text-white font-black">Scene \${idx+1}</div>
                                        </button>
                                    \`).join('')}
                                </div>
                                <button onclick="toggleScenePicker()" class="w-full text-white text-3xl font-black mb-8">CLOSE</button>
                            </div>
                        </div>
                        \` : ''}

                        <!-- Navigation Buttons -->
                        <div class="absolute top-1/2 inset-x-12 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
                            <button onclick="prevScene()" class="w-24 h-24 rounded-full bg-white/10 hover:bg-white/20 border-4 border-white/20 flex items-center justify-center text-white pointer-events-auto transition-all active:scale-90 \${currentSceneIndex === 0 ? 'opacity-0 pointer-events-none' : ''}">
                                <i data-lucide="chevron-left" class="w-12 h-12"></i>
                            </button>
                            <button onclick="nextScene()" class="w-24 h-24 rounded-full bg-white hover:scale-110 flex items-center justify-center text-slate-900 shadow-2xl pointer-events-auto transition-all active:scale-90">
                                <i data-lucide="chevron-right" class="w-12 h-12"></i>
                            </button>
                        </div>
                    </div>
                \`;
                lucide.createIcons();
            }`;

content = content.replace(viewingRegex, newViewingContent);

// 3. Implement missing navigation functions and helpers
const navigationFunctions = `
        function nextScene() {
            const scenes = mockScenes.filter(s => s.id === currentModalBookId);
            if (currentSceneIndex < scenes.length - 1) {
                currentSceneIndex++;
                if (currentSceneIndex > maxReachedSceneIndex) maxReachedSceneIndex = currentSceneIndex;
                isScenePickerOpen = false;
                stopAudio();
                renderReadPhase();
                if (isNarrationOn) {
                    setTimeout(() => { playFullSceneAudio(); }, 500);
                }
            } else {
                showReadCompletePraise();
            }
        }

        function changeScene(delta) {
            if (delta > 0) nextScene();
            else prevScene();
        }
`;

// Insert after prevScene
const prevSceneRegex = /function prevScene\(\) \{[\s\S]*?renderReadPhase\(\);\s*\}\s*\}/;
content = content.replace(prevSceneRegex, (match) => match + navigationFunctions);

fs.writeFileSync(filePath, content);
console.log('Restored Read phase navigation, images, and stable layout in prototype.html');
