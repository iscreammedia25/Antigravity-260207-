

            const booksData = [
                { id: 'CS0003', title: 'Hans in Luck', src: './public/Image/Cover/CS0003(Hans in Luck).png', lexile: '200~280', wordCount: 115, category: 'Adventure', summary: 'Hans trades his way home, finding happiness in everything he gets along the way.', keywords: ['hans', 'luck', 'trade', 'happy'], isBookmarked: true, isUnread: false, videoUrl: './public/Video/Book/Intro/CS0003(Hans in Luck)/CS0003(Hans in Luck)_Intro.mp4', rating: 5 },
                { id: 'OG0021', title: 'Milo and the Lost Color', src: './public/Image/Cover/OG0021(Milo and the Lost Color).png', lexile: '320~380', wordCount: 160, category: 'Animals', summary: 'Milo is a dog with a very big imagination. Every time he goes for a walk, he sees a world full of dragons.', keywords: ['dog', 'dream', 'adventure', 'wild'], isBookmarked: true, isUnread: true, videoUrl: './public/Video/Book/Intro/OG0021(Milo and the Lost Color)/OG0021(Milo and the Lost Color)_Intro.mp4', rating: 5 },
                { id: 'OG0046', title: 'The Silent Stick', src: './public/Image/Cover/OG0046(The Silent Stick).png', lexile: '250~320', wordCount: 130, category: 'Adventure', summary: "A magic stick that doesn't make a sound helps a quiet boy find his way through a mysterious forest.", keywords: ['magic', 'quiet', 'forest', 'path'], isBookmarked: true, isUnread: false, videoUrl: './public/Video/Book/Intro/OG0046(The Silent Stick)/OG0046(The Silent Stick)_Intro.mp4', rating: 5 },
                { id: 'OG0050', title: 'The Rainbow Cloud in the Box', src: './public/Image/Cover/OG0050(The Rainbow Cloud in the Box).png', lexile: '350~400', wordCount: 180, category: 'Fantasy', summary: 'A magical cloud that rains colors instead of water changes everything in the gray city of Grumbletown.', keywords: ['magic', 'cloud', 'color', 'happy'], isBookmarked: true, isUnread: false, videoUrl: './public/Video/Book/Intro/OG0050(The Rainbow Cloud in the Box)/OG0050(The Rainbow Cloud in the Box)_Intro.mp4', rating: 5 },
                { id: 'OG00XX_missing_planet', title: 'The Missing Planet', src: './public/Image/Cover/OG00XX(The Missing Planet).png', lexile: '250~300', wordCount: 120, category: 'Space', summary: 'A brave little astronaut goes on a mission to find a planet that disappeared from the star maps. Join the cosmic adventure!', keywords: ['planet', 'space', 'astronaut', 'star'], isBookmarked: false, isUnread: true, videoUrl: '' },
                { id: 'OG00XX_rainbow', title: 'Rainbow', src: './public/Image/Cover/OG00XX(Rainbow).png', lexile: '150~200', wordCount: 85, category: 'Nature', summary: 'Follow the beautiful colors across the sky after a rainy day. Learn how rainbows are made of light and magic!', keywords: ['color', 'rain', 'sky', 'sun'], isBookmarked: false, isUnread: false, videoUrl: '' },
                { id: 'OG00XX_two_friends', title: 'Two Friends', src: './public/Image/Cover/OG00XX(Two Friends).png', lexile: '200~250', wordCount: 110, category: 'Friendship', summary: 'A story about a rabbit and a turtle who discover that being different is what makes their friendship so special.', keywords: ['friends', 'together', 'help', 'game'], isBookmarked: false, isUnread: true, videoUrl: '' },
                { id: 'OG00XX_silent_seed', title: 'The Silent Seed', src: './public/Image/Cover/OG00XX(The Silent Seed).png', lexile: '300~350', wordCount: 145, category: 'Science', summary: 'Deep under the ground, a tiny seed waits silently for the perfect moment to grow into a magnificent tree.', keywords: ['grow', 'wait', 'ground', 'leaf'], isBookmarked: false, isUnread: true, videoUrl: '' },
                { id: 'OG00XX_broken_branch', title: 'The Broken Branch', src: './public/Image/Cover/OG00XX(The Broken Branch).png', lexile: '280~340', wordCount: 135, category: 'Nature', summary: 'When a strong wind breaks a branch, the forest animals work together to make it a new home for a bird family.', keywords: ['tree', 'wind', 'home', 'birds'], isBookmarked: false, isUnread: true, videoUrl: '' },
                { id: 'CS00XX_pea', title: 'The Pea', src: './public/Image/Cover/CS00XX(The Pea).png', lexile: '180~230', wordCount: 95, category: 'Food', summary: 'One tiny green pea rolls off the plate and travels across the kitchen floor. Where will it end up?', keywords: ['green', 'roll', 'kitchen', 'floor'], isBookmarked: false, isUnread: false, videoUrl: '' },
                { id: 'CS00XX_cindellar', title: 'Cinderella', src: './public/Image/Cover/CS00XX(Cinderella).png', lexile: '380~450', wordCount: 210, category: 'Classic', summary: 'A new retelling of the classic fairy tale with a focus on being kind to yourself and others.', keywords: ['princess', 'kind', 'dance', 'shoe'], isBookmarked: false, isUnread: true, videoUrl: '' },
                { id: 'CS00XX_flying_trunk', title: 'The Flying Trunk', src: './public/Image/Cover/CS00XX(The Fyling Trunk).png', lexile: '340~390', wordCount: 175, category: 'Adventure', summary: 'Travel the world in a magic trunk that can fly over mountains and oceans.', keywords: ['fly', 'travel', 'ocean', 'magic'], isBookmarked: false, isUnread: false, videoUrl: '' },
                { id: 'CS00XX_rapunzel', title: 'The Rapunzel', src: './public/Image/Cover/CS00XX(The Rapunzel).png', lexile: '360~410', wordCount: 190, category: 'Classic', summary: 'A story about inner strength and finding your own voice from high up in a stone tower.', keywords: ['hair', 'tower', 'voice', 'strong'], isBookmarked: false, isUnread: true, videoUrl: '' },
                { id: 'CS00XX_ugly_dukling', title: 'The Ugly Dukling', src: './public/Image/Cover/CS00XX(The Ugly Dukling).png', lexile: '300~360', wordCount: 155, category: 'Animals', summary: 'Discover how being different can lead to finding where you truly belong.', keywords: ['different', 'belong', 'lake', 'swan'], isBookmarked: false, isUnread: true, videoUrl: '' },
                { id: 'CS00XX_thumbelina', title: 'Thumbelina', src: './public/Image/Cover/CS00XX(Thumbelina).png', lexile: '280~340', wordCount: 140, category: 'Adventure', summary: 'A tiny girl discovers a world larger than life and finds where she truly belongs.', keywords: ['tiny', 'thumb-sized', 'adventure', 'flower'], isBookmarked: false, isUnread: true, videoUrl: '' },
            ];


            // --- Global State ---
            let currentModalBookId = null;
            let isHistoryMode = true;
            let freshHeroBook = null;
            let currentHeroIndex = 1; // Start with The Silent Stick in middle
            let isHeroCTAFlashing = false;
            let currentModalOrigin = 'recommendation';

            // Library Section State
            let currentActiveZone = 'Book Zone';
            let currentActiveSubTab = 'All Books';
            let currentSubCategory = 'All';
            let librarySortBy = 'Recent';
            let libraryShowUnreadOnly = false;

            let mediaFilters = {
                'Greeting': true,
                'Movie Book': true,
                'Audio Book': true
            };
            let mediaShowUnplayedOnly = false;

            const libraryZones = {
                'Book Zone': ['For you', 'Topics', "MD's pick", 'All Books'],
                'Media Zone': ['All Media', 'Greeting', 'Movie Book', 'Audio Book'],
                'My Library': ['In Progress', 'Completed', '❤️ Wishlist', 'Roadmap']
            };

            // My Library Dummy Data
            const MY_LIBRARY_DUMMY_DATA = {
                roadmap: booksData.slice(0, 15), // First 15 books for roadmap
                inProgress: [booksData[0], booksData[1]],
                completed: [booksData[2], booksData[3], booksData[4], booksData[5]],
                wishlist: [booksData[6], booksData[7], booksData[8]]
            };

            const topicCategories = ['All', 'Classics', 'Sports', 'Science', 'Fantasy', 'Nature', 'World', 'Career', 'Family', 'Music', 'Body'];
            const mdCategories = ['All', 'Spring', 'Christmas', 'New', 'Award'];



            const mockMediaData = booksData.map((book, idx) => {
                const themes = ['ocean', 'space', 'forest', 'city', 'candy'];
                const theme = themes[idx % themes.length];

                // Rule 3: Movie Book thumbnail uses SC01 image
                const folderPath = book.src.replace('Cover', 'Book').replace('.png', '');
                let movieThumb = `${folderPath}/${book.id}_SC00_I.png`;

                return {
                    baseId: book.id,
                    bookTitle: book.title,
                    bookSrc: book.src, // 3:4 cover for All Media left side (Rule 1)
                    items: [
                        {
                            id: `${book.id}__greeting`,
                            type: 'Greeting',
                            title: book.title, // Rule 2: Title matches book title
                            src: book.videoUrl || 'https://vjs.zencdn.net/v/oceans.mp4',
                            thumb: `https://api.dicebear.com/7.x/shapes/svg?seed=${book.id}_g`,
                            rt: '01:20',
                            isUnplayed: Math.random() > 0.5
                        },
                        {
                            id: `${book.id}__movie`,
                            type: 'Movie Book',
                            title: `${book.title} Movie`,
                            src: book.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4',
                            thumb: `${folderPath}/${book.id}_SC01_I.png`,
                            rt: '05:45',
                            isUnplayed: Math.random() > 0.5
                        },
                        {
                            id: `${book.id}__audio`,
                            type: 'Audio Book',
                            title: `${book.title} Audio`,
                            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                            thumb: book.src, // ?서 ?? ?용 (Rule 4)
                            rt: '04:30',
                            isUnplayed: Math.random() > 0.5
                        }
                    ]
                };
            });


            let mockHistory = [
                { id: 'CS0003', title: 'Hans in Luck', src: './public/Image/Cover/CS0003(Hans in Luck).png', progress: 0, phase: 'voca', completedPhases: [] },
                { id: 'OG0046', title: 'The Silent Stick', src: './public/Image/Cover/OG0046(The Silent Stick).png', progress: 0, phase: 'voca', completedPhases: [] },
            ];


            // Global State
            let currentPhase = 'home'; // 'home' or 'read'
            let currentSceneIndex = 0;
            let selectedReadingMode = null;

            // Settings State
            let isSettingsOpen = false;
            let isNarrationOn = false;
            let isPageTurnOn = false;
            let narrationSpeed = 'normal';
            let textSize = 'medium';

            // Difficulty State
            let currentDifficulty = 'Original';
            let isDifficultyOpen = false;
            let isTextFading = false;

            // Read Aloud State
            let isReadAloudActive = false;
            let readAloudMode = 'all'; // 'all' or 'sentence'
            let isRecording = false;
            let hasRecorded = false;

            const scenesData = [
                { book_id: "OG0046", scene_no: "SC01", script: "The frozen lake lay still, \na big area of gray ice \nbeneath a heavy winter sky.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC01_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC01_A.mp3" },
                { book_id: "OG0046", scene_no: "SC02", script: "He hit the puck with force, \nbut his old stick broke \nsuddenly upon impact.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC02_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC02_A.mp3" },
                { book_id: "OG0046", scene_no: "SC03", script: "Two pieces of wood lay on the ice, \nshowing the end of his practice.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC03_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC03_A.mp3" },
                { book_id: "OG0046", scene_no: "SC04", script: "Ren worked for hours, \ncutting the skin to show \nthe hard wood under.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC04_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC04_A.mp3" },
                { book_id: "OG0046", scene_no: "SC05", script: "When he tested it, \nthe puck flew in strange circles \ndue to the wood’s natural shape.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC05_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC05_A.mp3" },
                { book_id: "OG0046", scene_no: "SC06", script: "Jax glanced at Ren’s rough branch \nand offered a cold smile, saying nothing.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC06_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC06_A.mp3" },
                { book_id: "OG0046", scene_no: "SC07", script: "Jax controlled the ice, \nhis speed pushing Ren \nback toward his own goal.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC07_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC07_A.mp3" },
                { book_id: "OG0046", scene_no: "SC08", script: "The puck turned around the confused player, \ngoing quietly into the net as the whistle blew.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC08_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC08_A.mp3" },
                { book_id: "OG0046", scene_no: "SC09", script: "Ren smiled at his rough stick \nand skated away silently.", image_url: "./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC09_I.png", full_audio: "./public/Audio/Book/OG0046(The Silent Stick)/OG0046_SC09_A.mp3" },
                { book_id: "OG0021", scene_no: "SC01", script: "Milo is a little chameleon. He loves to change colors—green, blue, red!", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC01_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC02", script: "But one morning, he wakes up gray. “Oh no! Where is my color?” Milo says. He looks at his tail. It’s still gray. He feels sad and shy.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC02_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC03", script: "Milo walks into the forest. He sees a yellow butterfly. “Can I borrow your color?” he asks.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC03_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC04", script: "The butterfly smiles. “My color is for flying!” Milo smiles back. “Then I will keep looking.” He waves goodbye.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC04_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC05", script: "He meets a red flower. “Can I have your color?” Milo asks. The flower says, “My color helps the bees.”", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC05_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC06", script: "Milo is sad. “Everyone has their own color.” He sits by a blue pond. A small tear drops into the water.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC06_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC07", script: "The pond shines! Milo sees many colors in the water—red, yellow, blue, green. They mix and dance like rainbows.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC07_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC08", script: "Milo laughs. “Maybe my color is inside me!” He takes a deep breath and closes his eyes. His body starts to glow.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC08_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC09", script: "Green! Then blue! Then red again! Milo’s colors come back, brighter than before. He feels happy and warm.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC09_I.png", full_audio: "" },
                { book_id: "OG0021", scene_no: "SC10", script: "Milo runs home. He looks in the mirror. “I found my color—me!” he says proudly.", image_url: "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC10_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC01", script: "On the quiet planet of Tiny Rock, two friends named Podo and Didi spent their evenings watching the universe. One of the two friends, Didi was always searching for excitement.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC01_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC02", script: "Suddenly, a breathtaking rainbow cloud floated near their rock. It was a swirling cloud of stardust, glowing with vibrant shades of violet, orange, and emerald green.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC02_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC03", script: "\"It is the most beautiful thing I have ever seen!\" exclaimed Didi. \"I must have it. I will capture a piece to keep on my shelf.\"", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC03_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC04", script: "Podo frowned gently. \"I do not think you can own a cloud, Didi,\" he warned. \"Its beauty comes from its movement.\"", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC04_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC05", script: "Ignoring his friend, Didi grabbed a net and caught a portion of the cloud into a pristine crystal box. “Got it!” he shouted triumphantly.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC05_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC06", script: "He rushed inside to display his treasure. But as he set the box down, the vibrant light began to dim. The swirling colors stopped moving.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC06_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC07", script: "The captured cloud transformed before their eyes. It became a stagnant, dark gray clump of moisture, looking like a dirty raincloud.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC07_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC08", script: "\"This is terrible,\" Didi groaned, tapping the glass. \"It looks like smoke. Where did the magic go?\"", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC08_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC09", script: "\"The magic was in the freedom,\" Podo said wisely. \"By trapping it, you extinguished its light. It is suffocating in there.\"", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC09_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC10", script: "Didi realized his mistake. He looked at the dull box and then at the vast, open sky. He picked up the box and ran back outside.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC10_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC11", script: "With a hopeful heart, Didi unlatched the crystal box. The gray wisp floated tentatively into the void.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC11_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC12", script: "Instantly, the vacuum of space revitalized it. The gray turned back into brilliant violet and emerald. It joined the rest of the cloud, swirling happily.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC12_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC13", script: "\"It is a masterpiece again,\" Didi whispered, watching it drift away. \"Indeed,\" agreed Podo. \"And now we can enjoy it together, right where it belongs.\" They watched it fly free and smiled.", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC13_I.png", full_audio: "" },
                { book_id: "OG0050", scene_no: "SC14", script: "Rainbow Cloud 14", image_url: "./public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC14_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC01", script: "Hans works hard for seven years. His master gives him a big piece of gold as pay. Hans puts the gold on his shoulder and starts to walk home to his mother.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC01_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC02", script: "The gold is very heavy. Hans sees a man on a horse. \"Riding looks easy,\" says Hans.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC02_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC03", script: "The man stops and says, \"Give me your gold, and I will give you my horse.\" Hans is happy to trade.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC03_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC04", script: "He gets on the horse, but the horse runs too fast. He falls to the ground. A farmer with a cow helps him stand up.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC04_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC05", script: "\"Horses are dangerous,\" says Hans. \"I like your cow. It gives milk every day.\" The farmer smiles and says, \"I will trade my cow for your horse.\" Hans agrees right away.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC05_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC06", script: "Hans walks with the cow. He feels very thirsty and tries to get milk. But no milk comes out. The cow kicks Hans, and he falls down.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC06_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC07", script: "A man with a pig sees him. \"That cow is too old to give milk,\" says the man. \"Your pig looks young and good,\" says Hans. \"I can trade my pig for the cow,\" says the man. Hans likes the idea.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC07_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC08", script: "Later, Hans meets a boy with a white goose. Hans tells the boy about his lucky trades. The boy says, \"My goose is very heavy. The meat will be good.\" \"My pig is good too,\" says Hans.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC08_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC09", script: "Then the boy says, \"Is that pig yours? A rich man is looking for his lost pig. Someone stole it. You may be in trouble.\" Hans feels afraid. \"Please help me,\" he says. \"Take this pig and give me your goose.\"", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC09_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC10", script: "Hans thinks he is very lucky with the big goose. In the next village, he sees a man with a stone. The man sings while he works. \"You look happy,\" says Hans.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC10_I.jpg", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC11", script: "The man says, \"My work brings me money. You can do this work too.\" \"How can I do that?\" asks Hans. \"You just need a stone,\" says the man. \"Take this goose and give me your stone,\" says Hans.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC11_I.jpg", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC12", script: "\"Now I will be rich,\" Hans thinks. But the stone is very heavy. Soon Hans feels tired and hungry.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC12_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC13", script: "He stops at a well to drink water. He puts the stone on the edge. By accident, he pushes the stone. Splash! It falls into the deep water.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC13_I.png", full_audio: "" },
                { book_id: "CS0003", scene_no: "SC14", script: "He jumps for joy. \"Thank my lucky stars!\" he shouts. \"The heavy stone is gone. I am free from this heavy load.\" \nNow he has no gold, no horse, and no stone. But he is the happiest man in the world.", image_url: "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC14_I.png", full_audio: "" }
            ];


            function toggleMode() {
                isHistoryMode = !isHistoryMode;
                currentHeroIndex = 0;
                const btn = document.getElementById('modeToggleBtn');

                if (isHistoryMode) {
                    btn.innerText = 'DEV: HISTORY MODE';
                    btn.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-700');
                    btn.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');
                } else {
                    btn.innerText = 'DEV: FRESH MODE';
                    btn.classList.remove('bg-slate-800', 'text-slate-400', 'border-slate-700');
                    btn.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
                }
                renderHero();
            }

            function renderHero() {
                const container = document.getElementById('heroContainer');
                if (!container) return; // safety

                const isHistory = isHistoryMode;
                let items = isHistory ? [...mockHistory] : [
                    freshHeroBook || booksData.find(b => b.id === 'CS0003')
                ];

                // Pad with placeholders to ensure 3 slots
                if (isHistory && items.length < 3) {
                    const needed = 3 - items.length;
                    for (let i = 0; i < needed; i++) items.push({ isPlaceholder: true });
                }

                const userName = "Ami";
                const safeIndex = (currentHeroIndex >= 0 && currentHeroIndex < items.length) ? currentHeroIndex : 0;
                const item = items[safeIndex];

                if (item && !item.isPlaceholder) currentModalBookId = item.id;

                const prevItem = items[(safeIndex - 1 + items.length) % items.length];
                const nextItem = items[(safeIndex + 1) % items.length];

                const progress = (isHistory && !item.isPlaceholder) ? item.progress : 0;
                const phasesText = (isHistory && !item.isPlaceholder) ? `
                <div class="flex gap-3 mb-1">
                    <span class="text-xs uppercase ${item.completedPhases.includes('voca') ? 'text-green-400' : 'text-yellow-300 font-black'}">voca</span>
                    <span class="text-xs uppercase ${item.phase === 'read' ? 'text-yellow-300 font-black' : item.completedPhases.includes('read') ? 'text-green-400' : 'opacity-40'}">> read</span>
                    <span class="text-xs uppercase ${item.phase === 'talk' ? 'text-yellow-300 font-black' : item.completedPhases.includes('talk') ? 'text-green-400' : 'opacity-40'}">> talk</span>
                    <span class="text-xs uppercase ${item.phase === 'quiz' ? 'text-yellow-300 font-black' : 'opacity-40'}">> quiz</span>
                </div>
            ` : '<div class="text-xs uppercase opacity-40">voca > read > talk > quiz</div>';

                container.innerHTML = `
                <section class="card-bubble hero-section-fix relative overflow-hidden p-6 md:p-10 transition-all duration-700 border-none shadow-2xl flex items-center min-h-[380px]" 
                         style="background-color: ${isHistory ? '#0f172a' : '#fbbf24'} !important; border-radius: 48px !important;">
                    
                    <!-- Decorative Background Glow -->
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-400/10 blur-[120px] rounded-full pointer-events-none"></div>

                    <div id="heroContentChunk" class="flex flex-col md:flex-row items-center gap-12 w-full relative z-10 animate-in fade-in slide-in-from-right duration-500">
                        <!-- Book Display Unit -->
                        <div class="relative flex items-center justify-center w-full md:w-[320px] h-[340px] flex-shrink-0">
                            ${isHistory && items.length > 1 ? `
                                <div id="hero-left-slot" class="absolute left-[-22%] scale-75 opacity-70 pointer-events-none transform -rotate-6 transition-all duration-500">
                                    <div class="w-48 h-64 bg-slate-900/60 backdrop-blur-md rounded-[28px] shadow-xl overflow-hidden border-2 border-white/20">
                                        ${prevItem.isPlaceholder ? `
                                            <div class="w-full h-full border-4 border-dashed border-white/10 rounded-[28px] flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-white/5 to-white/0">
                                                <div class="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 shadow-inner">
                                                    <span class="text-white/40 text-4xl font-black">+</span>
                                                </div>
                                                <p class="text-white/20 font-black text-[10px] uppercase tracking-widest">Empty Slot</p>
                                            </div>
                                        ` : `<img src="${prevItem.src}" class="w-full h-full object-cover brightness-90">`}
                                    </div>
                                </div>
                            ` : ''}

                            <!-- Main Hero Card -->
                            <div id="hero-center-slot" class="relative z-10 group">
                                <div class="w-56 h-[280px] rounded-[36px] shadow-2xl overflow-hidden transform border-4 ${isHistory ? 'border-white' : 'border-[#0f172a]/10'} transition-all group-hover:scale-105 cursor-pointer ${item.isPlaceholder ? 'bg-slate-900/60 backdrop-blur-xl' : 'bg-white'}" 
                                     onclick="${item.isPlaceholder ? '' : `openModal('${item.id}', '${isHistory ? 'history' : 'recommendation'}')`}">
                                    ${item.isPlaceholder ? `
                                        <div class="w-full h-full border-4 border-dashed border-white/20 rounded-[28px] flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-xl group-hover:from-white/20 transition-all">
                                            <div class="w-20 h-20 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center bg-white/5 shadow-2xl">
                                                <span class="text-white/30 text-6xl font-black">+</span>
                                            </div>
                                            <p class="text-white/20 font-black text-2xl uppercase tracking-[0.2em]">Empty Slot</p>
                                        </div>
                                    ` : `
                                        <img src="${item.src}" class="w-full h-full object-cover">
                                        <div class="absolute top-4 left-4 z-20">
                                            <div class="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                                                <div class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                                                <p class="text-white font-black text-[9px] uppercase tracking-widest opacity-90">${isHistory ? 'In Progress' : 'Recommended'}</p>
                                            </div>
                                        </div>
                                        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 min-h-[40%]">
                                            <h3 class="text-white font-black leading-tight text-center" style="font-size: ${item.title.length > 20 ? '14px' : '18px'}">${item.title}</h3>
                                        </div>
                                    `}
                                </div>

                                ${isHistory && items.length > 1 ? `
                                    <div class="absolute inset-y-0 -left-8 -right-8 flex items-center justify-between pointer-events-none">
                                        <button onclick="event.stopPropagation(); navigateHero(-1)" class="w-12 h-12 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto border-2 border-white/40 shadow-lg transition-all active:scale-90"><i data-lucide="chevron-left" class="w-7 h-7"></i></button>
                                        <button onclick="event.stopPropagation(); navigateHero(1)" class="w-12 h-12 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white pointer-events-auto border-2 border-white/40 shadow-lg transition-all active:scale-90"><i data-lucide="chevron-right" class="w-7 h-7"></i></button>
                                    </div>
                                ` : ''}
                            </div>

                            ${isHistory && items.length > 1 ? `
                                <div id="hero-right-slot" class="absolute right-[-22%] scale-75 opacity-70 pointer-events-none transform rotate-6 transition-all duration-500">
                                    <div class="w-48 h-64 bg-slate-900/60 backdrop-blur-md rounded-[28px] shadow-xl overflow-hidden border-2 border-white/20">
                                        ${nextItem.isPlaceholder ? `
                                            <div class="w-full h-full border-4 border-dashed border-white/10 rounded-[28px] flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-white/5 to-white/0">
                                                <div class="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 shadow-inner">
                                                    <span class="text-white/40 text-4xl font-black">+</span>
                                                </div>
                                                <p class="text-white/20 font-black text-[10px] uppercase tracking-widest">Empty Slot</p>
                                            </div>
                                        ` : `<img src="${nextItem.src}" class="w-full h-full object-cover brightness-90">`}
                                    </div>
                                </div>
                            ` : ''}
                        </div>

                        <!-- Right: Text & Actions Unit -->
                        <div class="flex-1 space-y-8 text-center md:text-left transition-all duration-700 md:pl-16 ${isHistory ? 'text-white' : 'text-[#0f172a]'}">
                            <div class="space-y-4">
                                <h2 class="text-5xl md:text-7xl font-black font-fredoka drop-shadow-md leading-tight whitespace-nowrap">
                                    ${isHistory ? `Continue Your<br>Adventure, ${userName}!` : `Start Your<br>Adventure, ${userName}!`}
                                </h2>
                            </div>

                            <div class="space-y-3 max-w-2xl">
                                <div class="flex flex-col md:flex-row items-baseline justify-between font-black font-fredoka gap-6 ${isHistory ? 'text-white' : 'text-[#0f172a]'}">
                                    <div class="flex flex-wrap gap-x-8 gap-y-2 uppercase tracking-normal font-black" style="font-size: clamp(1.5rem, 4vw, 3.5rem); line-height: 1;">
                                        ${phasesText}
                                    </div>
                                    <div class="flex items-baseline gap-4 font-black ${isHistory ? 'text-sky-100' : 'text-[#0f172a]'}" style="font-size: clamp(2rem, 5vw, 3rem); line-height: 1;">
                                        ${progress}% <span class="opacity-80 uppercase" style="font-size: 0.6em;">Completed!</span>
                                    </div>
                                </div>

                                <div class="h-4 w-full rounded-full overflow-hidden border p-1 shadow-inner ${isHistory ? 'bg-black/20 border-white/10' : 'bg-[#0f172a]/10 border-[#0f172a]/10'}">
                                    <div class="h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${isHistory ? 'from-sky-400 to-blue-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]' : 'from-orange-500 to-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.2)]'}" style="width: ${isHistory ? (progress > 0 ? Math.max(progress, 5) : 0) : 100}%"></div>
                                </div>
                            </div>

                            <div class="pt-4">
                                <button onclick="startLearning()" class="w-full md:max-w-md py-6 rounded-[32px] font-black text-4xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl ${isHistory ? 'bg-[#fbbf24] text-[#0f172a] shadow-amber-900/40' : 'bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-amber-900/20'} ${isHeroCTAFlashing ? 'animate-flash-yellow' : ''}">
                                    ${isHistory ? 'CONTINUE READING' : 'START READING'} <i data-lucide="play" class="w-10 h-10 fill-current ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            `;
                lucide.createIcons();
            }

            function navigateHero(dir) {
                currentHeroIndex = (currentHeroIndex + dir + mockHistory.length) % mockHistory.length;
                renderHero();
            }

            function renderBooks() {
                const container = document.getElementById('bookContainer');
                container.innerHTML = booksData.map(book => `
                <div key="${book.id}" onclick="openModal('${book.id}', 'recommendation')" class="w-36 md:w-40 flex-shrink-0 group cursor-pointer space-y-3 relative select-none">
                    <div class="aspect-[3/4] bg-slate-50 rounded-[32px] shadow-sm border-[4px] border-white group-hover:border-sky-300 transition-all group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-sky-100 overflow-hidden relative">
                        <img src="${book.src}" class="w-full h-full object-cover pointer-events-none">
                        <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <!-- Circular Heart Button - Always visible -->
                        <button onclick="handleHeartClick(event, '${book.id}')" class="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border hover:scale-110 active:scale-95 transition-all z-20">
                            <i data-lucide="heart" class="w-5 h-5 ${book.isBookmarked ? 'fill-current text-rose-500' : 'text-slate-300'} transition-colors"></i>
                        </button>
                    </div>
                    <p class="text-[10px] font-black text-center text-slate-400 truncate px-4 uppercase tracking-[0.15em] group-hover:text-sky-400 transition-colors font-fredoka">${book.title}</p>
                </div>
            `).join('');
                lucide.createIcons();
            }

            function openModal(bookId, origin = 'recommendation') {
                const book = booksData.find(b => b.id === bookId);
                if (!book) return;
                currentModalBookId = bookId;
                currentModalOrigin = origin;

                resetInlineVideo();

                document.getElementById('modalTitle').innerText = book.title;

                // Update all corresponding fields via class (for both Fresh and History layouts)
                document.querySelectorAll('.modalLexile').forEach(el => el.innerText = `Lexile: ${book.lexile}`);
                document.querySelectorAll('.modalWords').forEach(el => el.innerText = `${book.wordCount} Words`);
                document.querySelectorAll('.modalCategory').forEach(el => el.innerText = book.category);
                document.querySelectorAll('.modalSummary').forEach(el => el.innerText = book.summary);

                const kwHtml = book.keywords.map(kw => `
                <span class="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm">#${kw}</span>
            `).join('');
                document.querySelectorAll('.modalKeywords').forEach(el => el.innerHTML = kwHtml);

                // Update images and specific layout toggles
                const modalVideoThumbnail = document.getElementById('modalVideoThumbnail');
                if (modalVideoThumbnail && book.videoUrl) {
                    modalVideoThumbnail.src = book.videoUrl + "#t=0.001";
                    modalVideoThumbnail.load();
                }
                const inlineVideo = document.getElementById('inlineVideo');
                if (inlineVideo && book.videoUrl) {
                    inlineVideo.src = book.videoUrl;
                    // Pre-load to ensure inline video works
                    inlineVideo.load();
                }

                const videoLabel = document.getElementById('modalVideoLabel');
                if (videoLabel) {
                    if (book.videoUrl && !book.videoUrl.includes('the_silent_stick_watch')) {
                        videoLabel.innerHTML = `<i data-lucide="video" class="w-4 h-4"></i> ${book.title} Video`;
                    } else {
                        videoLabel.innerHTML = `<i data-lucide="video" class="w-4 h-4"></i> Book Trailer`;
                    }
                }

                updateBookmarkIcon(book.isBookmarked);

                // Dynamic Button Logic for Modal (Refined: Use explicit origin)
                const startBtn = document.getElementById('modalStartBtn');

                const isInHistory = isHistoryMode ? mockHistory.some(h => h.id === bookId && !h.isPlaceholder) : false;
                const showContinue = origin === 'history' || (origin === 'library' && isInHistory);

                if (showContinue) {
                    startBtn.innerHTML = `CONTINUE READING <i data-lucide="play" class="w-10 h-10 fill-current ml-2"></i>`;
                    startBtn.className = "w-full py-6 rounded-[28px] font-black text-4xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl bg-[#fbbf24] text-[#0f172a] shadow-amber-900/40";
                    startBtn.onclick = startLearning;
                } else {
                    startBtn.innerHTML = `START READING <i data-lucide="play" class="w-10 h-10 fill-current ml-2"></i>`;
                    startBtn.className = "w-full py-6 rounded-[28px] font-black text-4xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl bg-[#0f172a] text-white hover:bg-[#1e293b] shadow-amber-900/20";
                    startBtn.onclick = () => {
                        if (origin === 'library') {
                            startLearning();
                        } else {
                            const currentHeroId = freshHeroBook ? freshHeroBook.id : 'OG0046';
                            const isCurrentHero = !isHistoryMode && bookId === currentHeroId;

                            if (!isInHistory && !isCurrentHero) {
                                addBookWithAnimation(bookId);
                            } else {
                                startLearning();
                            }
                        }
                    };
                }

                const modal = document.getElementById('bookModal');
                const content = document.getElementById('modalContent');
                modal.classList.remove('hidden');
                // GNB stays at z-500, Modal is at 1100, so it naturally covers GNB
                setTimeout(() => {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }, 10);
                document.body.style.overflow = 'hidden';
                lucide.createIcons();
            }

            function toggleInlineFullscreen(e) {
                e.stopPropagation();
                const container = e.currentTarget.closest('.video-container');
                const video = container ? container.querySelector('video') : null;
                const targetElem = video || container;

                if (targetElem) {
                    if (!document.fullscreenElement) {
                        if (targetElem.requestFullscreen) {
                            targetElem.requestFullscreen().catch(err => {
                                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
                            });
                        } else if (targetElem.webkitRequestFullscreen) {
                            targetElem.webkitRequestFullscreen();
                        } else if (targetElem.msRequestFullscreen) {
                            targetElem.msRequestFullscreen();
                        } else if (targetElem.webkitEnterFullscreen) {
                            targetElem.webkitEnterFullscreen();
                        }
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }
                    }
                }
            }

            function playInlineVideo(e) {
                if (e) e.stopPropagation();
                const wrapper = document.getElementById('inlineVideoThumbnailWrapper');
                const video = document.getElementById('inlineVideo');
                if (wrapper && video) {
                    wrapper.classList.add('hidden');
                    video.classList.remove('hidden');
                    video.play();
                }
            }

            function resetInlineVideo() {
                const wrapper = document.getElementById('inlineVideoThumbnailWrapper');
                const video = document.getElementById('inlineVideo');
                if (wrapper && video) {
                    wrapper.classList.remove('hidden');
                    video.classList.add('hidden');
                    video.pause();
                    video.currentTime = 0;
                }
            }

            function closeModal() {
                resetInlineVideo();
                const modal = document.getElementById('bookModal');
                const content = document.getElementById('modalContent');
                content.classList.remove('scale-100', 'opacity-100');
                content.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300);
                document.body.style.overflow = 'auto';
            }

            function playWhoosh() {
                try {
                    const context = new (window.AudioContext || window.webkitAudioContext)();
                    if (context.state === 'suspended') {
                        context.resume();
                    }
                    const oscillator = context.createOscillator();
                    const gain = context.createGain();
                    const filter = context.createBiquadFilter();

                    oscillator.type = 'triangle';
                    filter.type = 'highpass';
                    filter.Q.value = 10;

                    oscillator.connect(filter);
                    filter.connect(gain);
                    gain.connect(context.destination);

                    const now = context.currentTime;
                    const duration = 1.0;

                    // Frequency sweep: Swish up then down
                    oscillator.frequency.setValueAtTime(400, now);
                    oscillator.frequency.exponentialRampToValueAtTime(1800, now + duration * 0.4);
                    oscillator.frequency.exponentialRampToValueAtTime(600, now + duration);

                    // Filter resonance sweep
                    filter.frequency.setValueAtTime(1000, now);
                    filter.frequency.exponentialRampToValueAtTime(4000, now + duration * 0.5);
                    filter.frequency.exponentialRampToValueAtTime(1500, now + duration);

                    gain.gain.setValueAtTime(0, now);
                    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

                    oscillator.start(now);
                    oscillator.stop(now + duration);
                } catch (e) {
                    console.error("Audio failed:", e);
                }
            }


            function renderReadPhase() {
                const phaseContainer = document.getElementById('phase-read');
                const book = booksData.find(b => b.id === currentModalBookId);
                const filteredScenes = mockScenes.filter(s => s.id === currentModalBookId);

                // Generate SC00 background image URL
                const bgImageUrl = filteredScenes.length > 0 && filteredScenes[0].image_url
                    ? filteredScenes[0].image_url.replace(/SC\d+/i, 'SC00')
                    : book.src;

                if (currentReadStep === 'selection') {
                    phaseContainer.innerHTML = `
                    <div class="relative z-10 flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500 min-h-screen">
                        <!-- Backdrop -->
                        <div class="absolute inset-0">
                            <img src="${bgImageUrl}" class="w-full h-full object-cover opacity-60 brightness-75" onerror="this.src='./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC00_I.png'" />
                            <div class="absolute inset-0 bg-black/40"></div>
                        </div>

                        <!-- Selection Modal -->
                        <div class="relative z-20 w-full max-w-4xl bg-white rounded-[48px] shadow-2xl p-12 flex flex-col items-center gap-12">
                            <div class="flex gap-8 w-full">
                                <button onclick="selectReadingMode('ebook')" id="card-ebook" class="flex-1 group transition-all duration-300">
                                    <div class="aspect-[4/3] bg-slate-50 rounded-[32px] p-8 border-4 transition-all flex flex-col items-center justify-center gap-6 group-hover:bg-sky-50 outline-none
                                        ${selectedReadingMode === 'ebook' ? 'border-sky-400 bg-sky-50 shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'border-slate-100 group-hover:border-sky-200'}">
                                        <div class="w-full h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden relative border-4 border-white px-4">
                                            <img src="./public/UI/Ebook.png" alt="ebook" class="w-full  h-full object-contain" onerror="this.src='https://img.icons8.com/color/144/storybook.png'"/>
                                        </div>
                                        <h3 class="text-3xl font-black text-slate-800 font-fredoka">E-book</h3>
                                    </div>
                                </button>
                                <button onclick="selectReadingMode('interactive')" id="card-interactive" class="flex-1 group transition-all duration-300">
                                    <div class="aspect-[4/3] bg-slate-50 rounded-[32px] p-8 border-4 transition-all flex flex-col items-center justify-center gap-6 group-hover:bg-sky-50 outline-none
                                        ${selectedReadingMode === 'interactive' ? 'border-sky-400 bg-sky-50 shadow-[0_0_30px_rgba(56,189,248,0.3)]' : 'border-slate-100 group-hover:border-sky-200'}">
                                        <div class="w-full h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:rotate-12 transition-transform overflow-hidden relative border-4 border-white px-4">
                                            <img src="./public/UI/Anibook.png" alt="anibook" class="w-full h-full object-contain" onerror="this.src='https://img.icons8.com/color/144/dragon.png'"/>
                                        </div>
                                        <h3 class="text-3xl font-black text-slate-800 font-fredoka">Ani-book</h3>
                                    </div>
                                </button>
                            </div>
                            <button id="modeOkBtn" onclick="goToReadStep('intro')" ${!selectedReadingMode ? 'disabled' : ''} class="w-full h-20 bg-slate-900 text-white rounded-[24px] text-2xl font-black shadow-xl hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none">OK</button>
                            <p class="text-slate-400 font-bold">* You <span class="underline decoration-slate-300">can't change the mode</span> while reading.</p>
                        </div>
                    </div>
                `;
                } else if (currentReadStep === 'intro') {
                    phaseContainer.innerHTML = `
                    <div class="relative z-10 flex-1 flex flex-col animate-in fade-in duration-500 min-h-screen">
                        <div class="absolute inset-0">
                            <img src="${bgImageUrl}" class="w-full h-full object-cover" onerror="this.src='./public/Image/Book/OG0046(The Silent Stick)/OG0046_SC00_I.png'" />
                        </div>
                        <div class="absolute bottom-12 left-12 w-[580px] bg-white/70 backdrop-blur-md rounded-[48px] shadow-2xl p-12 flex flex-col gap-6 border-4 border-white/30 text-left">
                            <div class="flex gap-4">
                                <span class="px-5 py-2 bg-white rounded-2xl text-slate-900 font-black text-xl border-2 border-slate-200 tracking-tight text-center uppercase">${selectedReadingMode}</span>
                                <span class="px-5 py-2 bg-white rounded-2xl text-slate-900 font-black text-xl border-2 border-slate-200 tracking-tight text-center uppercase">LEXILE ${book.lexile}</span>
                            </div>
                            <p class="text-slate-900 text-[2.2rem] font-black leading-tight text-left">
                                "${filteredScenes[0]?.script?.substring(0, 100)}..."
                            </p>
                            <div class="flex flex-col gap-3 mt-2">
                                <span class="px-4 py-1.5 bg-sky-100 text-sky-600 rounded-xl font-black text-sm uppercase self-start">Keywords</span>
                                <p class="text-slate-600 font-black text-xl leading-relaxed text-left">${book.keywords.join(', ')}</p>
                            </div>
                        </div>
                        <button onclick="goToReadStep('viewing')" class="absolute bottom-12 right-12 px-24 h-28 bg-white rounded-[40px] flex items-center justify-center text-slate-900 text-5xl font-black font-fredoka shadow-2xl hover:scale-110 active:scale-95 transition-all border-8 border-white animate-twinkle">START</button>
                    </div>
                `;
                } else {
                    if (currentSceneIndex > maxReachedSceneIndex) {
                        maxReachedSceneIndex = currentSceneIndex;
                    }

                    const scene = filteredScenes[currentSceneIndex];

                    if (!scene.fetchedScript && !scene.isFetching) {
                        scene.isFetching = true;
                        fetchSceneScript(scene).then(text => {
                            scene.fetchedScript = text;
                            scene.isFetching = false;
                            if (currentSceneIndex === filteredScenes.indexOf(scene)) {
                                renderReadPhase();
                                // [NEW] Auto-play narration if on
                                if (isNarrationOn && !isSettingsOpen) {
                                    playFullSceneAudio();
                                }
                            }
                        });
                    }

                    const baseScript = scene.fetchedScript || scene.script;

                    let script = baseScript;
                    if (currentDifficulty === 'Easy') script = `[Easy]\n${baseScript}`;
                    else if (currentDifficulty === 'Difficult') script = `[Difficult]\n${baseScript}`;

                    const cleanScript = script.replace(/[\r\n]/g, ' ').replace(/\\n/g, ' ').replace(/\s\s+/g, ' ');
                    const sentences = cleanScript.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
                    const sentencesHtml = sentences.map((sentence, idx) => `<span onclick="event.stopPropagation(); playSentenceAudio(${idx})" class="cursor-pointer hover:text-orange-300 transition-colors pointer-events-auto inline ${playingSentenceIndex === idx ? 'text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.8)] scale-105' : ''}">${sentence.trim()} </span>`).join('');

                    const dotsHtml = filteredScenes.map((_, index) => `
                    <div class="w-3 h-3 rounded-full transition-all duration-300 ${index === currentSceneIndex ? 'bg-[#FF6B00] scale-125 shadow-[0_0_10px_#FF6B00]' : 'bg-white/40'}"></div>
                `).join('');

                    const positionClass = getTextPositionClass(currentSceneIndex);

                    phaseContainer.innerHTML = `
                    <div class="absolute inset-0 bg-black z-0 flex flex-col overflow-hidden animate-in fade-in duration-500">
                        ${(currentModalBookId === 'OG0021' && selectedReadingMode === 'interactive') ? `
                        <video key="${scene.scene_no}" autoPlay loop muted playsInline preload="auto" class="absolute inset-0 w-full h-full object-cover">
                            <source src="./public/Image/Book/OG0021(Milo and the Lost Color)/ani-book/OG0021_${scene.scene_no}_V.mp4" type="video/mp4">
                        </video>` : `
                        <img src="${(currentModalBookId === 'OG0021') ? `./public/Image/Book/OG0021(Milo and the Lost Color)/e-book/OG0021_${scene.scene_no}_I.png` : scene.image_url}" class="absolute inset-0 w-full h-full object-cover" />
                        `}
                        
                        <!-- Fixed Settings Button (Moved inside stacking context) -->
                        <button id="fixedSettingsBtn" onclick="toggleSettings(); event.stopPropagation();"
                            class="absolute bottom-12 left-12 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white/20 border-2 border-white/20 transition-all pointer-events-auto shadow-xl z-[120] hidden group">
                            <i data-lucide="settings" class="w-10 h-10 group-hover:rotate-45 transition-transform"></i>
                        </button>
                        
                        <div class="absolute left-12 z-[200] transition-all duration-300 ${isGnbVisible ? 'top-[120px]' : 'top-12'}">
                            <button id="readAloudBtn"
                                onclick="event.stopPropagation(); stopAudio(); isReadAloudActive = !isReadAloudActive; renderReadPhase();"
                                class="flex items-center gap-3 px-6 py-4 rounded-3xl font-black text-xl shadow-lg transition-all border-4 ${isReadAloudActive ? 'bg-white text-[#FF6B00] border-white' : 'bg-[#FF6B00] text-white border-orange-400'}">
                                <i data-lucide="mic" class="w-7 h-7"></i>
                                ${isReadAloudActive ? 'Exit Read Aloud' : 'Read Aloud'}
                            </button>
                        </div>

                        <!-- Difficulty Dropdown -->
                        <div class="absolute right-12 transition-all duration-300 z-[120] ${isGnbVisible ? 'top-[120px]' : 'top-12'}">
                            <div class="relative">
                                <button onclick="event.stopPropagation(); toggleDifficulty();"
                                    class="flex items-center gap-3 px-6 py-4 rounded-3xl font-black text-xl shadow-xl transition-all border-4 bg-white/95 text-slate-800 border-white/20 backdrop-blur-md hover:bg-white active:scale-95 pointer-events-auto">
                                    <span class="uppercase tracking-wider font-fredoka">${currentDifficulty}</span>
                                    <i data-lucide="${isDifficultyOpen ? 'chevron-up' : 'chevron-down'}" class="w-6 h-6"></i>
                                </button>
                                ${isDifficultyOpen ? `
                                <div class="absolute top-full mt-3 right-0 w-full bg-white/98 backdrop-blur-xl rounded-[24px] shadow-2xl overflow-hidden border-2 border-slate-100 flex flex-col pointer-events-auto animate-in slide-in-from-top-3 duration-300 z-[121]">
                                    ${['Easy', 'Original', 'Difficult'].filter(d => d !== currentDifficulty).map(d => `
                                        <button onclick="event.stopPropagation(); handleDifficultyChange('${d}');"
                                            class="py-4 px-6 text-xl font-black text-slate-600 hover:bg-slate-50 hover:text-orange-500 transition-all text-left uppercase font-fredoka tracking-wide border-b border-slate-50 last:border-0">
                                            ${d}
                                        </button>
                                    `).join('')}
                                </div>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Shared Text Overlay -->
                        <div class="absolute z-50 p-12 max-w-[1400px] transition-all duration-500 ease-in-out flex items-start gap-8 pointer-events-none ${positionClass.replace('items-start', '').replace('items-end', '')} ${positionClass.includes('left-') ? 'ml-32' : ''} ${positionClass.includes('right-') ? 'mr-32' : ''}">
                            <!-- Play Button (Hidden in Read Aloud) -->
                            ${!isReadAloudActive ? `
                            <button onclick="event.stopPropagation(); if(isSceneAudioPlaying && currentAudio) { currentAudio.pause(); isSceneAudioPlaying=false; renderReadPhase(); } else { playFullSceneAudio(); }" 
                                class="mt-4 w-14 h-14 bg-[#FF6B00] rounded-full shadow-[0_4px_15px_rgba(255,107,0,0.5)] flex items-center justify-center text-white hover:bg-[#FF8500] hover:scale-110 active:scale-95 transition-all pointer-events-auto flex-shrink-0 ${isSceneAudioPlaying ? 'ring-4 ring-orange-300' : ''}">
                                ${isSceneAudioPlaying ? '<div class="flex gap-1"><div class="w-1.5 h-6 bg-white rounded-full"></div><div class="w-1.5 h-6 bg-white rounded-full"></div></div>' : '<i data-lucide="play" class="w-8 h-8 ml-1 fill-current"></i>'}
                            </button>` : ''}

                            <div class="transition-all duration-300 relative ${isReadAloudActive ? 'bg-white/90 p-10 rounded-[40px] shadow-2xl border-4 border-yellow-400' : 'p-0'} ${isTextFading ? 'opacity-0' : 'opacity-100'} pointer-events-auto" style="min-width: ${isReadAloudActive ? 'min(90vw, 600px)' : 'auto'}; max-width: ${isReadAloudActive ? '1000px' : '1400px'};">
                                ${isReadAloudActive ? `
                                <div class="absolute -top-16 left-10 flex items-center gap-4">
                                    <div class="flex bg-slate-200 p-1 rounded-2xl shadow-lg border border-white">
                                        <button onclick="readAloudMode='all'; renderReadPhase();" class="px-6 py-2 rounded-xl font-black transition-all ${readAloudMode === 'all' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}">All</button>
                                        <button onclick="readAloudMode='sentence'; renderReadPhase();" class="px-6 py-2 rounded-xl font-black transition-all ${readAloudMode === 'sentence' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}">Sentence</button>
                                    </div>
                                </div>` : ''}

                                <div id="viewing-script" class="font-black font-fredoka whitespace-normal flex-1 ${isReadAloudActive ? 'text-slate-800 leading-[1.1]' : 'text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]'} ${positionClass.includes('text-right') ? 'text-right' : 'text-left'} ${textSize === 'small' ? 'text-3xl md:text-4xl' : textSize === 'large' ? 'text-6xl md:text-8xl' : 'text-4xl md:text-6xl'}">
                                    ${sentencesHtml}
                                </div>

                                ${isReadAloudActive ? `
                                <div class="absolute -bottom-24 left-0 right-0 flex items-center justify-between bg-white/95 backdrop-blur-md rounded-[30px] p-6 border-4 border-white shadow-2xl">
                                    <div class="flex items-center gap-6">
                                        <button onclick="isRecording=!isRecording; if(!isRecording) hasRecorded=true; renderReadPhase();"
                                            class="w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isRecording ? 'bg-slate-800 text-white animate-pulse' : 'bg-white text-orange-500 border-4 border-orange-400 hover:scale-110'}">
                                            ${isRecording ? '<div class="w-6 h-6 bg-white rounded-sm"></div>' : '<i data-lucide="mic" class="w-8 h-8"></i>'}
                                        </button>
                                        <div class="flex items-end gap-1 h-12">
                                            ${Array(20).fill(0).map((_, i) => `<div class="w-1.5 bg-sky-400 rounded-full transition-all duration-300 ${isRecording ? 'animate-wave' : 'h-2 opacity-30'}" style="animation-delay: ${i * 0.1}s; height: ${isRecording ? (10 + Math.random() * 30) + 'px' : '8px'}"></div>`).join('')}
                                        </div>
                                    </div>
                                    <button ${!hasRecorded || isRecording ? 'disabled' : ''} class="w-14 h-14 rounded-full flex items-center justify-center transition-all ${hasRecorded && !isRecording ? 'bg-orange-500 text-white hover:scale-110 shadow-lg' : 'bg-slate-200 text-slate-400'}">
                                        <i data-lucide="play" class="w-7 h-7 fill-current ml-1"></i>
                                    </button>
                                </div>` : ''}
                            </div>
                        </div>

                        ${isScenePickerOpen ? `<div class="absolute inset-0 z-[60] pointer-events-auto" onclick="isScenePickerOpen = false; renderReadPhase();"></div>` : ''}

                        <button onclick="isScenePickerOpen = true; renderReadPhase();" class="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/20 z-30 hover:scale-105 active:scale-95 transition-all group ${isScenePickerOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}">
                            <div class="text-white group-hover:text-[#FF6B00] transition-colors"><i data-lucide="chevron-up" class="w-6 h-6"></i></div>
                            <div class="flex items-center gap-2">${dotsHtml}</div>
                        </button>

                        <div id="scenePicker" class="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 ease-out z-[100] pb-12 pt-8 ${isScenePickerOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}" onclick="event.stopPropagation()">
                            <div class="px-12">
                                <button onclick="isScenePickerOpen = false; renderReadPhase();" class="w-full flex justify-center mb-6 py-2 group">
                                    <div class="bg-black/80 backdrop-blur-md rounded-full px-8 py-2 border border-white/20 flex items-center gap-4 shadow-lg group-hover:scale-105 transition-all">
                                        <div class="text-white group-hover:text-[#FF6B00] transition-colors"><i data-lucide="chevron-down" class="w-5 h-5"></i></div>
                                        <div class="flex items-center gap-2">
                                            ${filteredScenes.map((_, index) => `<div class="w-2 h-2 rounded-full transition-all duration-300 ${index === currentSceneIndex ? 'bg-[#FF6B00]' : 'bg-white/30'}"></div>`).join('')}
                                        </div>
                                    </div>
                                </button>
                                <div class="flex items-center justify-between mb-6">
                                    <h3 class="text-white/60 font-black text-xl font-fredoka uppercase tracking-widest flex items-center gap-3"><i data-lucide="sparkles" class="w-5 h-5 text-[#FF6B00]"></i>Jump to Scene</h3>
                                    <span class="text-white/30 font-bold font-jua text-lg bg-white/5 px-4 py-1 rounded-full border border-white/5">${currentSceneIndex + 1} / ${filteredScenes.length}</span>
                                </div>
                                <div class="flex gap-4 overflow-x-auto pb-12 pt-4 scrollbar-hide snap-x no-scrollbar">
                                    ${filteredScenes.map((s, index) => {
                        const isUnlocked = index <= maxReachedSceneIndex;
                        const isActive = index === currentSceneIndex;
                        return `<button ${!isUnlocked ? 'disabled' : `onclick="jumpToScene(${index})"`} class="relative flex-shrink-0 w-48 aspect-video rounded-2xl overflow-hidden snap-start transition-all duration-300 ${isActive ? 'ring-4 ring-[#FF6B00] scale-105 shadow-[0_0_30px_rgba(255,107,0,0.3)] z-10' : 'ring-2 ring-white/5 hover:ring-white/20'} ${!isUnlocked ? 'opacity-40 grayscale pointer-events-none' : ''}">
                                            <img src="${(currentModalBookId === 'OG0021') ? `./public/Image/Book/OG0021(Milo and the Lost Color)/e-book/OG0021_${s.scene_no}_I.png` : s.image_url}" class="w-full h-full object-cover" onerror="this.src='https://img.icons8.com/color/144/image.png'" />
                                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                            <div class="absolute bottom-3 left-4 text-white font-black text-sm font-fredoka flex items-center gap-2"><span class="opacity-60 text-[10px] uppercase">SC</span><span>${String(index + 1).padStart(2, '0')}</span></div>
                                            ${!isUnlocked ? `<div class="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]"><div class="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center border border-white/10 shadow-xl"><i data-lucide="lock" class="w-5 h-5 text-white/90"></i></div></div>` : ''}
                                            ${isActive ? `<div class="absolute top-3 right-3 w-4 h-4 bg-[#FF6B00] rounded-full shadow-[0_0_10px_#FF6B00] flex items-center justify-center"><div class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div></div>` : ''}
                                        </button>`;
                    }).join('')}
                                </div>
                            </div>
                        </div>

                        <div class="absolute inset-y-0 inset-x-8 flex items-center justify-between pointer-events-none">
                            <button onclick="prevScene()" class="w-24 h-24 rounded-full bg-white/10 hover:bg-white/20 border-4 border-white/20 flex items-center justify-center text-white pointer-events-auto transition-all active:scale-90 ${currentSceneIndex === 0 ? 'opacity-0 pointer-events-none' : ''}">
                                <i data-lucide="chevron-left" class="w-12 h-12"></i>
                            </button>
                            <button onclick="nextScene()" class="w-24 h-24 rounded-full bg-white hover:scale-110 flex items-center justify-center text-slate-900 shadow-2xl pointer-events-auto transition-all active:scale-90">
                                <i data-lucide="chevron-right" class="w-12 h-12"></i>
                            </button>
                        </div>

                        ${currentSceneIndex === filteredScenes.length - 1 ? `
                        <div id="readTalkingCTA" class="absolute bottom-12 right-12 transition-all duration-500 animate-in slide-in-from-right-10 pointer-events-auto">
                            <button onclick="showReadCompletePraise()"
                                class="bg-sky-400 text-white pl-10 pr-6 py-5 rounded-[40px] flex items-center gap-6 shadow-2xl hover:bg-sky-500 active:scale-95 transition-all group">
                                <span class="text-3xl font-black font-fredoka uppercase tracking-wider">Talking</span>
                                <div class="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center group-hover:translate-x-2 transition-transform">
                                    <i data-lucide="chevron-right" class="w-11 h-11 stroke-[4]"></i>
                                </div>
                            </button>
                        </div>
                        ` : ''}
                    </div>
                `;
                }
                updateFixedSettingsVisibility();
                lucide.createIcons();
            }

            window.prevScene = function () {
                if (currentSceneIndex > 0) {
                    stopAudio();
                    currentSceneIndex--;
                    renderReadPhase();
                }
            };

            window.nextScene = function () {
                const filteredScenes = mockScenes.filter(s => s.id === currentModalBookId);

                if (currentSceneIndex < filteredScenes.length - 1) {
                    currentSceneIndex++;
                    if (currentSceneIndex > maxReachedSceneIndex) {
                        maxReachedSceneIndex = currentSceneIndex;
                    }
                    renderReadPhase();
                    // [NEW] Auto-play next scene if narration is on
                    if (isNarrationOn && !isSettingsOpen) {
                        playFullSceneAudio();
                    }
                } else {
                    showReadCompletePraise();
                }
            };

            window.exitReadPhase = function () { // lint: New function to exit the read phase and return to home.
                stopAudio();
                currentPhase = 'home';
                location.reload(); // Simple way to restore home state in prototype
            };

            function toggleBookmarkModal() {
                const book = booksData.find(b => b.id === currentModalBookId);
                if (book) {
                    book.isBookmarked = !book.isBookmarked;
                    updateBookmarkIcon(book.isBookmarked);
                    renderBooks();
                }
            }

            function updateBookmarkIcon(isBookmarked) {
                const btn = document.getElementById('modalBookmarkBtn');
                const icon = document.getElementById('modalBookmarkIcon');

                // Set base classes
                btn.className = "w-14 h-14 flex items-center justify-center transition-all pointer-events-auto active:scale-95 shadow-xl rounded-full border-4 border-white bg-white";

                if (isBookmarked) {
                    btn.classList.add('text-rose-500');
                    if (icon) icon.classList.add('fill-current');
                } else {
                    btn.classList.add('text-slate-300');
                    if (icon) icon.classList.remove('fill-current');
                }
            }

            function addBookWithAnimation(bookId) {
                const book = booksData.find(b => b.id === bookId);
                if (!book) return;

                closeModal();
                playWhoosh();

                // 1. Create Sucking Overlay & Calculate Target
                // Detect which visual slot is currently the placeholder (dashed border)
                const leftPlaceholder = document.querySelector('#hero-left-slot .border-dashed');
                const centerPlaceholder = document.querySelector('#hero-center-slot .border-dashed');
                const rightPlaceholder = document.querySelector('#hero-right-slot .border-dashed');

                let targetSlotElement = null;
                if (leftPlaceholder) targetSlotElement = document.getElementById('hero-left-slot');
                else if (centerPlaceholder) targetSlotElement = document.getElementById('hero-center-slot');
                else if (rightPlaceholder) targetSlotElement = document.getElementById('hero-right-slot');
                else targetSlotElement = document.getElementById('hero-center-slot'); // Replacement logic

                if (targetSlotElement) {
                    targetLogicalIndex = parseInt(targetSlotElement.getAttribute('data-index') || '2', 10);
                }

                const targetRect = targetSlotElement ? targetSlotElement.getBoundingClientRect() : { left: window.innerWidth * 0.75, top: window.innerHeight * 0.25, width: 0, height: 0 };
                const targetX = targetRect.left + (targetRect.width / 2);
                const targetY = targetRect.top + (targetRect.height / 2);

                const overlay = document.createElement('div');
                overlay.className = 'animate-suck-to-hero rounded-[32px] overflow-hidden shadow-2xl border-4 border-white';
                overlay.style.width = '240px';
                overlay.style.height = '320px';
                overlay.style.setProperty('--target-x', `${targetX}px`);
                overlay.style.setProperty('--target-y', `${targetY}px`);
                overlay.innerHTML = `<img src="${book.src}" class="w-full h-full object-cover">`;
                document.body.appendChild(overlay);

                // 2. Wait for animation
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }

                    if (!isHistoryMode) {
                        // Fresh Mode: Replace the Hero cover
                        freshHeroBook = { ...book };
                        isHeroCTAFlashing = true;
                        renderHero();
                        setTimeout(() => {
                            isHeroCTAFlashing = false;
                            renderHero();
                        }, 5000);
                    } else {
                        // History Mode: Fill the placeholder
                        while (mockHistory.length <= targetLogicalIndex) {
                            mockHistory.push({ id: '', src: '', title: '', phase: '', completedPhases: [], isPlaceholder: true });
                        }
                        mockHistory[targetLogicalIndex] = { ...book, progress: 0, phase: 'voca', completedPhases: [] };
                        renderHero();

                        // stage 2: Trigger smooth reordering after 200ms pause
                        setTimeout(() => {
                            // Final desired order: Left(Milo), Center(Hans), Right(Silent-Stick)
                            mockHistory = [
                                { id: 'CS0003', title: 'Hans in Luck', src: './public/Image/Cover/CS0003(Hans in Luck).png', progress: 0, phase: 'voca', completedPhases: [] },
                                { ...book, progress: 0, phase: 'voca', completedPhases: [] },
                                { id: 'OG0046', title: 'The Silent Stick', src: './public/Image/Cover/OG0046(The Silent Stick).png', progress: 0, phase: 'voca', completedPhases: [] }
                            ];
                            currentHeroIndex = 1; // Center the new book
                            isHeroCTAFlashing = true;
                            renderHero();

                            setTimeout(() => {
                                isHeroCTAFlashing = false;
                                renderHero();
                            }, 5000);
                        }, 200);
                    }
                }, 1000);
            }

            let isGnbVisible = true;
            let gnbTimeout = null;
            let isReadUnlocked = false;
            let isTalkUnlocked = false;
            let isQuizUnlocked = false;

            // Scene Picker Progress
            let maxReachedSceneIndex = 0;
            let isScenePickerOpen = false;

            // Read Aloud State
            let unlockedReadAloudScenes = new Set();
            let unlockReadAloudTimeout = null;

            // --- Word Phase Logic ---
            let isWordCardFlipped = false;
            window.revealedWordIndices = new Set();
            let wordTypingInterval = null;
            const fullSubtitle = "To feel is to touch something. Wow, these feathers feel so soft.";

            function initWordSection() {
                isWordCardFlipped = false;
                window.revealedWordIndices = new Set();
                const book = booksData.find(b => b.id === currentModalBookId) || booksData[0];

                // Resource Path Logic
                let frontImage = "";
                let backVideo = "";
                let subtitle = "";

                let wordLabel = "";
                let bgImageUrl = "";

                window.wordCards = [];
                window.currentWordCardIndex = 0;

                if (book.id === 'OG0021') {
                    const path = "./public/Word/OG0021(Milo and the Lost Color)";
                    window.wordCards = [
                        { frontImage: `${path}/Milo_ask.jpeg`, backVideo: `${path}/Milo_ask.mp4`, wordLabel: "ask", subtitle: "To ask means to say a question when you want to know something!" },
                        { frontImage: `${path}/Milo_feel.jpeg`, backVideo: `${path}/Milo_feel.mp4`, wordLabel: "feel", subtitle: "To feel is to touch something. Wow, this leaf feels so soft." },
                        { frontImage: `${path}/Milo_glow.jpeg`, backVideo: `${path}/Milo_glow.mp4`, wordLabel: "glow", subtitle: "To glow means to shine softly in the dark. I'm glowing!" },
                        { frontImage: `${path}/Milo_mix.jpeg`, backVideo: `${path}/Milo_mix.mp4`, wordLabel: "mix", subtitle: "To mix is to put different things together. Let's mix red and blue!" }
                    ];
                    bgImageUrl = "./public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC00_I.png";
                } else if (book.id === 'CS0003') {
                    const path = "./public/Word/CS0003(Hans in Luck)";
                    window.wordCards = [
                        { frontImage: `${path}/Hans_gold.png`, backVideo: `${path}/Hans_gold.mp4`, wordLabel: "gold", subtitle: "Gold is a shiny, yellow treasure that glitters like a piece of the sun!" },
                        { frontImage: `${path}/Hans_goose.png`, backVideo: `${path}/Hans_goose.mp4`, wordLabel: "goose", subtitle: "A goose is a big, white bird that loves to swim and goes \"Honk, honk!\"" },
                        { frontImage: `${path}/Hans_trade.png`, backVideo: `${path}/Hans_trade.mp4`, wordLabel: "trade", subtitle: "To trade is to give something you have to a friend to get something else in return." },
                        { frontImage: `${path}/Hans_horse.png`, backVideo: `${path}/Hans_horse.mp4`, wordLabel: "horse", subtitle: "A horse is a big, strong animal that you can ride to go for a fast run!" }
                    ];
                    bgImageUrl = "./public/Image/Book/CS0003(Hans in Luck)/CS0003_SC00_I.png";
                }

                document.getElementById('wordBgImage').src = bgImageUrl;
                updateWordCardUI();

                // [TTS Auto-play]
                setTimeout(() => {
                    playWordTTS();
                }, 500);
            }

            // Add separate TTS functions for label and subtitle
            function playWordTTS() {
                const card = window.wordCards[window.currentWordCardIndex];
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(card.wordLabel);
                    utterance.lang = 'en-US';
                    window.speechSynthesis.speak(utterance);
                }
            }

            function playWordSubtitleTTS() {
                const card = window.wordCards[window.currentWordCardIndex];
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(card.subtitle);
                    utterance.lang = 'en-US';
                    window.speechSynthesis.speak(utterance);
                }
            }

            function updateWordCardUI() {
                const card = window.wordCards[window.currentWordCardIndex];
                if (!card) return;

                isWordCardFlipped = false;

                document.getElementById('wordFrontImage').src = card.frontImage;
                document.getElementById('wordBackVideo').src = card.backVideo;
                window.currentWordSubtitle = card.subtitle;
                // Reset UI
                document.getElementById('wordCardInner').classList.remove('rotate-y-180');
                document.getElementById('wordCardInner').classList.add('animate-card-float');
                document.getElementById('wordCardFront').classList.remove('animate-soft-glow');
                document.getElementById('wordFrontText').classList.add('opacity-0', 'invisible');
                document.getElementById('wordFrontText').querySelector('span').innerText = "";
                document.getElementById('wordSubtitleBox').classList.add('opacity-0');
                document.getElementById('wordSubtitleText').innerText = "";

                const video = document.getElementById('wordBackVideo');
                video.pause();
                video.currentTime = 0;

                // Navigation Visibility
                document.getElementById('wordPrevBtn').style.opacity = window.currentWordCardIndex > 0 ? '1' : '0';
                document.getElementById('wordPrevBtn').style.pointerEvents = window.currentWordCardIndex > 0 ? 'auto' : 'none';
                document.getElementById('wordNextBtn').style.opacity = window.currentWordCardIndex < window.wordCards.length - 1 ? '1' : '0';
                document.getElementById('wordNextBtn').style.pointerEvents = window.currentWordCardIndex < window.wordCards.length - 1 ? 'auto' : 'none';

                // Reading CTA Visibility
                const isLast = window.currentWordCardIndex === window.wordCards.length - 1;
                document.getElementById('wordReadingCTA').style.opacity = isLast ? '1' : '0';
                document.getElementById('wordReadingCTA').style.pointerEvents = isLast ? 'auto' : 'none';

                // Dots
                const dotsEl = document.getElementById('wordDots');
                dotsEl.innerHTML = window.wordCards.map((_, i) => `<div class="w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === window.currentWordCardIndex ? 'bg-orange-500 w-8' : 'bg-white/30'}"></div>`).join('');

                // Persistent reveal/TTS logic
                if (window.revealedWordIndices.has(window.currentWordCardIndex)) {
                    document.getElementById('wordFrontText').querySelector('span').innerText = card.wordLabel.toUpperCase();
                    document.getElementById('wordFrontText').classList.remove('opacity-0', 'invisible');
                    document.getElementById('wordCardFront').classList.add('animate-soft-glow');
                } else {
                    // First show (Delayed reveal)
                    setTimeout(() => {
                        if (currentPhase === 'word' && window.wordCards[window.currentWordCardIndex] === card) {
                            document.getElementById('wordFrontText').querySelector('span').innerText = card.wordLabel.toUpperCase();
                            document.getElementById('wordFrontText').classList.remove('opacity-0', 'invisible');
                            document.getElementById('wordCardFront').classList.add('animate-soft-glow');
                            window.revealedWordIndices.add(window.currentWordCardIndex);
                        }
                    }, 3000);
                }

                // Auto-play TTS on card entry
                setTimeout(() => {
                    window.playWordTTS();
                }, 500);

                lucide.createIcons();
            }

            window.playWordTTS = async function () {
                const card = window.wordCards[window.currentWordCardIndex];
                if (!card) return;

                // Determine voiceId based on bookId
                let voiceId = "RgEAVgtchm6TZk0TamG9"; // Default
                if (currentModalBookId === 'OG0021') voiceId = "RgEAVgtchm6TZk0TamG9";
                else if (currentModalBookId === 'CS0003') voiceId = "cVv62OzK6vs7ocpR7lNB";

                // Try ElevenLabs
                const storedKey = localStorage.getItem('elevenlabs_api_key');
                const apiKey = (storedKey && storedKey.trim().length > 0) ? storedKey : "";

                /* ElevenLabs Disabled - [Commented out to stop automatic API calls]
                if (apiKey) {
                    try {
                        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
                            body: JSON.stringify({
                                text: card.wordLabel,
                                model_id: "eleven_multilingual_v2",
                                voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                            })
                        });
                        if (response.ok) {
                            const blob = await response.blob();
                            const url = URL.createObjectURL(blob);
                            if (window.currentAudio) window.currentAudio.pause();
                            window.currentAudio = new Audio(url);
                            window.currentAudio.play();
                            return;
                        } else {
                            const errTxt = await response.text();
                            console.error("ElevenLabs API Error:", errTxt);
                        }
                    } catch (e) { console.error("ElevenLabs Fetch Error:", e); }
                }
                */

                // Fallback to Browser
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(card.wordLabel);
                    utterance.lang = 'en-US';
                    utterance.rate = 1.0;
                    window.speechSynthesis.speak(utterance);
                }
            }

            window.playWordSubtitleTTS = async function () {
                const card = window.wordCards[window.currentWordCardIndex];
                if (!card) return;

                // Determine voiceId based on bookId
                let voiceId = "RgEAVgtchm6TZk0TamG9"; // Default
                if (currentModalBookId === 'OG0021') voiceId = "RgEAVgtchm6TZk0TamG9";
                else if (currentModalBookId === 'CS0003') voiceId = "cVv62OzK6vs7ocpR7lNB";

                // Try ElevenLabs
                const storedKey = localStorage.getItem('elevenlabs_api_key');
                const apiKey = (storedKey && storedKey.trim().length > 0) ? storedKey : "";

                /* ElevenLabs Disabled - [Commented out to stop automatic API calls]
                if (apiKey) {
                    try {
                        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey },
                            body: JSON.stringify({
                                text: card.subtitle,
                                model_id: "eleven_multilingual_v2",
                                voice_settings: { stability: 0.5, similarity_boost: 0.75 }
                            })
                        });
                        if (response.ok) {
                            const blob = await response.blob();
                            const url = URL.createObjectURL(blob);
                            if (window.currentAudio) window.currentAudio.pause();
                            window.currentAudio = new Audio(url);
                            window.currentAudio.play();
                            return;
                        } else {
                            const errTxt = await response.text();
                            console.error("ElevenLabs API Subtitle Error:", errTxt);
                        }
                    } catch (e) { console.error("ElevenLabs Subtitle Fetch Error:", e); }
                }
                */

                // Fallback to Browser
                if (card && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(card.subtitle);
                    utterance.lang = 'en-US';
                    utterance.rate = 1.0;
                    window.speechSynthesis.speak(utterance);
                }
            }

            window.nextWordCard = function (e) {
                if (e) e.stopPropagation();
                if (window.currentWordCardIndex < window.wordCards.length - 1) {
                    window.currentWordCardIndex++;
                    updateWordCardUI();
                }
            }

            window.prevWordCard = function (e) {
                if (e) e.stopPropagation();
                if (window.currentWordCardIndex > 0) {
                    window.currentWordCardIndex--;
                    updateWordCardUI();
                }
            }

            function flipWordCard() {
                const inner = document.getElementById('wordCardInner');
                const video = document.getElementById('wordBackVideo');

                isWordCardFlipped = !isWordCardFlipped;

                if (isWordCardFlipped) {
                    // FRONT TO BACK
                    document.getElementById('wordCardInner').classList.remove('animate-card-float');
                    document.getElementById('wordCardFront').classList.remove('animate-soft-glow');
                    inner.classList.add('rotate-y-180');
                    video.play();

                    // [TTS Auto-play Restored]
                    if (window.playWordSubtitleTTS) playWordSubtitleTTS();

                    // Show Subtitle and Start Typing
                    setTimeout(() => {
                        if (isWordCardFlipped) {
                            document.getElementById('wordSubtitleBox').classList.remove('opacity-0');
                            startWordTyping();
                        }
                    }, 500);
                } else {
                    // BACK TO FRONT
                    inner.classList.remove('rotate-y-180');
                    inner.classList.add('animate-card-float');
                    video.pause();
                    document.getElementById('wordSubtitleBox').classList.add('opacity-0');

                    // Re-enable intro animations and TTS
                    document.getElementById('wordCardFront').classList.add('animate-soft-glow');
                    if (window.playWordTTS) window.playWordTTS();

                    const card = window.wordCards[window.currentWordCardIndex];
                    if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(card.wordLabel);
                        utterance.lang = 'en-US';
                        utterance.rate = 1.0;
                        window.speechSynthesis.speak(utterance);
                    }
                }
            }

            function startWordTyping() {
                let index = 0;
                const textEl = document.getElementById('wordSubtitleText');
                const subtitle = window.currentWordSubtitle || fullSubtitle;
                clearInterval(wordTypingInterval);

                wordTypingInterval = setInterval(() => {
                    if (index <= subtitle.length) {
                        textEl.innerText = subtitle.slice(0, index);
                        index++;
                    } else {
                        clearInterval(wordTypingInterval);
                    }
                }, 50);
            }

            function unlockReadPhase() {
                isReadUnlocked = true;
                currentReadStep = 'selection';
                setPhase('read');
            }

            function startLearning() {
                closeModal();
                const book = booksData.find(b => b.id === currentModalBookId) || booksData[0];

                // [IMPORTANT] Ensure title is updated immediately!
                document.getElementById('studyBookTitle').innerText = book.title;

                // Show the overlay first
                const overlay = document.getElementById('learningModeOverlay');
                overlay.classList.remove('hidden');
                setTimeout(() => {
                    overlay.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden';

                // Check if current book has Word resources
                const hasWordResources = ['OG0021', 'CS0003'].includes(book.id);

                // Reset reading mode selection every time we start fresh learning
                selectedReadingMode = null;

                // Force Start at Vocabulary Phase if resources exist
                if (hasWordResources) {
                    isReadUnlocked = true; // [UNLOCK READ BY DEFAULT]
                    setPhase('voca');
                    initWordSection();
                    showGnb();
                    startGnbTimer();

                    // Update Read Tab Visual in GNB
                    const readTab = document.getElementById('tab-read');
                    if (readTab) {
                        readTab.classList.remove('opacity-50', 'cursor-not-allowed');
                    }
                    return;
                }

                // Otherwise skip to Read
                const relevantScenes = scenesData.filter(s => s.book_id === book.id);
                if (relevantScenes.length > 0) {
                    isReadUnlocked = true;
                    setPhase('read');
                    renderReadPhase();
                    showGnb();
                    startGnbTimer();
                    return;
                }


            }

            function exitLearningMode() {
                stopAudio(); // Ensure scene audio is stopped
                const wordVideo = document.getElementById('wordBackVideo');
                if (wordVideo) wordVideo.pause();
                document.getElementById('learningModeOverlay').classList.remove('active');
                setTimeout(() => {
                    document.getElementById('learningModeOverlay').classList.add('hidden');
                    document.body.style.overflow = 'auto';
                    resetLearningMode();
                }, 600);
            }

            function resetLearningMode() {
                isReadUnlocked = false;
                currentPhase = 'voca';
                document.getElementById('tab-read').classList.add('opacity-50', 'cursor-not-allowed');
                document.getElementById('tab-read').innerHTML = '<i data-lucide="book-open" class="w-4 h-4"></i> Reading <i data-lucide="lock" class="w-3 h-3"> </i>';
                setPhase('voca');
                lucide.createIcons();
            }

            function showGnb() {
                document.getElementById('studyGnb').style.transform = 'translateY(0)';
                document.getElementById('gnbHandleIcon').setAttribute('data-lucide', 'chevron-up');
                // Show GNB background overlay if it was closed
                isGnbVisible = true;
                lucide.createIcons();
            }

            function hideGnb() {
                document.getElementById('studyGnb').style.transform = 'translateY(-100%)';
                document.getElementById('gnbHandleIcon').setAttribute('data-lucide', 'chevron-down');
                isGnbVisible = false;
                lucide.createIcons();
            }

            function toggleGnb(forceToggle = false) {
                if (isGnbVisible) hideGnb();
                else showGnb();
            }

            function startGnbTimer() {
                clearTimeout(gnbTimeout);
                gnbTimeout = setTimeout(() => {
                    if (currentPhase === 'read' || (currentPhase === 'voca' && isWordCardFlipped)) {
                        hideGnb();
                    }
                }, 3000);
            }

            function handleMainClick() {
                // No automatic toggle on background click as requested
            }

            function setPhase(phase) {
                currentPhase = phase;
                document.getElementById('phase-voca')?.classList.add('hidden');
                document.getElementById('phase-read')?.classList.add('hidden');
                document.getElementById('phase-talk')?.classList.add('hidden');
                document.getElementById('phase-quiz')?.classList.add('hidden');
                document.getElementById(`phase-${phase}`)?.classList.remove('hidden');

                if (phase === 'read') {
                    renderReadPhase();
                }

                // Update Tabs
                const tabs = ['voca', 'read', 'talk', 'quiz'];
                tabs.forEach(t => {
                    const btn = document.getElementById(`tab-${t}`);
                    if (btn) {
                        // Check if this tab is unlocked
                        const isUnlocked = (t === 'voca') || (t === 'read') || (t === 'talk') || (t === 'quiz');

                        // Reset all tabs to default state
                        btn.classList.remove('bg-white', 'text-orange-500', 'shadow-sm', 'opacity-50', 'cursor-not-allowed', 'text-slate-400', 'text-slate-700');

                        if (isUnlocked) {
                            // Unlocked Style (Inactive but clickable)
                            btn.classList.add('text-slate-700');
                            btn.classList.remove('opacity-50', 'cursor-not-allowed');
                            btn.removeAttribute('disabled');

                            // Remove lock icon if present
                            const lockIcon = btn.querySelector('[data-lucide="lock"]');
                            if (lockIcon) lockIcon.remove();
                        } else {
                            // Locked Style
                            btn.classList.add('text-slate-400', 'opacity-50', 'cursor-not-allowed');
                            btn.setAttribute('disabled', 'true');
                        }

                        if (t === phase && isUnlocked) {
                            // Highlight active phase in Orange
                            btn.classList.add('bg-white', 'text-orange-500', 'shadow-sm');
                            btn.classList.remove('text-slate-700');
                        }
                    }
                });

                // Toggle Fixed Settings Button visibility
                updateFixedSettingsVisibility(phase);

                if (phase === 'read') {
                    document.getElementById('studyVideo').pause();
                }
            }

            // [NEW] Helper to manage settings button visibility
            function updateFixedSettingsVisibility(phase = currentPhase) {
                const fixedSettingsBtn = document.getElementById('fixedSettingsBtn');
                if (!fixedSettingsBtn) return;

                const filteredScenes = mockScenes.filter(s => s.id === currentModalBookId);
                const currentScene = filteredScenes[currentSceneIndex];

                // Condition: Read Phase, Viewing Step (Show for all scenes)
                const isVisible = (phase === 'read') &&
                    (currentReadStep === 'viewing') &&
                    (currentScene);

                if (isVisible) {
                    fixedSettingsBtn.classList.remove('hidden');
                } else {
                    fixedSettingsBtn.classList.add('hidden');
                }
            }

            // Video Logic
            function togglePlay() {
                const video = document.getElementById('studyVideo');
                const centralIcon = document.getElementById('centralPlayIcon');
                const playIcon = document.getElementById('playIcon');
                const overlay = document.getElementById('videoCentralOverlay');

                if (video.paused) {
                    video.play();
                    centralIcon.setAttribute('data-lucide', 'pause');
                    playIcon.setAttribute('data-lucide', 'pause');
                    overlay.classList.add('opacity-0', 'group-hover:opacity-100');
                    hideGnb();
                } else {
                    video.pause();
                    centralIcon.setAttribute('data-lucide', 'play');
                    playIcon.setAttribute('data-lucide', 'play');
                    overlay.classList.remove('opacity-0', 'group-hover:opacity-100');
                    showGnb();
                }
                lucide.createIcons();
            }

            function skipVideo(seconds) {
                const video = document.getElementById('studyVideo');
                video.currentTime += seconds;
            }

            function seekVideo(e) {
                video = document.getElementById('studyVideo');
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            }

            function updateProgressBar() {
                const video = document.getElementById('studyVideo');
                const progress = (video.currentTime / video.duration) * 100;
                document.getElementById('videoProgress').style.width = `${progress}%`;
            }

            function cyclePlaybackRate() {
                const video = document.getElementById('studyVideo');
                const rates = [1, 1.5, 2, 0.5];
                let currentIdx = rates.indexOf(video.playbackRate);
                let nextIdx = (currentIdx + 1) % rates.length;
                video.playbackRate = rates[nextIdx];
                document.getElementById('playbackRateText').innerText = `${rates[nextIdx]}x`;
            }

            const mockBookMeta = {
                title: "The Silent Stick",
                level: 4,
                lexile: "300~350",
                word_count: 140,
                summary: "The frozen lake lay still under the winter moon. A lone boy discovered a mysterious staff that hummed with a quiet power... Join him as he uncovers the secrets of the enchanted forest.",
                keywords: ["frozen lake", "mysterious staff", "enchanted forest", "adventure"],
                cover_url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
            };

            const mockScenes = [
                // OG0046
                { id: 'OG0046', scene_no: 'SC01', script: "The frozen lake lay still, \na big area of gray ice \nbeneath a heavy winter sky.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC01_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC02', script: "He hit the puck with force, \nbut his old stick broke \nsuddenly upon impact.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC02_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC03', script: "Two pieces of wood lay on the ice, \nshowing the end of his practice.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC03_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC04', script: "Ren worked for hours, \ncutting the skin to show \nthe hard wood under.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC04_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC05', script: "When he tested it, \nthe puck flew in strange circles \ndue to the wood’s natural shape.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC05_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC06', script: "Jax glanced at Ren’s rough branch \nand offered a cold smile, saying nothing.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC06_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC07', script: "Jax controlled the ice, \nhis speed pushing Ren \nback toward his own goal.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC07_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC08', script: "The puck turned around the confused player, \ngoing quietly into the net as the whistle blew.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC08_I.png', audio_url: '' },
                { id: 'OG0046', scene_no: 'SC09', script: "Ren smiled at his rough stick \nand skated away silently.", image_url: './public/Image/Book/OG0046(The Silent Stick)/OG0046_SC09_I.png', audio_url: '' },

                // OG0021
                { id: 'OG0021', scene_no: 'SC01', script: "Milo is a little chameleon. He loves to change colors—green, blue, red!", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC01_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC02', script: "But one morning, he wakes up gray. “Oh no! Where is my color?” Milo says. He looks at his tail. It’s still gray. He feels sad and shy.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC02_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC03', script: "Milo walks into the forest. He sees a yellow butterfly. “Can I borrow your color?” he asks.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC03_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC04', script: "The butterfly smiles. “My color is for flying!” Milo smiles back. “Then I will keep looking.” He waves goodbye.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC04_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC05', script: "He meets a red flower. “Can I have your color?” Milo asks. The flower says, “My color helps the bees.”", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC05_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC06', script: "Milo is sad. “Everyone has their own color.” He sits by a blue pond. A small tear drops into the water.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC06_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC07', script: "The pond shines! Milo sees many colors in the water—red, yellow, blue, green. They mix and dance like rainbows.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC07_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC08', script: "Milo laughs. “Maybe my color is inside me!” He takes a deep breath and closes his eyes. His body starts to glow.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC08_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC09', script: "Green! Then blue! Then red again! Milo’s colors come back, brighter than before. He feels happy and warm.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC09_I.png', audio_url: '' },
                { id: 'OG0021', scene_no: 'SC10', script: "Milo runs home. He looks in the mirror. “I found my color—me!” he says proudly.", image_url: './public/Image/Book/OG0021(Milo and the Lost Color)/OG0021_SC10_I.png', audio_url: '' },

                // OG0050
                { id: 'OG0050', scene_no: 'SC01', script: "On the quiet planet of Tiny Rock, two friends named Podo and Didi spent their evenings watching the universe. One of the two friends, Didi was always searching for excitement.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC01_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC02', script: "Suddenly, a breathtaking rainbow cloud floated near their rock. It was a swirling cloud of stardust, glowing with vibrant shades of violet, orange, and emerald green.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC02_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC03', script: "\"It is the most beautiful thing I have ever seen!\" exclaimed Didi. \"I must have it. I will capture a piece to keep on my shelf.\"", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC03_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC04', script: "Podo frowned gently. \"I do not think you can own a cloud, Didi,\" he warned. \"Its beauty comes from its movement.\"", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC04_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC05', script: "Ignoring his friend, Didi grabbed a net and caught a portion of the cloud into a pristine crystal box. “Got it!” he shouted triumphantly.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC05_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC06', script: "He rushed inside to display his treasure. But as he set the box down, the vibrant light began to dim. The swirling colors stopped moving.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC06_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC07', script: "The captured cloud transformed before their eyes. It became a stagnant, dark gray clump of moisture, looking like a dirty raincloud.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC07_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC08', script: "\"This is terrible,\" Didi groaned, tapping the glass. \"It looks like smoke. Where did the magic go?\"", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC08_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC09', script: "\"The magic was in the freedom,\" Podo said wisely. \"By trapping it, you extinguished its light. It is suffocating in there.\"", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC09_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC10', script: "Didi realized his mistake. He looked at the dull box and then at the vast, open sky. He picked up the box and ran back outside.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC10_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC11', script: "With a hopeful heart, Didi unlatched the crystal box. The gray wisp floated tentatively into the void.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC11_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC12', script: "Instantly, the vacuum of space revitalized it. The gray turned back into brilliant violet and emerald. It joined the rest of the cloud, swirling happily.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC12_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC13', script: "\"It is a masterpiece again,\" Didi whispered, watching it drift away. \"Indeed,\" agreed Podo. \"And now we can enjoy it together, right where it belongs.\"", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC13_I.png', audio_url: '' },
                { id: 'OG0050', scene_no: 'SC14', script: "They watched the rainbow cloud fly free and smiled, knowing that some treasures are best enjoyed when they are left to be themselves.", image_url: './public/Image/Book/OG0050(The Rainbow Cloud in the Box)/OG0050_SC14_I.png', audio_url: '' },

                // CS0003
                { id: 'CS0003', scene_no: 'SC01', script: "Hans works hard for seven years. His master gives him a big piece of gold as pay. Hans puts the gold on his shoulder and starts to walk home to his mother.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC01_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC02', script: "The gold is very heavy. Hans sees a man on a horse. \"Riding looks easy,\" says Hans.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC02_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC03', script: "The man stops and says, \"Give me your gold, and I will give you my horse.\" Hans is happy to trade.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC03_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC04', script: "He gets on the horse, but the horse runs too fast. He falls to the ground. A farmer with a cow helps him stand up.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC04_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC05', script: "\"Horses are dangerous,\" says Hans. \"I like your cow. It gives milk every day.\" The farmer smiles and says, \"I will trade my cow for your horse.\" Hans agrees right away.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC05_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC06', script: "Hans walks with the cow. He feels very thirsty and tries to get milk. But no milk comes out. The cow kicks Hans, and he falls down.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC06_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC07', script: "A man with a pig sees him. \"That cow is too old to give milk,\" says the man. \"Your pig looks young and good,\" says Hans. \"I can trade my pig for the cow,\" says the man. Hans likes the idea.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC07_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC08', script: "Later, Hans meets a boy with a white goose. Hans tells the boy about his lucky trades. The boy says, \"My goose is very heavy. The meat will be good.\" \"My pig is good too,\" says Hans.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC08_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC09', script: "Then the boy says, \"Is that pig yours? A rich man is looking for his lost pig. Someone stole it. You may be in trouble.\" Hans feels afraid. \"Please help me,\" he says. \"Take this pig and give me your goose.\"", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC09_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC10', script: "Hans thinks he is very lucky with the big goose. In the next village, he sees a man with a stone. The man sings while he works. \"You look happy,\" says Hans.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC10_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC11', script: "The man says, \"My work brings me money. You can do this work too.\" \"How can I do that?\" asks Hans. \"You just need a stone,\" says the man. \"Take this goose and give me your stone,\" says Hans.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC11_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC12', script: "\"Now I will be rich,\" Hans thinks. But the stone is very heavy. Soon Hans feels tired and hungry.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC12_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC13', script: "He stops at a well to drink water. He puts the stone on the edge. By accident, he pushes the stone. Splash! It falls into the deep water.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC13_I.png', audio_url: '' },
                { id: 'CS0003', scene_no: 'SC14', script: "He jumps for joy. \"Thank my lucky stars!\" he shouts. \"The heavy stone is gone. I am free from this heavy load.\" \nNow he has no gold, no horse, and no stone. But he is the happiest man in the world.", image_url: './public/Image/Book/CS0003(Hans in Luck)/CS0003_SC14_I.png', audio_url: '' }

            ];


            // [NEW] Helper for text positioning
            function getTextPositionClass(index) {
                switch (index) {
                    case 0: // SC01
                        return "top-8 left-8 md:top-16 md:left-16 text-left items-start";
                    case 1: // SC02
                    case 2: // SC03
                    case 4: // SC05
                        return "top-8 right-8 md:top-16 md:right-16 text-left items-start";
                    case 3: // SC04
                    case 9: // SC10
                    case 12: // SC13
                        return "bottom-24 right-8 md:bottom-32 md:right-16 text-left items-start";
                    case 5: // SC06
                    case 6: // SC07
                    case 7: // SC08
                        return "bottom-24 left-8 md:bottom-32 md:left-16 text-left items-start";
                    case 8: // SC09
                    case 11: // SC12
                        return "top-1/2 -translate-y-1/2 left-24 md:left-32 text-left items-start";
                    case 10: // SC11
                    case 13: // SC14
                        return "top-8 left-8 md:top-16 md:left-16 text-left items-start";
                    default:
                        return "top-8 left-8 md:top-16 md:left-16 text-left items-start";
                }
            }

            // [NEW] Async Text Fetcher
            let currentAudio = null;
            let playingSentenceIndex = null;
            let isSceneAudioPlaying = false;

            function playFullSceneAudio() {
                const scenes = mockScenes.filter(s => s.id === currentModalBookId);
                const scene = scenes[currentSceneIndex];
                if (!scene) return;

                let audioUrl = scene.full_audio;
                // Special case for Milo book (OG0021)
                if (currentModalBookId === 'OG0021') {
                    const sceneNum = String(currentSceneIndex + 1).padStart(2, '0');
                    // Pattern: ./public/Audio/OG0021(Milo and the Lost Color)/Scene/OG0021_SC01_N_A.mp3
                    audioUrl = `./public/Audio/OG0021(Milo and the Lost Color)/Scene/OG0021_SC${sceneNum}_N_A.mp3`;
                }

                if (!audioUrl) return;

                if (unlockReadAloudTimeout) clearTimeout(unlockReadAloudTimeout);

                if (currentAudio) currentAudio.pause();

                currentAudio = new Audio(audioUrl);

                // [NEW] Apply narration speed
                const playbackRate = narrationSpeed === 'slow' ? 0.75 : narrationSpeed === 'fast' ? 1.5 : 1.0;
                currentAudio.playbackRate = playbackRate;

                // [NEW] Unlock Read Aloud
                const currentIdx = currentSceneIndex;
                if (!unlockedReadAloudScenes.has(currentIdx)) {
                    currentAudio.addEventListener('loadedmetadata', () => {
                        const fastDurationMs = (currentAudio.duration / 1.5) * 1000;
                        unlockReadAloudTimeout = setTimeout(() => {
                            unlockedReadAloudScenes.add(currentIdx);
                            if (currentSceneIndex === currentIdx) {
                                renderReadPhase(); // Refresh UI to activate button
                            }
                        }, fastDurationMs);
                    });
                }

                isSceneAudioPlaying = true;
                playingSentenceIndex = null;

                currentAudio.play().catch(err => console.error("Audio play failed:", err));
                currentAudio.onended = () => {
                    isSceneAudioPlaying = false;
                    unlockedReadAloudScenes.add(currentSceneIndex);

                    // [NEW] Auto-advance if page turn is on
                    if (isPageTurnOn) {
                        const filteredScenes = mockScenes.filter(s => s.id === currentModalBookId);
                        if (currentSceneIndex < filteredScenes.length - 1) {
                            nextScene();
                        } else {
                            showReadCompletePraise();
                        }
                    } else {
                        renderReadPhase();
                    }
                };
                renderReadPhase();
            }

            function playSentenceAudio(index) {
                const scenes = mockScenes.filter(s => s.id === currentModalBookId);
                const scene = scenes[currentSceneIndex];
                if (!scene) return;

                let audioUrl = scene.full_audio;
                // Special case for Milo book (OG0021)
                if (currentModalBookId === 'OG0021') {
                    const sceneNum = String(currentSceneIndex + 1).padStart(2, '0');
                    const sentenceNum = String(index + 1).padStart(2, '0');
                    // Pattern: ./public/Audio/OG0021(Milo and the Lost Color)/Sentence/OG0021_SC01_ST01_N_A.mp3
                    audioUrl = `./public/Audio/OG0021(Milo and the Lost Color)/Sentence/OG0021_SC${sceneNum}_ST${sentenceNum}_N_A.mp3`;
                }

                if (!audioUrl) return;

                if (currentAudio) currentAudio.pause();

                currentAudio = new Audio(audioUrl);

                // [NEW] Apply narration speed
                const playbackRate = narrationSpeed === 'slow' ? 0.75 : narrationSpeed === 'fast' ? 1.5 : 1.0;
                currentAudio.playbackRate = playbackRate;

                playingSentenceIndex = index;
                isSceneAudioPlaying = false;

                currentAudio.play().catch(err => console.error("Sentence audio play failed:", err));
                currentAudio.onended = () => {
                    playingSentenceIndex = null;
                    renderReadPhase();
                };
                renderReadPhase();
            }

            function stopAudio() {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio = null;
                }
                playingSentenceIndex = null;
                isSceneAudioPlaying = false;
            }

            async function fetchSceneScript(scene) {
                if (scene.fetchedScript) return scene.fetchedScript;

                // Derive path: ./public/Image/.../SC01.png -> ./public/Data/.../SC01.txt
                // Note: prototype.html is at root, so ./public is correct.
                const textUrl = scene.image_url.replace('/Image/', '/Data/').replace('.png', '.txt').replace('.jpg', '.txt');
                try {
                    const res = await fetch(textUrl);
                    if (res.ok) {
                        const text = await res.text();
                        if (text && !text.includes('<!DOCTYPE html>')) {
                            scene.fetchedScript = text;
                            return text;
                        }
                    }
                } catch (e) {
                    console.error("Fet            d", e);
                }
                return scene.script; // Fallback
            }

            let currentReadStep = 'selection';

            function goToReadStep(step) {
                currentReadStep = step;
                renderReadPhase();
            }

            function selectReadingMode(mode) {
                selectedReadingMode = mode;
                // [NEW] Default settings based on mode
                if (mode === 'ebook') {
                    isNarrationOn = false;
                    isPageTurnOn = false;
                } else if (mode === 'interactive') {
                    isNarrationOn = true;
                    isPageTurnOn = true;
                }
                updateSettingsUI();
                renderReadPhase();
            }

            // [NEW] Read Complete Praise Overlay
            function showReadCompletePraise() {
                const overlay = document.createElement('div');
                overlay.id = 'readCompletePraise';
                overlay.className = 'fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-500 cursor-pointer';
                overlay.onclick = () => {
                    overlay.remove();
                    // Direct transition to Talking phase
                    setPhase('talk');
                };
                overlay.innerHTML = `
                <div class="relative flex flex-col items-center justify-center animate-in zoom-in-50 duration-500">
                    <!-- Glow Effect -->
                    <div class="absolute inset-0 bg-yellow-400/30 blur-[100px] rounded-full"></div>
                    
                    <!-- Praise Badge Image -->
                    <img src="./public/UI/praise_badge.png" alt="Great! Let's speak" class="w-[600px] h-auto object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-300" />
                    
                    <p class="mt-8 text-white text-2xl font-fredoka font-bold animate-pulse">Click to continue</p>
                </div>
            `;
                document.body.appendChild(overlay);
            }


            function goToReadStep(step) {
                currentReadStep = step;
                renderReadPhase();
            }


            function prevScene() {
                if (currentSceneIndex > 0) {
                    currentSceneIndex--;
                    isScenePickerOpen = false;
                    renderReadPhase();
                }
            }

            function toggleScenePicker() {
                isScenePickerOpen = !isScenePickerOpen;
                renderReadPhase();
            }

            function jumpToScene(index) {
                if (index <= maxReachedSceneIndex) {
                    stopAudio();
                    currentSceneIndex = index;
                    isScenePickerOpen = false;
                    renderReadPhase();
                }
            }

            function onVideoEnded() {
                // isReadUnlocked = true; // Don't unlock automatically yet
                document.getElementById('nextPhaseContainer').classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
                document.getElementById('nextPhaseContainer').innerHTML = `
                <button onclick="isReadUnlocked=true; currentReadStep='selection'; setPhase('read'); renderReadPhase();"
                    class="px-12 py-6 bg-white rounded-full font-black text-slate-900 text-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all flex items-center gap-4 border-8 border-white group">
                    <div class="flex flex-col items-start leading-none">
                        <span class="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Great Watching!</span>
                        <span class="font-fredoka uppercase text-4xl">Read Next</span>
                    </div>
                    <div class="w-14 h-14 bg-[#FF6B00] rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg">
                        <i data-lucide="chevron-right" class="w-10 h-10"></i>
                    </div>
                </button>
            `;
                lucide.createIcons();

                // Reset icons
                document.getElementById('centralPlayIcon').setAttribute('data-lucide', 'play');
                document.getElementById('playIcon').setAttribute('data-lucide', 'play');
                lucide.createIcons();
            }


            const bookContainer = document.getElementById('bookContainer');
            const scrollLeftBtn = document.getElementById('scrollLeftBtn');

            function scrollContainer(amount) {
                bookContainer.scrollBy({
                    left: amount,
                    behavior: 'smooth'
                });
            }

            bookContainer.addEventListener('scroll', () => {
                if (bookContainer.scrollLeft > 10) {
                    scrollLeftBtn.classList.remove('invisible', 'opacity-0');
                    scrollLeftBtn.classList.add('opacity-100');
                } else {
                    scrollLeftBtn.classList.add('invisible', 'opacity-0');
                    scrollLeftBtn.classList.remove('opacity-100');
                }
            });

            // Swipe / Drag Scroll Logic
            let isDown = false;
            let startX;
            let scrollLeftPos;

            bookContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                bookContainer.classList.remove('scroll-smooth');
                startX = e.pageX - bookContainer.offsetLeft;
                scrollLeftPos = bookContainer.scrollLeft;
            });

            bookContainer.addEventListener('mouseleave', () => {
                isDown = false;
            });

            bookContainer.addEventListener('mouseup', () => {
                isDown = false;
                bookContainer.classList.add('scroll-smooth');
            });

            bookContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - bookContainer.offsetLeft;
                const walk = (x - startX) * 2;
                bookContainer.scrollLeft = scrollLeftPos - walk;
            });

            window.toggleDifficulty = function () {
                isDifficultyOpen = !isDifficultyOpen;
                renderReadPhase();
            };

            window.handleDifficultyChange = function (newDiff) {
                isTextFading = true;
                isDifficultyOpen = false;
                renderReadPhase();

                setTimeout(() => {
                    currentDifficulty = newDiff;
                    isTextFading = false;
                    renderReadPhase();
                }, 300);
            };

            window.toggleSettings = function () {
                isSettingsOpen = !isSettingsOpen;
                const overlay = document.getElementById('settingsOverlay');
                if (isSettingsOpen) {
                    overlay.classList.remove('hidden');
                    updateSettingsUI();
                } else {
                    overlay.classList.add('hidden');
                }
                lucide.createIcons();
            };

            function setNarration(val) {
                isNarrationOn = val;
                if (isNarrationOn) {
                    isPageTurnOn = true;
                } else {
                    stopAudio();
                    isPageTurnOn = false;
                }
                updateSettingsUI();
                renderReadPhase(); // Ensure UI updates if needed
            }

            function setPageTurn(val) {
                if (!isNarrationOn) return;
                isPageTurnOn = val;
                updateSettingsUI();
            }

            function setNarrationSpeed(speed) {
                if (!isNarrationOn) return;
                narrationSpeed = speed;
                updateSettingsUI();
            }

            function setTextSize(size) {
                textSize = size;
                updateSettingsUI();

                // Apply text size real-time
                const scriptEl = document.getElementById('viewing-script');
                if (scriptEl) {
                    scriptEl.classList.remove('text-3xl', 'text-5xl', 'text-7xl');
                    if (size === 'small') scriptEl.classList.add('text-3xl');
                    else if (size === 'medium') scriptEl.classList.add('text-5xl');
                    else if (size === 'large') scriptEl.classList.add('text-7xl');
                }
            }

            function updateSettingsUI() {
                // Update Toggles
                const narrBtn = document.getElementById('toggle-narration');
                const pageBtn = document.getElementById('toggle-pageturn');

                if (isNarrationOn) {
                    narrBtn.classList.remove('off');
                    narrBtn.classList.add('on');
                    narrBtn.querySelector('.toggle-text').innerText = 'ON';
                } else {
                    narrBtn.classList.add('off');
                    narrBtn.classList.remove('on');
                    narrBtn.querySelector('.toggle-text').innerText = 'OFF';
                }

                if (isPageTurnOn) {
                    pageBtn.classList.remove('off');
                    pageBtn.classList.add('on');
                    pageBtn.querySelector('.toggle-text').innerText = 'ON';
                } else {
                    pageBtn.classList.add('off');
                    pageBtn.classList.remove('on');
                    pageBtn.querySelector('.toggle-text').innerText = 'OFF';
                }

                // Dependence logic
                if (!isNarrationOn) {
                    pageBtn.classList.add('opacity-30', 'cursor-not-allowed');
                    pageBtn.setAttribute('disabled', 'true');
                    document.querySelectorAll('#speed-group button').forEach(b => b.setAttribute('disabled', 'true'));
                } else {
                    pageBtn.classList.remove('opacity-30', 'cursor-not-allowed');
                    pageBtn.removeAttribute('disabled');
                    document.querySelectorAll('#speed-group button').forEach(b => b.removeAttribute('disabled'));
                }

                // Update Active States for Buttons
                document.querySelectorAll('.settings-btn-group button').forEach(b => b.classList.remove('active'));
                document.getElementById(`speed-${narrationSpeed}`).classList.add('active');
                document.getElementById(`text-${textSize}`).classList.add('active');
            }

            // Library Full Page Logic
            window.openLibraryFullPage = function (zone, subTab) {
                const page = document.getElementById('libraryFullPage');
                page.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                if (zone) {
                    window.setActiveZone(zone);
                    if (subTab) {
                        window.setActiveSubTab(subTab);
                    }
                } else {
                    renderLibrarySubTabs();
                    renderLibraryContent();
                }
                
                if (window.lucide) {
                    lucide.createIcons();
                }
            };

            window.closeLibraryFullPage = function () {
                const page = document.getElementById('libraryFullPage');
                page.classList.add('hidden');
                document.body.style.overflow = 'auto';
            };

            window.toggleLibraryFilter = function () {
                const dropdown = document.getElementById('libraryFilterDropdown');
                const btn = document.getElementById('libraryFilterBtn');
                const isOpen = !dropdown.classList.contains('hidden');

                if (isOpen) {
                    dropdown.classList.add('hidden');
                    btn.className = "h-14 px-8 rounded-2xl border-2 flex items-center gap-4 transition-all active:scale-95 font-black bg-white/5 text-white border-white/10 hover:bg-white/10";
                } else {
                    dropdown.classList.remove('hidden');
                    btn.className = "h-14 px-8 rounded-2xl border-2 flex items-center gap-4 transition-all active:scale-95 font-black bg-[#fbbf24] text-[#0f172a] border-[#fbbf24] shadow-lg shadow-amber-900/20";
                }
            };

            // Close filter on outside click
            window.addEventListener('click', (e) => {
                const dropdown = document.getElementById('libraryFilterDropdown');
                const btn = document.getElementById('libraryFilterBtn');
                if (dropdown && !dropdown.classList.contains('hidden')) {
                    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
                        window.toggleLibraryFilter();
                    }
                }
            });

            window.toggleLibraryFilterItem = function (btn) {
                const isActive = btn.classList.contains('bg-[#fbbf24]');
                if (isActive) {
                    btn.className = "px-6 py-3 rounded-2xl text-base font-bold bg-white/5 text-white/60 border-2 border-transparent hover:border-white/10 transition-all";
                } else {
                    btn.className = "px-6 py-3 rounded-2xl text-base font-bold bg-[#fbbf24] text-[#0f172a] border-2 border-[#fbbf24] shadow-lg shadow-amber-200/20";
                }
            };

            window.setActiveZone = function (zone) {
                currentActiveZone = zone;
                currentActiveSubTab = libraryZones[zone].length > 0 ? libraryZones[zone][0] : null;
                currentSubCategory = 'All';

                const zoneBook = document.getElementById('zone-book');
                const zoneMedia = document.getElementById('zone-media');
                const zoneMyLibrary = document.getElementById('zone-my-library');
                const searchArea = document.getElementById('librarySearchArea');
                const zoneToggleGroup = document.getElementById('zoneToggleGroup');
                const subTabContainer = document.getElementById('subTabContainer');
                
                // Clear any active search when switching zones
                if (typeof clearLibrarySearch === 'function') {
                    clearLibrarySearch();
                } else {
                    isLibrarySearchExecuted = false;
                    const searchInput = document.getElementById('libSearchInput');
                    if (searchInput) searchInput.value = '';
                }

                if (zone === 'Book Zone') {
                    zoneBook.className = "px-8 py-2.5 rounded-[22px] font-black text-base transition-all bg-[#fbbf24] text-[#0f172a] shadow-xl";
                    zoneMedia.className = "px-8 py-2.5 rounded-[22px] font-black text-base transition-all text-white/50 hover:text-white";
                    if (zoneMyLibrary) zoneMyLibrary.className = "hidden";
                    if (searchArea) searchArea.style.display = 'block';
                    if (zoneToggleGroup) zoneToggleGroup.style.display = 'flex';
                    if (subTabContainer) {
                        subTabContainer.classList.add('ml-12');
                        subTabContainer.classList.remove('w-full');
                    }
                } else if (zone === 'Media Zone') {
                    zoneMedia.className = "px-8 py-2.5 rounded-[22px] font-black text-base transition-all bg-[#fbbf24] text-[#0f172a] shadow-xl";
                    zoneBook.className = "px-8 py-2.5 rounded-[22px] font-black text-base transition-all text-white/50 hover:text-white";
                    if (zoneMyLibrary) zoneMyLibrary.className = "hidden";
                    if (searchArea) searchArea.style.display = 'block';
                    if (zoneToggleGroup) zoneToggleGroup.style.display = 'flex';
                    if (subTabContainer) {
                        subTabContainer.classList.add('ml-12');
                        subTabContainer.classList.remove('w-full');
                    }
                } else if (zone === 'My Library') {
                    // Deselect others if in My Library
                    zoneBook.className = "px-8 py-2.5 rounded-[22px] font-black text-base transition-all text-white/50 hover:text-white";
                    zoneMedia.className = "px-8 py-2.5 rounded-[22px] font-black text-base transition-all text-white/50 hover:text-white";
                    // Hide Search and Book/Media tabs
                    if (searchArea) searchArea.style.display = 'none';
                    if (zoneToggleGroup) zoneToggleGroup.style.display = 'none';
                    // Pull tabs to the left
                    if (subTabContainer) {
                        subTabContainer.classList.remove('ml-12');
                        subTabContainer.classList.add('w-full');
                    }
                }

                renderLibrarySubTabs();
                renderLibraryContent();
            };

            window.setActiveSubTab = function (tab) {
                currentActiveSubTab = tab;
                currentSubCategory = 'All';
                renderLibrarySubTabs();
                renderLibraryContent();
            };

            window.setSubCategory = function (cat) {
                currentSubCategory = cat;
                renderLibraryContent();
            };

            window.setLibrarySort = function (sort) {
                if (currentActiveZone === 'Book Zone') {
                    librarySortBy = sort;
                } else if (currentActiveZone === 'My Library') {
                    myLibrarySortBy = sort;
                } else {
                    mediaSortBy = sort;
                }
                renderLibraryContent();
            };

            window.toggleUnreadOnly = function () {
                if (currentActiveZone === 'My Library') {
                    myLibraryShowUnreadOnly = !myLibraryShowUnreadOnly;
                } else {
                    libraryShowUnreadOnly = !libraryShowUnreadOnly;
                }
                renderLibraryContent();
            };

            window.toggleMediaUnplayedOnly = function () {
                mediaShowUnplayedOnly = !mediaShowUnplayedOnly;
                renderLibraryContent();
            };

            window.toggleMediaFilter = function (type) {
                mediaFilters[type] = !mediaFilters[type];
                renderLibraryContent();
            };

            function renderLibrarySubTabs() {
                const container = document.getElementById('subTabContainer');
                const tabs = libraryZones[currentActiveZone];

                if (currentActiveZone === 'My Library') {
                    let leftTabs = '';
                    let rightTabs = '';

                    tabs.forEach(tab => {
                        const safeTab = tab.replace(/'/g, "\\'");
                        if (tab === 'Roadmap') {
                            leftTabs += `
                                <div class="flex items-center pr-4">
                                    <button onclick="setActiveSubTab('${safeTab}')"
                                        class="relative px-6 py-2.5 rounded-2xl font-black transition-all flex items-center gap-3 border-2 border-transparent active:scale-95 ${currentActiveSubTab === tab ? 'bg-[#fbbf24] text-[#0f172a] shadow-[0_0_20px_rgba(251,191,36,0.4)] scale-105' : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20'}">
                                        <i data-lucide="map" class="w-5 h-5 ${currentActiveSubTab === tab ? 'animate-bounce' : ''}"></i>
                                        <span class="uppercase tracking-widest text-sm">${tab}</span>
                                    </button>
                                </div>
                            `;
                        } else {
                            rightTabs += `
                                <button onclick="setActiveSubTab('${safeTab}')"
                                    class="relative py-4 text-xl font-black transition-all flex items-center gap-3 ${currentActiveSubTab === tab ? 'text-[#fbbf24]' : 'text-slate-300 hover:text-white'}">
                                    <span>${tab}</span>
                                    ${currentActiveSubTab === tab ? '<div class="absolute bottom-0 left-0 right-0 h-1.5 bg-[#fbbf24] rounded-full animate-in fade-in slide-in-from-bottom-1"></div>' : ''}
                                </button>
                            `;
                        }
                    });

                    container.innerHTML = `
                        ${leftTabs}
                        <div class="ml-auto flex items-center gap-8 pr-8">
                            ${rightTabs}
                        </div>
                    `;
                } else {
                    container.innerHTML = tabs.map(tab => {
                        const safeTab = tab.replace(/'/g, "\\'");
                        return `
                            <button onclick="setActiveSubTab('${safeTab}')"
                                class="relative py-4 text-xl font-black transition-all flex items-center gap-3 ${currentActiveSubTab === tab ? 'text-[#fbbf24]' : 'text-slate-300 hover:text-white'}">
                                <span>${tab}</span>
                                ${currentActiveSubTab === tab ? '<div class="absolute bottom-0 left-0 right-0 h-1.5 bg-[#fbbf24] rounded-full animate-in fade-in slide-in-from-bottom-1"></div>' : ''}
                            </button>
                        `;
                    }).join('');
                }
                
                if (window.lucide) {
                    lucide.createIcons();
                }
            }

            // --- Library Search Logic ---
            let isLibrarySearchExecuted = false;
            let searchSelectedIndex = -1;
            let matchedBooksList = [];

            window.handleLibrarySearchInput = function (value) {
                const clearBtn = document.getElementById('libSearchClearBtn');
                const dropdown = document.getElementById('libSearchDropdown');
                const dropdownList = document.getElementById('libSearchDropdownList');
                
                searchSelectedIndex = -1; // Reset selection

                if (value.length > 0) {
                    clearBtn.classList.remove('hidden');
                    
                    const query = value.toLowerCase();
                    matchedBooksList = booksData.filter(b => b.title.toLowerCase().includes(query)).slice(0, 5);
                    
                    if (matchedBooksList.length > 0) {
                        dropdownList.innerHTML = matchedBooksList.map((b, index) => `
                            <div class="search-suggestion-item flex items-center gap-4 p-2 hover:bg-sky-50 rounded-xl cursor-pointer transition-colors group" 
                                 onclick="document.getElementById('libSearchInput').value='${b.title}'; executeLibrarySearch()"
                                 onmouseenter="updateSearchSelection(${index})">
                                <img src="${b.src}" class="w-10 h-14 object-cover rounded-lg shadow-sm border border-slate-100">
                                <span class="suggestion-text font-bold text-slate-700 font-jua group-hover:text-sky-500 transition-colors">${b.title}</span>
                            </div>
                        `).join('');
                        dropdown.classList.remove('hidden');
                    } else {
                        dropdownList.innerHTML = `<div class="p-4 text-center font-bold text-slate-400">No matching books found.</div>`;
                        dropdown.classList.remove('hidden');
                    }
                } else {
                    clearBtn.classList.add('hidden');
                    dropdown.classList.add('hidden');
                    matchedBooksList = [];
                }
            };

            window.updateSearchSelection = function (index) {
                searchSelectedIndex = index;
                const items = document.querySelectorAll('.search-suggestion-item');
                items.forEach((item, i) => {
                    const textNode = item.querySelector('.suggestion-text');
                    if (i === index) {
                        item.classList.add('bg-sky-50');
                        item.classList.remove('hover:bg-sky-50');
                        textNode.classList.add('text-sky-500');
                        textNode.classList.remove('text-slate-700');
                    } else {
                        item.classList.remove('bg-sky-50');
                        item.classList.add('hover:bg-sky-50');
                        textNode.classList.remove('text-sky-500');
                        textNode.classList.add('text-slate-700');
                    }
                });
            };

            window.handleLibrarySearchKeyDown = function(event) {
                const dropdown = document.getElementById('libSearchDropdown');
                
                if (event.key === 'ArrowDown' || event.key === 'PageDown') {
                    if (!dropdown.classList.contains('hidden') && matchedBooksList.length > 0) {
                        event.preventDefault();
                        if (searchSelectedIndex < matchedBooksList.length - 1) {
                            updateSearchSelection(searchSelectedIndex + 1);
                        }
                    }
                } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
                    if (!dropdown.classList.contains('hidden') && matchedBooksList.length > 0) {
                        event.preventDefault();
                        if (searchSelectedIndex > 0) {
                            updateSearchSelection(searchSelectedIndex - 1);
                        }
                    }
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    if (!dropdown.classList.contains('hidden') && searchSelectedIndex >= 0 && searchSelectedIndex < matchedBooksList.length) {
                        document.getElementById('libSearchInput').value = matchedBooksList[searchSelectedIndex].title;
                        executeLibrarySearch();
                    } else {
                        executeLibrarySearch();
                    }
                }
            };

            window.clearLibrarySearch = function () {
                const input = document.getElementById('libSearchInput');
                input.value = '';
                document.getElementById('libSearchClearBtn').classList.add('hidden');
                document.getElementById('libSearchDropdown').classList.add('hidden');
                
                isLibrarySearchExecuted = false;
                const zoneRow = document.getElementById('libraryZoneRow');
                if (zoneRow) zoneRow.classList.remove('hidden');
                
                renderLibraryContent();
            };

            window.executeLibrarySearch = function () {
                const input = document.getElementById('libSearchInput');
                if (!input.value.trim()) return;

                isLibrarySearchExecuted = true;
                document.getElementById('libSearchDropdown').classList.add('hidden');
                
                const zoneRow = document.getElementById('libraryZoneRow');
                if (zoneRow) zoneRow.classList.add('hidden');
                
                renderLibraryContent();
            };

            window.toggleFilterItem = function (btn) {
                btn.classList.toggle('active');
                if (btn.classList.contains('active')) {
                    btn.className = "px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 bg-sky-50 text-sky-600 border-sky-200 shadow-sm filter-item-btn active";
                } else {
                    btn.className = "px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:bg-slate-50 filter-item-btn";
                }
            };

            window.selectRoadmapBook = function(bookId) {
                window.currentRoadmapActiveBookId = bookId;
                renderLibraryContent();
            };

            function renderRoadmap(books) {
                const activeBooks = books.slice(0, 3);
                if (!window.currentRoadmapActiveBookId) {
                    window.currentRoadmapActiveBookId = activeBooks[0].id;
                }
                
                const selectedBook = activeBooks.find(b => b.id === window.currentRoadmapActiveBookId) || activeBooks[0];
                
                const allBooks = books;
                let pathBooks = [];
                let themeTitle = '';
                let currentIndex = 2; // Default to having books before and after
                
                if (selectedBook.id === 'l-1') {
                    pathBooks = [allBooks[2], allBooks[3], selectedBook, allBooks[5], allBooks[6], allBooks[7]];
                    themeTitle = '🗺️ Journey to True Happiness';
                    currentIndex = 2;
                } else if (selectedBook.id === 'l-2') {
                    pathBooks = [allBooks[0], selectedBook, allBooks[2], allBooks[8], allBooks[9]];
                    themeTitle = '🗺️ Quest for the Lost Colors';
                    currentIndex = 1;
                } else {
                    pathBooks = [allBooks[1], allBooks[2], allBooks[4], selectedBook, allBooks[9], allBooks[8]];
                    themeTitle = '🗺️ Mystery of the Silent Watch';
                    currentIndex = 3;
                }
                
                let html = '<div class="relative w-full animate-in fade-in">';
                
                // Top Book Selector
                html += `
                    <div class="w-full bg-white/50 backdrop-blur-sm border-b border-slate-100 py-6 sticky top-0 z-50">
                        <div class="max-w-[1200px] mx-auto px-4 sm:px-10 flex flex-col gap-4">
                            <h3 class="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><i data-lucide="compass" class="w-4 h-4"></i> Active Journeys</h3>
                            <div class="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                `;
                
                activeBooks.forEach(book => {
                    const isSelected = book.id === window.currentRoadmapActiveBookId;
                    const ringClass = isSelected ? 'ring-4 ring-indigo-500 ring-offset-4 scale-105' : 'ring-2 ring-slate-200 hover:ring-indigo-300 opacity-60 hover:opacity-100 scale-95 hover:scale-100 cursor-pointer';
                    html += `
                        <button onclick="selectRoadmapBook('${book.id}')" class="flex flex-col items-center gap-2 group shrink-0 transition-all duration-300 mr-2 outline-none border-none bg-transparent">
                            <div class="w-16 h-16 rounded-full overflow-hidden ${ringClass} transition-all duration-300 shadow-sm">
                                <img src="${book.src}" class="w-full h-full object-cover">
                            </div>
                            <span class="text-[10px] font-bold ${isSelected ? 'text-slate-800' : 'text-slate-400'} max-w-[70px] truncate text-center">${book.title}</span>
                        </button>
                    `;
                });
                
                html += `
                            </div>
                        </div>
                    </div>
                `;
                
                // Roadmap Title
                html += `
                    <div class="max-w-[1200px] mx-auto px-4 sm:px-10 pt-12 pb-4">
                        <h2 class="text-3xl font-black font-jua text-slate-800">${themeTitle}</h2>
                    </div>
                `;
                
                // Snake Map Area
                html += '<div class="relative w-full max-w-[1200px] mx-auto pb-32 pt-10 px-4 sm:px-10">';
                html += `<svg class="absolute inset-0 w-full h-full pointer-events-none z-0" style="opacity: 0.6;">
                    <path id="roadmap-path" d="" fill="none" stroke="#6366f1" stroke-width="8" stroke-dasharray="0 24" stroke-linecap="round" />
                </svg>`;
                html += '<div class="flex flex-col gap-24 relative z-10" id="roadmap-container">';
                
                const cols = 4;
                const rows = [];
                for(let i=0; i<pathBooks.length; i+=cols) {
                    const row = pathBooks.slice(i, i+cols);
                    const isOddRow = (Math.floor(i/cols) % 2 !== 0);
                    rows.push({ items: isOddRow ? row.reverse() : row, isOddRow, originalStartIdx: i });
                }
                
                rows.forEach((rowObj, rowIdx) => {
                    const justifyClass = rowObj.isOddRow ? 'flex-row-reverse' : 'flex-row';
                    const paddingClass = rowObj.isOddRow ? 'pr-12 md:pr-24' : 'pl-12 md:pl-24';
                    
                    html += `<div class="roadmap-row flex items-center gap-8 md:gap-16 w-full ${justifyClass} ${paddingClass} justify-around">`;
                    
                    rowObj.items.forEach((book, colIdx) => {
                        const pathIdx = pathBooks.findIndex(b => b.id === book.id);
                        const isCompleted = pathIdx < currentIndex;
                        const isCurrent = pathIdx === currentIndex;
                        const isNotStarted = pathIdx > currentIndex;
                        
                        let statusClass = 'shadow-xl hover:scale-105 hover:-translate-y-2';
                        let ringClass = 'border-white';
                        
                        if(isCurrent) {
                            statusClass = 'scale-110 z-30 shadow-[0_0_40px_rgba(99,102,241,0.5)] border-indigo-500';
                            ringClass = 'border-indigo-500';
                        }
                        
                        html += `
                            <div class="roadmap-node relative group flex flex-col items-center transition-all duration-500 cursor-pointer" data-index="${pathIdx}" onclick="openModal('${book.id}', 'library')">
                                
                                <div class="w-32 md:w-44 lg:w-48 aspect-[3/4] rounded-[32px] overflow-hidden border-4 ${ringClass} shadow-xl relative bg-white transform transition-all ${statusClass}">
                                    <img src="${book.src}" class="w-full h-full object-cover">
                                    
                                    ${isCompleted ? '<div class="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-[16px] z-20 shadow-sm flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3 h-3"></i> COMPLETED</div>' : ''}
                                    ${isCurrent ? '<div class="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-[16px] z-20 shadow-sm flex items-center gap-1"><i data-lucide="zap" class="w-3 h-3"></i> IN PROGRESS</div>' : ''}
                                    
                                    ${isCurrent ? '<div class="absolute inset-0 bg-indigo-500/10 mix-blend-overlay"></div>' : ''}
                                </div>
                                
                                <div class="absolute -bottom-6 px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-lg z-30 flex items-center gap-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                    <i data-lucide="${isCompleted ? 'check' : isCurrent ? 'sparkles' : 'book'}" class="w-3 h-3 ${isCompleted ? 'text-emerald-500' : isCurrent ? 'text-indigo-500' : 'text-slate-400'}"></i>
                                    <p class="text-[11px] font-black ${isCompleted ? 'text-emerald-600' : isCurrent ? 'text-indigo-600' : 'text-slate-500'} uppercase tracking-tighter line-clamp-1 max-w-[120px]">${book.title || 'Book Title'}</p>
                                </div>
                            </div>
                        `;
                    });
                    html += `</div>`;
                });
                
                html += '</div></div></div>';
                
                setTimeout(() => {
                    const container = document.getElementById('roadmap-container');
                    const path = document.getElementById('roadmap-path');
                    if(!container || !path) return;
                    
                    const nodesRaw = Array.from(container.querySelectorAll('.roadmap-node'));
                    const nodes = nodesRaw.sort((a,b) => parseInt(a.dataset.index) - parseInt(b.dataset.index));
                    
                    if(nodes.length < 2) return;
                    
                    const svgRect = path.parentElement.getBoundingClientRect();
                    let d = '';
                    nodes.forEach((node, i) => {
                        const rect = node.getBoundingClientRect();
                        const x = rect.left - svgRect.left + rect.width / 2;
                        const y = rect.top - svgRect.top + rect.height / 2;
                        
                        if(i === 0) {
                            d += `M ${x} ${y}`;
                        } else {
                            const prevRect = nodes[i-1].getBoundingClientRect();
                            const prevX = prevRect.left - svgRect.left + prevRect.width / 2;
                            const prevY = prevRect.top - svgRect.top + prevRect.height / 2;
                            
                            // Check for row wrap (U-turn)
                            if (i % 4 === 0) {
                                const isRightSide = Math.floor((i-1)/4) % 2 === 0;
                                const offset = isRightSide ? 150 : -150;
                                d += ` C ${prevX + offset} ${prevY}, ${x + offset} ${y}, ${x} ${y}`;
                            } else {
                                // Normal connection within row
                                const midX = (prevX + x) / 2;
                                d += ` C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`;
                            }
                        }
                    });
                    path.setAttribute('d', d);
                    lucide.createIcons();
                }, 100);
                
                return html;
            }

            function drawRoadmapLine() {
                const container = document.getElementById('roadmap-container');
                const path = document.getElementById('roadmap-path');
                if(!container || !path) return;
                
                const nodes = Array.from(container.querySelectorAll('.roadmap-node'));
                if(nodes.length < 2) return;
                
                const containerRect = container.getBoundingClientRect();
                let d = '';
                
                nodes.forEach((node, i) => {
                    const rect = node.getBoundingClientRect();
                    const x = rect.left - containerRect.left + rect.width / 2;
                    const y = rect.top - containerRect.top + rect.height / 2;
                    
                    if(i === 0) {
                        d += `M ${x} ${y}`;
                    } else {
                        const prevRect = nodes[i-1].getBoundingClientRect();
                        const prevX = prevRect.left - containerRect.left + prevRect.width / 2;
                        const prevY = prevRect.top - containerRect.top + prevRect.height / 2;
                        
                        // Use a smooth vertical S-curve
                        const cp1X = prevX;
                        const cp1Y = prevY + (y - prevY) / 2;
                        const cp2X = x;
                        const cp2Y = prevY + (y - prevY) / 2;
                        
                        d += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y}`;
                    }
                });
                
                path.setAttribute('d', d);
            }

            let showCompletedFavoritesOnly = false;
            window.toggleCompletedFavorites = function() {
                showCompletedFavoritesOnly = !showCompletedFavoritesOnly;
                renderLibraryContent();
            };

            window.toggleHeart = function(bookId) {
                const book = booksData.find(b => b.id === bookId);
                if(book) book.isBookmarked = !book.isBookmarked;
                
                ['completed', 'roadmap'].forEach(key => {
                    if(MY_LIBRARY_DUMMY_DATA[key]) {
                        const b = MY_LIBRARY_DUMMY_DATA[key].find(x => x.id === bookId);
                        if(b) b.isBookmarked = book ? book.isBookmarked : !b.isBookmarked;
                    }
                });
                renderLibraryContent();
            };

            function renderCoverGallery(books, emptyTitle, emptyDesc, showToggle = false, isFavoritesOnly = false, isCarousel = false) {
                let filteredBooks = books;
                if (isFavoritesOnly) {
                    filteredBooks = books.filter(b => b.isBookmarked);
                }

                let html = '';
                
                if (showToggle) {
                    html += `
                        <div class="flex justify-end mb-6 animate-in fade-in">
                            <label class="flex items-center gap-3 cursor-pointer group bg-white px-4 py-2 rounded-2xl shadow-sm border-2 border-slate-100 hover:border-pink-200 transition-colors">
                                <i data-lucide="heart" class="w-5 h-5 ${isFavoritesOnly ? 'fill-pink-500 text-pink-500' : 'text-slate-300'} transition-colors"></i>
                                <span class="font-bold text-slate-600">Favorites Only</span>
                                <div class="relative ml-2">
                                    <input type="checkbox" class="sr-only peer" ${isFavoritesOnly ? 'checked' : ''} onchange="toggleCompletedFavorites()">
                                    <div class="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-pink-500 transition-all"></div>
                                    <div class="absolute left-1 top-1 w-3 h-3 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                                </div>
                            </label>
                        </div>
                    `;
                }

                if(!filteredBooks || filteredBooks.length === 0) {
                    html += `
                        <div class="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500 w-full">
                            <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-4 border-slate-100">
                                <i data-lucide="book-x" class="w-10 h-10 text-slate-300"></i>
                            </div>
                            <h2 class="text-2xl font-black text-slate-600 font-jua mb-2">${emptyTitle}</h2>
                            <p class="text-slate-400 font-bold">${emptyDesc}</p>
                        </div>
                    `;
                    return html;
                }

                if (!isCarousel) {
                    html += `<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 animate-in fade-in slide-in-from-bottom-4">`;
                }
                
                filteredBooks.forEach(book => {
                    const isFav = book.isBookmarked;
                    const widthClass = isCarousel ? 'w-32 md:w-40 shrink-0' : 'w-full';
                    html += `
                        <div class="relative group cursor-pointer aspect-[3/4] rounded-[20px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-[3px] border-slate-100 hover:border-indigo-100 bg-slate-50 ${widthClass}" onclick="openModal('${book.id}', 'library')">
                            <img src="${book.src}" class="w-full h-full object-cover pointer-events-none">
                            <div class="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            
                            <button class="absolute bottom-2 right-2 w-9 h-9 bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-20 group/btn border-2 border-slate-50" onclick="event.stopPropagation(); toggleHeart('${book.id}')">
                                <i data-lucide="heart" class="w-4 h-4 ${isFav ? 'fill-pink-500 text-pink-500' : 'text-slate-300 group-hover/btn:text-pink-400'} transition-colors"></i>
                            </button>
                        </div>
                    `;
                });
                
                if (!isCarousel) {
                    html += `</div>`;
                }
                return html;
            }

            function renderWishlistTab() {
                const favBooks = booksData.filter(b => b.isBookmarked);
                const completedIds = MY_LIBRARY_DUMMY_DATA.completed.map(b => b.id);
                const inProgressIds = MY_LIBRARY_DUMMY_DATA.inProgress.map(b => b.id);

                const currentlyLoving = favBooks.filter(b => inProgressIds.includes(b.id));
                const savedForLater = favBooks.filter(b => !completedIds.includes(b.id) && !inProgressIds.includes(b.id));

                if (favBooks.length === 0) {
                    return `
                        <div class="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
                            <div class="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-lg">
                                <i data-lucide="heart-crack" class="w-12 h-12 text-pink-300"></i>
                            </div>
                            <h2 class="text-3xl font-black text-slate-700 font-jua mb-4">No Wishlist Yet</h2>
                            <p class="text-slate-500 font-bold text-lg">Find books you love and tap the heart icon to save them here!</p>
                            <button onclick="setActiveZone('Book Zone')" class="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all">
                                Explore Books
                            </button>
                        </div>
                    `;
                }

                let html = '<div class="space-y-16">';
                
                if (currentlyLoving.length > 0) {
                    html += `
                        <div class="space-y-6">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                                    <i data-lucide="heart" class="w-5 h-5 text-rose-500 fill-current"></i>
                                </div>
                                <h3 class="text-3xl font-black text-slate-800 font-jua uppercase tracking-tight">Currently Loving</h3>
                            </div>
                            <div class="library-scroll-container flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 cursor-grab active:cursor-grabbing select-none">
                                ${renderCoverGallery(currentlyLoving, '', '', false, false, true)}
                            </div>
                        </div>
                    `;
                }
                
                if (savedForLater.length > 0) {
                    html += `
                        <div class="space-y-6">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                                    <i data-lucide="bookmark" class="w-5 h-5 text-sky-500"></i>
                                </div>
                                <h3 class="text-3xl font-black text-slate-800 font-jua uppercase tracking-tight">Saved for Later</h3>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                                ${renderBookCards('SavedForLater', false, savedForLater.length, savedForLater)}
                            </div>
                        </div>
                    `;
                }
                
                html += '</div>';
                return html;
            }

            function renderMyLibraryGrid(books, emptyTitle, emptyDesc) {
                if(!books || books.length === 0) {
                    return `
                        <div class="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
                            <div class="relative mb-8">
                                <div class="w-48 h-48 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden border-8 border-white shadow-xl">
                                    <i data-lucide="book-dashed" class="w-24 h-24 text-slate-300"></i>
                                </div>
                                <div class="absolute -bottom-2 -right-2 w-16 h-16 bg-rose-50 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                    <i data-lucide="info" class="w-8 h-8 text-rose-300"></i>
                                </div>
                            </div>
                            <h2 class="text-4xl font-black text-slate-700 font-jua mb-4">${emptyTitle}</h2>
                            <p class="text-xl font-bold text-slate-400 mb-8 max-w-md text-center leading-relaxed">${emptyDesc}</p>
                            <button onclick="setActiveZone('Book Zone')" class="px-8 py-4 bg-[#fbbf24] text-[#0f172a] rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/30 flex items-center gap-3">
                                Go to Book Zone <i data-lucide="arrow-right" class="w-6 h-6"></i>
                            </button>
                        </div>
                    `;
                }

                return `
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8 animate-in fade-in slide-in-from-bottom-4">
                        ${renderBookCards('My Library', false, books.length, books)}
                    </div>
                `;
            }

            function renderInProgressGrid(books, emptyTitle, emptyDesc) {
                if(!books || books.length === 0) {
                    return renderMyLibraryGrid(books, emptyTitle, emptyDesc);
                }

                let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4">';
                
                books.forEach(book => {
                    // Generate a random progress between 10% and 90% for dummy data
                    const progress = Math.floor(Math.random() * 80) + 10;
                    const ctaText = progress > 0 ? "CONTINUE READING" : "START READING";
                    
                    html += `
                        <div class="bg-white rounded-[32px] p-6 shadow-sm border-[3px] border-slate-100 hover:border-sky-300 hover:shadow-xl transition-all duration-300 group flex flex-col">
                            <div class="flex items-start gap-5 mb-6">
                                <div class="w-24 shrink-0 aspect-[3/4] rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                                    <img src="${book.src}" class="w-full h-full object-cover">
                                </div>
                                <div class="flex-1 min-w-0 flex flex-col justify-center h-24">
                                    <h4 class="text-lg font-black text-slate-800 leading-tight mb-2 line-clamp-2">${book.title || 'Book Title'}</h4>
                                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg w-fit">
                                        <i data-lucide="bar-chart-2" class="w-3.5 h-3.5 text-slate-500"></i>
                                        <span class="text-xs font-bold text-slate-500 tracking-wider">LV.3</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-auto">
                                <div class="flex justify-between items-end mb-2">
                                    <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                                    <span class="text-sm font-black text-sky-500">${progress}%</span>
                                </div>
                                <div class="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden border border-slate-200">
                                    <div class="bg-gradient-to-r from-sky-400 to-blue-500 h-3 rounded-full relative" style="width: ${progress}%">
                                        <div class="absolute right-0 top-0 bottom-0 w-4 bg-white/30 skew-x-[-20deg]"></div>
                                    </div>
                                </div>
                                
                                <button onclick="openLearningMode('${book.id}', '${book.title}')" class="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-sky-500 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 hover:shadow-sky-500/30">
                                    <i data-lucide="play" class="w-4 h-4 fill-current"></i>
                                    ${ctaText}
                                </button>
                            </div>
                        </div>
                    `;
                });
                
                html += '</div>';
                return html;
            }

            function renderLibraryContent() {
                const container = document.getElementById('libraryContentContainer');

                if (isLibrarySearchExecuted) {
                    const input = document.getElementById('libSearchInput');
                    const query = input ? input.value.toLowerCase() : '';
                    
                    const filteredBooks = booksData.filter(b => b.title.toLowerCase().includes(query));
                    
                    // Simple mock for media filtering
                    let filteredMedia = [];
                    mockMediaData.forEach(group => {
                        const matchedItems = group.items.filter(item => item.title.toLowerCase().includes(query));
                        if (matchedItems.length > 0) {
                            filteredMedia.push(...matchedItems);
                        }
                    });

                    let html = '';
                    
                    if (filteredBooks.length === 0 && filteredMedia.length === 0) {
                        html = `
                            <div class="flex flex-col items-center justify-center py-20 opacity-80 w-full animate-in fade-in">
                                <div class="w-40 h-40 bg-slate-100 rounded-full flex items-center justify-center mb-8 border-8 border-white shadow-xl relative">
                                    <i data-lucide="search-x" class="w-16 h-16 text-slate-300"></i>
                                    <div class="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                                        <i data-lucide="frown" class="w-8 h-8 text-amber-400"></i>
                                    </div>
                                </div>
                                <h2 class="text-3xl font-black text-slate-700 font-jua mb-3">No results found for "<span class="text-sky-500">${input.value}</span>"</h2>
                                <p class="text-slate-500 font-bold text-lg">Try adjusting your filters or search terms.</p>
                            </div>
                        `;
                    } else {
                        html += `<div class="space-y-16 animate-in fade-in">`;
                        
                        // Books Results
                        if (filteredBooks.length > 0) {
                            html += `
                                <div class="space-y-6">
                                    <div class="flex items-center gap-3">
                                        <h3 class="text-2xl font-black text-slate-800 font-jua uppercase tracking-tight">Books</h3>
                                        <span class="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-bold">${filteredBooks.length}</span>
                                    </div>
                                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                                        ${renderBookCards('Search', false, filteredBooks.length, filteredBooks)}
                                    </div>
                                </div>
                            `;
                        }

                        // Media Results
                        if (filteredMedia.length > 0) {
                            html += `
                                <div class="space-y-6">
                                    <div class="flex items-center gap-3">
                                        <h3 class="text-2xl font-black text-slate-800 font-jua uppercase tracking-tight">Media</h3>
                                        <span class="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-sm font-bold">${filteredMedia.length}</span>
                                    </div>
                                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
                                        ${renderMediaCardsList(filteredMedia, true)}
                                    </div>
                                </div>
                            `;
                        }
                        
                        html += `</div>`;
                    }
                    
                    container.innerHTML = html;
                    lucide.createIcons();
                    initLibraryDraggable();
                    return;
                }

                if (currentActiveZone === 'Media Zone') {
                    let html = '';
                    html += `
                        <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <div class="flex items-center gap-6">
                                <div class="relative group">
                                    <select onchange="setLibrarySort(this.value)" 
                                        class="appearance-none h-14 pl-6 pr-12 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-600 outline-none focus:border-[#fbbf24] transition-all cursor-pointer">
                                        <option value="Recent" ${librarySortBy === 'Recent' ? 'selected' : ''}>Newest First</option>
                                        <option value="ABC" ${librarySortBy === 'ABC' ? 'selected' : ''}>A to Z</option>
                                        <option value="ZYX" ${librarySortBy === 'ZYX' ? 'selected' : ''}>Z to A</option>
                                        <option value="Level-ASC" ${librarySortBy === 'Level-ASC' ? 'selected' : ''}>Level: Easy to Hard</option>
                                        <option value="Level-DESC" ${librarySortBy === 'Level-DESC' ? 'selected' : ''}>Level: Hard to Easy</option>
                                    </select>
                                    <i data-lucide="chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"></i>
                                </div>
                                <label class="flex items-center gap-3 cursor-pointer group">
                                    <div class="relative">
                                        <input type="checkbox" class="sr-only peer" ${mediaShowUnplayedOnly ? 'checked' : ''} onchange="toggleMediaUnplayedOnly()">
                                        <div class="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:bg-[#fbbf24] transition-all"></div>
                                        <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
                                    </div>
                                    <span class="font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Unplayed Only</span>
                                </label>
                            </div>
                            ${currentActiveSubTab === 'All Media' ? `
                            <div class="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border-2 border-slate-100 shadow-sm animate-in fade-in slide-in-from-right-4">
                                <span class="font-bold text-slate-400 text-sm uppercase tracking-wider mr-2">Filters</span>
                                ${['Greeting', 'Movie Book', 'Audio Book'].map(type => `
                                    <label class="flex items-center gap-2 cursor-pointer group">
                                        <div class="relative flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-all ${mediaFilters[type] ? 'bg-sky-500 border-sky-500 text-white shadow-sm' : 'border-slate-300 text-transparent bg-white group-hover:border-sky-400'}">
                                            <i data-lucide="check" class="w-4 h-4"></i>
                                            <input type="checkbox" class="sr-only" ${mediaFilters[type] ? 'checked' : ''} onchange="toggleMediaFilter('${type}')">
                                        </div>
                                        <span class="font-bold text-slate-600 group-hover:text-sky-500 transition-colors select-none whitespace-nowrap">${type}</span>
                                    </label>
                                `).join('')}
                            </div>
                            ` : ''}
                        </div>`;

                    html += renderMediaContent();
                    container.innerHTML = html;
                    lucide.createIcons();
                    return;
                }

                let html = '';

                const isSortDisabled = (currentActiveSubTab === 'Topics' || currentActiveSubTab === "MD's pick" || currentActiveSubTab === '❤️ Wishlist') && currentSubCategory === 'All';

                // 1. Toolbar (Hide for Roadmap)
                if (currentActiveSubTab !== 'Roadmap') {
                    html += `
                        <div class="flex items-center justify-between mb-8">
                            <div class="flex items-center gap-6">
                                <div class="relative group">
                                    <select onchange="setLibrarySort(this.value)" ${isSortDisabled ? 'disabled' : ''}
                                        class="appearance-none h-14 pl-6 pr-12 border-2 border-slate-100 rounded-2xl font-bold outline-none transition-all ${isSortDisabled ? 'bg-slate-100 text-slate-400 opacity-70 cursor-not-allowed' : 'bg-white text-slate-600 focus:border-[#fbbf24] cursor-pointer'}">
                                        <option value="Recent" ${librarySortBy === 'Recent' ? 'selected' : ''}>Newest First</option>
                                        <option value="ABC" ${librarySortBy === 'ABC' ? 'selected' : ''}>A to Z</option>
                                        <option value="ZYX" ${librarySortBy === 'ZYX' ? 'selected' : ''}>Z to A</option>
                                        <option value="Level-ASC" ${librarySortBy === 'Level-ASC' ? 'selected' : ''}>Level: Easy to Hard</option>
                                        <option value="Level-DESC" ${librarySortBy === 'Level-DESC' ? 'selected' : ''}>Level: Hard to Easy</option>
                                    </select>
                                    <i data-lucide="chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"></i>
                                </div>
                            </div>
                        </div>`;
                }

                // 2. Chips (for Topics / MD's pick)
                if (currentActiveSubTab === 'Topics' || currentActiveSubTab === "MD's pick") {
                    const categories = currentActiveSubTab === 'Topics' ? topicCategories : mdCategories;
                    html += `
                        <div class="library-scroll-container flex gap-3 mb-12 overflow-x-auto pb-4 -mx-1 px-1 cursor-grab active:cursor-grabbing select-none">
                            ${categories.map(cat => `
                                <button onclick="setSubCategory('${cat}')"
                                    class="px-8 py-3.5 rounded-full font-black text-lg transition-all whitespace-nowrap border-2 pointer-events-auto
                                    ${currentSubCategory === cat
                            ? 'bg-[#fbbf24] text-[#0f172a] border-[#fbbf24] shadow-lg shadow-amber-200/40 scale-105'
                            : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}">
                                    ${cat}
                                </button>
                            `).join('')}
                        </div>`;
                }

                // 3. Main List
                if ((currentActiveSubTab === 'Topics' || currentActiveSubTab === "MD's pick") && currentSubCategory === 'All') {
                    // Netflix Style Carousel View
                    const categories = currentActiveSubTab === 'Topics' ? topicCategories.slice(1) : mdCategories.slice(1);
                    html += `<div class="space-y-16">`;
                    categories.forEach((cat, index) => {
                        // Consistent variation logic
                        const varyCount = 4 + (index % 5);
                        html += `
                            <div class="space-y-6">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-3xl font-black text-[#0f172a] font-jua uppercase tracking-tight">${cat}</h3>
                                    <button class="text-[#fbbf24] font-black px-4 py-2 bg-[#0f172a] rounded-xl hover:scale-105 transition-all text-sm uppercase tracking-wider" onclick="setSubCategory('${cat}')">See All</button>
                                </div>
                                <div class="library-scroll-container flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 cursor-grab active:cursor-grabbing select-none">
                                    ${renderBookCards(cat, true, varyCount)}
                                </div>
                            </div>`;
                    });
                    html += `</div>`;
                } else if (currentActiveZone === 'My Library') {
                    // My Library View
                    if (currentActiveSubTab === 'Roadmap') {
                        html += renderRoadmap(MY_LIBRARY_DUMMY_DATA.roadmap);
                    } else if (currentActiveSubTab === 'In Progress') {
                        // Use booksData that are currently in the Hero section (first 4 books of reading history)
                        const inProgressBooks = booksData.slice(0, 4);
                        html += renderInProgressGrid(inProgressBooks, "No Books in Progress", "You haven't started any books yet.");
                    } else if (currentActiveSubTab === 'Completed') {
                        const completedBooks = MY_LIBRARY_DUMMY_DATA.completed;
                        const hallOfFameBooks = completedBooks.filter(b => b.isBookmarked && b.rating === 5);
                        
                        html += \`<div class="space-y-16">\`;
                        
                        if (hallOfFameBooks.length > 0) {
                            html += \`
                                <div class="space-y-6">
                                    <div class="flex items-center gap-3 px-2">
                                        <div class="w-10 h-10 bg-amber-200 rounded-xl flex items-center justify-center shadow-inner">
                                            <i data-lucide="award" class="w-5 h-5 text-amber-600"></i>
                                        </div>
                                        <h3 class="text-3xl font-black text-amber-900 font-jua uppercase tracking-tight">Hall of Fame</h3>
                                    </div>
                                    <div class="library-scroll-container flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 cursor-grab active:cursor-grabbing select-none">
                                        \${renderCoverGallery(hallOfFameBooks, '', '', false, false, true)}
                                    </div>
                                </div>
                            \`;
                        }
                        
                        html += \`
                            <div class="space-y-6">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-2xl font-black text-slate-800 font-jua uppercase tracking-tight">All Completed Books</h3>
                                </div>
                                \${renderCoverGallery(completedBooks, "No Completed Books", "You haven't finished any books yet.", false, false, false)}
                            </div>
                        </div>\`;
                    } else if (currentActiveSubTab === '❤️ Wishlist') {
                        html += renderWishlistTab();
                    }
                } else {
                    // Book Zone Grid View
                    let displayCount = 30;
                    if (currentActiveSubTab === 'For you') displayCount = 12;

                    // If specific topic selected, match the carousel count for consistency
                    if (currentSubCategory !== 'All') {
                        const categories = currentActiveSubTab === 'Topics' ? topicCategories : mdCategories;
                        const idx = categories.indexOf(currentSubCategory);
                        if (idx > 0) displayCount = 4 + ((idx - 1) % 5);
                    }

                    html += `
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                            ${renderBookCards(currentSubCategory, false, displayCount)}
                        </div>`;
                }

                container.innerHTML = html;
                lucide.createIcons();
                initLibraryDraggable();
            }

            window.toggleMediaUnplayedOnly = function () {
                mediaShowUnplayedOnly = !mediaShowUnplayedOnly;
                renderLibraryContent();
            };

            window.toggleMediaFilter = function (type) {
                mediaFilters[type] = !mediaFilters[type];
                renderLibraryContent();
            };

            function renderMediaContent() {
                let html = '';
                let groupsToRender = [...mockMediaData];

                if (librarySortBy === 'ABC') {
                    groupsToRender.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
                } else if (librarySortBy === 'ZYX') {
                    groupsToRender.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle));
                }

                if (currentActiveSubTab === 'All Media') {
                    html += `<div class="space-y-6">`;
                    let hasVisibleGroups = false;
                    groupsToRender.forEach(group => {
                        let items = group.items.filter(item => mediaFilters[item.type]);
                        if (mediaShowUnplayedOnly) {
                            items = items.filter(item => item.isUnplayed);
                        }
                        if (items.length === 0) return;
                        hasVisibleGroups = true;

                        html += `
                            <div class="animate-in fade-in slide-in-from-bottom-2 duration-500 bg-white p-6 rounded-[32px] shadow-sm border-[3px] border-slate-100 flex gap-6 overflow-hidden relative">
                                <!-- Rule 1: Left Book Info Area -> Book Cover (3:4 ratio) -->
                                <div class="w-32 md:w-40 shrink-0 border-r-2 border-slate-100 pr-6">
                                    <div class="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:scale-105 transition-all duration-300 border-2 border-slate-100">
                                        <img src="${group.bookSrc}" class="w-full h-full object-cover">
                                    </div>
                                    <h3 class="mt-4 text-sm font-black text-slate-700 font-jua leading-tight text-center line-clamp-2">${group.bookTitle}</h3>
                                </div>
                                <div class="library-scroll-container flex gap-6 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none flex-1 items-center">
                                    ${renderMediaCardsList(items)}
                                </div>
                            </div>
                            `;
                    });
                    if (!hasVisibleGroups) {
                        html += `
                            <div class="flex flex-col items-center justify-center py-20 opacity-40 w-full animate-in fade-in">
                                <i data-lucide="search-x" class="w-24 h-24 mb-6"></i>
                                <h2 class="text-3xl font-black">No Media Matches the Filters</h2>
                            </div>`;
                    }
                    html += `</div>`;
                } else {
                    // Single grid view for Greeting, Movie Book, Audio Book
                    let filteredItems = [];
                    groupsToRender.forEach(group => {
                        const matched = group.items.filter(item => item.type === currentActiveSubTab);
                        filteredItems.push(...matched);
                    });

                    if (mediaShowUnplayedOnly) {
                        filteredItems = filteredItems.filter(item => item.isUnplayed);
                    }

                    if (filteredItems.length > 0) {
                        html += `
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 animate-in fade-in">
                                ${renderMediaCardsList(filteredItems, true)}
                            </div>
                            `;
                    } else {
                        html += `
                            <div class="flex flex-col items-center justify-center py-20 opacity-40 w-full animate-in fade-in">
                                <i data-lucide="search-x" class="w-24 h-24 mb-6"></i>
                                <h2 class="text-3xl font-black">No ${currentActiveSubTab} Found</h2>
                            </div>`;
                    }
                }
                return html;
            }



            function renderMediaCardsList(items, isGrid = false) {
                const itemsJson = encodeURIComponent(JSON.stringify(items));
                return items.map((item, idx) => {
                    let thumbnailHtml = `<img src="${item.thumb}" onerror="this.src='https://api.dicebear.com/7.x/shapes/svg?seed=${item.id}'" class="w-full h-full object-cover">`;

                    // Rule 2: Greeting Media Thumbnail (Actual first frame of video)
                    if (item.type === 'Greeting') {
                        thumbnailHtml = `<video src="${item.src}#t=0.001" class="w-full h-full object-cover" preload="metadata" muted playsinline></video>`;
                    }
                    // Rule 4: Audio Book Thumbnail (Maintain aspect ratio within 16:9)
                    else if (item.type === 'Audio Book') {
                        thumbnailHtml = `
                            <div class="w-full h-full bg-slate-50 flex items-center justify-center p-3">
                                <img src="${item.thumb}" class="h-full w-auto object-contain">
                            </div>`;
                    }

                    return `
                        <div class="group cursor-pointer ${isGrid ? 'w-full' : 'w-64 shrink-0'} flex flex-col gap-3 transition-all duration-300 transform origin-left" onclick="prepareAndPlayMedia(${idx}, '${itemsJson}')">
                            <div class="aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 relative border-4 border-white ring-1 ring-slate-100">
                                ${thumbnailHtml}
                                <div class="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div class="w-16 h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                                        <i data-lucide="play" class="w-8 h-8 ml-1 text-sky-500 fill-current"></i>
                                    </div>
                                </div>
                                <div class="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-white font-black text-xs tabular-nums tracking-wider shadow-sm border border-white/20">
                                    ${item.rt}
                                </div>
                                ${item.isUnplayed ? '<div class="absolute top-3 right-3 px-3 py-1 bg-[#fbbf24] text-[#0f172a] font-black text-[9px] uppercase tracking-widest rounded-full shadow-md z-10 border-2 border-transparent group-hover:border-white/50 transition-colors">UNPLAYED</div>' : ''}
                            </div>
                            <div class="px-1">
                                <h4 class="text-[15px] font-bold text-slate-700 line-clamp-1 group-hover:text-sky-500 transition-colors font-jua">${item.title}</h4>
                                <p class="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                                    <i data-lucide="${item.type === 'Greeting' ? 'video' : item.type === 'Audio Book' ? 'headphones' : 'film'}" class="w-3.5 h-3.5"></i>
                                    ${item.type}
                                </p>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            function handleHeartClick(event, bookId) {
                event.stopPropagation();
                const book = booksData.find(b => b.id === bookId);
                if (book) {
                    book.isBookmarked = !book.isBookmarked;

                    // Immediate UI update, but delayed removal for 'My Library'
                    const card = event.currentTarget.closest('.book-card-container') || event.currentTarget.closest('.group');
                    if (card) {
                        const icon = card.querySelector('[data-lucide="heart"]');
                        if (icon) {
                            if (book.isBookmarked) {
                                icon.classList.add('fill-current', 'text-rose-500');
                                icon.classList.remove('text-slate-300');
                            } else {
                                icon.classList.remove('fill-current', 'text-rose-500');
                                icon.classList.add('text-slate-300');
                            }
                        }
                    }

                    // If not in My Library, we might want to trigger a full re-render, 
                    // but let's just let the local DOM manipulation handle it unless we really need to.
                }
            }

            function renderBookCards(category, isCarousel, count = 30, prefilteredBooks = null) {
                // Logic to filter/sort mock data
                let books = prefilteredBooks ? [...prefilteredBooks] : [...booksData];

                // Shuffle/Shift variety based on category name lengths to simulate different lists
                if (category !== 'All') {
                    const shift = category.length % books.length;
                    books = [...books.slice(shift), ...books.slice(0, shift)];
                }

                // Create enough mock books
                let displayBooks = [];
                const actualCount = Math.min(count, books.length);
                for (let i = 0; i < actualCount; i++) {
                    const base = books[i];
                    displayBooks.push({
                        ...base,
                        id: `${base.id}__${category}__${i}`,
                        title: `${base.title}`
                    });
                }

                // Sort mock books based on selected sort option
                let currentSort = librarySortBy;
                let currentUnread = libraryShowUnreadOnly;
                if (currentActiveZone === 'My Library') {
                    currentSort = myLibrarySortBy;
                    currentUnread = myLibraryShowUnreadOnly;
                }

                if (currentUnread) {
                    displayBooks = displayBooks.filter(book => {
                        const baseId = book.id.split('__')[0];
                        const originalBook = booksData.find(b => b.id === baseId);
                        return originalBook && originalBook.isUnread;
                    });
                }

                if (currentSort === 'ABC') {
                    displayBooks.sort((a, b) => a.title.localeCompare(b.title));
                } else if (currentSort === 'ZYX') {
                    displayBooks.sort((a, b) => b.title.localeCompare(a.title));
                } else if (currentSort === 'Level-ASC') {
                    displayBooks.sort((a, b) => (parseInt(a.lexile) || 0) - (parseInt(b.lexile) || 0));
                } else if (currentSort === 'Level-DESC') {
                    displayBooks.sort((a, b) => (parseInt(b.lexile) || 0) - (parseInt(a.lexile) || 0));
                }

                return displayBooks.map(book => {
                    const baseId = book.id.split('__')[0];
                    const originalBook = booksData.find(b => b.id === baseId) || book;
                    const isFavorited = originalBook.isBookmarked;

                    return `
                        <div class="group ${isCarousel ? 'w-48 shrink-0' : 'w-full'} book-card-container">
                            <div class="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 border-2 border-slate-50 relative cursor-pointer" onclick="openModal('${baseId}', 'library')">
                                <img src="${book.src}" class="w-full h-full object-cover">
                                ${originalBook.isUnread ? '<div class="absolute top-3 right-3 px-3 py-1 bg-[#fbbf24] text-[#0f172a] font-black text-[10px] uppercase tracking-wider rounded-full shadow-sm z-10">Unread</div>' : ''}
                                
                                <button onclick="handleHeartClick(event, '${baseId}')" class="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border hover:scale-110 active:scale-95 transition-all z-20">
                                    <i data-lucide="heart" class="w-5 h-5 ${isFavorited ? 'fill-current text-rose-500' : 'text-slate-300'} transition-colors"></i>
                                </button>
                            </div>
                            <h4 class="mt-4 text-lg font-bold text-slate-700 line-clamp-2 leading-tight group-hover:text-sky-500 transition-colors font-jua cursor-pointer" onclick="openModal('${baseId}', 'library')">
                                ${book.title}
                            </h4>
                        </div>
                    `}).join('');
            }



            function initLibraryDraggable() {
                const sliders = document.querySelectorAll('.library-scroll-container');

                sliders.forEach(slider => {
                    let isDown = false;
                    let startX;
                    let scrollLeft;

                    slider.addEventListener('mousedown', (e) => {
                        isDown = true;
                        slider.style.cursor = 'grabbing';
                        startX = e.pageX - slider.offsetLeft;
                        scrollLeft = slider.scrollLeft;
                    });
                    slider.addEventListener('mouseleave', () => {
                        isDown = false;
                        slider.style.cursor = 'grab';
                    });
                    slider.addEventListener('mouseup', () => {
                        isDown = false;
                        slider.style.cursor = 'grab';
                    });
                    slider.addEventListener('mousemove', (e) => {
                        if (!isDown) return;
                        e.preventDefault();
                        const x = e.pageX - slider.offsetLeft;
                        const walk = (x - startX) * 2;
                        slider.scrollLeft = scrollLeft - walk;
                    });
                });
            }

            let isProfileMenuOpen = false;
            function toggleProfileMenu(e) {
                if (e) e.stopPropagation();
                const homeMenu = document.getElementById('profileMenu');
                const libraryMenu = document.getElementById('libraryProfileMenu');
                const isLibraryOpen = !document.getElementById('libraryFullPage').classList.contains('hidden');

                const activeMenu = isLibraryOpen ? libraryMenu : homeMenu;

                isProfileMenuOpen = !isProfileMenuOpen;
                if (isProfileMenuOpen) {
                    activeMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
                    activeMenu.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
                } else {
                    if (homeMenu) {
                        homeMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                        homeMenu.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
                    }
                    if (libraryMenu) {
                        libraryMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
                        libraryMenu.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
                    }
                }
            }

            document.addEventListener('click', (e) => {
                // Close profile menu when clicking outside
                if (isProfileMenuOpen && !e.target.closest('#profileMenu') && !e.target.closest('#libraryProfileMenu') && !e.target.closest('.group\\/profile')) {
                    isProfileMenuOpen = true; // Set to true so toggle works to turn it off
                    toggleProfileMenu(null);
                }
            });

            // Unified Player Globals (used by prepareAndPlayMedia)
            let playerMediaList = [];
            let playerCurrentIndex = 0;
            let isPlayerAutoPlay = true;
            let playerCountdownTimer = null;
            let playerVisualizerInterval = null;
            let isMiniCountdownRunning = false;
        