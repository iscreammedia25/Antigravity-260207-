export interface Book {
    id: string;
    title: string;
    src: string;
    lexile: string;
    wordCount: number;
    category: string;
    summary: string;
    keywords: string[];
    isBookmarked: boolean;
    videoUrl: string;
}

export const BOOKS_DATA: Book[] = [
    {
        id: 'OG00XX_missing_planet',
        title: 'The Missing Planet',
        src: '/Image/Cover/OG00XX(The Missing Planet).png',
        lexile: '250~300',
        wordCount: 120,
        category: 'Space 🚀',
        summary: 'A brave little astronaut goes on a mission to find a planet that disappeared from the star maps. Join the cosmic adventure!',
        keywords: ['planet', 'space', 'astronaut', 'star'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'OG00XX_rainbow',
        title: 'Rainbow',
        src: '/Image/Cover/OG00XX(Rainbow).png',
        lexile: '150~200',
        wordCount: 85,
        category: 'Nature 🌈',
        summary: 'Follow the beautiful colors across the sky after a rainy day. Learn how rainbows are made of light and magic!',
        keywords: ['color', 'rain', 'sky', 'sun'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'OG00XX_two_friends',
        title: 'Two Friends',
        src: '/Image/Cover/OG00XX(Two Friends).png',
        lexile: '200~250',
        wordCount: 110,
        category: 'Friendship 🤝',
        summary: 'A story about a rabbit and a turtle who discover that being different is what makes their friendship so special.',
        keywords: ['friends', 'together', 'help', 'game'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'OG00XX_silent_seed',
        title: 'The Silent Seed',
        src: '/Image/Cover/OG00XX(The Silent Seed).png',
        lexile: '300~350',
        wordCount: 145,
        category: 'Science 🔬',
        summary: 'Deep under the ground, a tiny seed waits silently for the perfect moment to grow into a magnificent tree.',
        keywords: ['grow', 'wait', 'ground', 'leaf'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'OG0046',
        title: 'The Silent Stick',
        src: '/Image/Cover/OG0046(The Silent Stick).png',
        lexile: '250~320',
        wordCount: 130,
        category: 'Adventure 🗺️',
        summary: "A magic stick that doesn't make a sound helps a quiet boy find his way through a mysterious forest.",
        keywords: ['magic', 'quiet', 'forest', 'path'],
        isBookmarked: false,
        videoUrl: '/Video/Book/Intro/OG0046(The Silent Stick)/OG0046(The Silent Stick)_Intro.mp4'
    },
    {
        id: 'OG00XX_broken_branch',
        title: 'The Broken Branch',
        src: '/Image/Cover/OG00XX(The Broken Branch).png',
        lexile: '280~340',
        wordCount: 135,
        category: 'Nature 🌳',
        summary: 'When a strong wind breaks a branch, the forest animals work together to make it a new home for a bird family.',
        keywords: ['tree', 'wind', 'home', 'birds'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'CS00XX_pea',
        title: 'The Pea',
        src: '/Image/Cover/CS00XX(The Pea).png',
        lexile: '180~230',
        wordCount: 95,
        category: 'Food 🫛',
        summary: 'One tiny green pea rolls off the plate and travels across the kitchen floor. Where will it end up?',
        keywords: ['green', 'roll', 'kitchen', 'floor'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'OG0021',
        title: 'Milo and the Lost Color',
        src: '/Image/Cover/OG0021(Milo and the Lost Color).png',
        lexile: '320~380',
        wordCount: 160,
        category: 'Animals 🐶',
        summary: 'Milo is a dog with a very big imagination. Every time he goes for a walk, he sees a world full of dragons.',
        keywords: ['dog', 'dream', 'adventure', 'wild'],
        isBookmarked: false,
        videoUrl: '/Video/Book/Intro/OG0021(Milo and the Lost Color)/OG0021(Milo and the Lost Color)_Intro.mp4'
    },
    {
        id: 'OG0050',
        title: 'The Rainbow Cloud in the Box',
        src: '/Image/Cover/OG0050(The Rainbow Cloud in the Box).png',
        lexile: '350~400',
        wordCount: 180,
        category: 'Fantasy ✨',
        summary: 'A magical cloud that rains colors instead of water changes everything in the gray city of Grumbletown.',
        keywords: ['magic', 'cloud', 'color', 'happy'],
        isBookmarked: true,
        videoUrl: '/Video/Book/Intro/OG0050(The Rainbow Cloud in the Box)/OG0050(The Rainbow Cloud in the Box)_Intro.mp4'
    },
    {
        id: 'CS00XX_cindellar',
        title: 'Cinderella',
        src: '/Image/Cover/CS00XX(Cinderella).png',
        lexile: '380~450',
        wordCount: 210,
        category: 'Classic 🏰',
        summary: 'A new retelling of the classic fairy tale with a focus on being kind to yourself and others.',
        keywords: ['princess', 'kind', 'dance', 'shoe'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'CS00XX_flying_trunk',
        title: 'The Flying Trunk',
        src: '/Image/Cover/CS00XX(The Fyling Trunk).png',
        lexile: '340~390',
        wordCount: 175,
        category: 'Adventure 🗺️',
        summary: 'Travel the world in a magic trunk that can fly over mountains and oceans.',
        keywords: ['fly', 'travel', 'ocean', 'magic'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'CS00XX_rapunzel',
        title: 'The Rapunzel',
        src: '/Image/Cover/CS00XX(The Rapunzel).png',
        lexile: '360~410',
        wordCount: 190,
        category: 'Classic 🏰',
        summary: 'A story about inner strength and finding your own voice from high up in a stone tower.',
        keywords: ['hair', 'tower', 'voice', 'strong'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'CS00XX_ugly_dukling',
        title: 'The Ugly Dukling',
        src: '/Image/Cover/CS00XX(The Ugly Dukling).png',
        lexile: '300~360',
        wordCount: 155,
        category: 'Animals  swan',
        summary: 'Discover how being different can lead to finding where you truly belong.',
        keywords: ['different', 'belong', 'lake', 'swan'],
        isBookmarked: false,
        videoUrl: ''
    },
    {
        id: 'CS0003',
        title: 'Hans in Luck',
        src: '/Image/Cover/CS0003(Hans in Luck).png',
        lexile: '200~280',
        wordCount: 115,
        category: 'Adventure 🗺️',
        summary: 'Hans trades his way home, finding happiness in everything he gets along the way.',
        keywords: ['hans', 'luck', 'trade', 'happy'],
        isBookmarked: false,
        videoUrl: '/Video/Book/Intro/CS0003(Hans in Luck)/CS0003(Hans in Luck)_Intro.mp4'
    },
    {
        id: 'CS00XX_thumbelina',
        title: 'Thumbelina',
        src: '/Image/Cover/CS00XX(Thumbelina).png',
        lexile: '280~340',
        wordCount: 140,
        category: 'Adventure 🗺️',
        summary: 'A tiny girl discovers a world larger than life and finds where she truly belongs.',
        keywords: ['tiny', 'thumb-sized', 'adventure', 'flower'],
        isBookmarked: false,
        videoUrl: ''
    },
];
