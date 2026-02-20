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
        id: 'missing-planet',
        title: 'The Missing Planet',
        src: '/Image/Cover/The Missing Planet.png',
        lexile: '250~300',
        wordCount: 120,
        category: 'Space 🚀',
        summary: 'A brave little astronaut goes on a mission to find a planet that disappeared from the star maps. Join the cosmic adventure!',
        keywords: ['planet', 'space', 'astronaut', 'star'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'rainbow',
        title: 'Rainbow',
        src: '/Image/Cover/Rainbow.png',
        lexile: '150~200',
        wordCount: 85,
        category: 'Nature 🌈',
        summary: 'Follow the beautiful colors across the sky after a rainy day. Learn how rainbows are made of light and magic!',
        keywords: ['color', 'rain', 'sky', 'sun'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'two-friends',
        title: 'Two Friends',
        src: '/Image/Cover/Two Friends.png',
        lexile: '200~250',
        wordCount: 110,
        category: 'Friendship 🤝',
        summary: 'A story about a rabbit and a turtle who discover that being different is what makes their friendship so special.',
        keywords: ['friends', 'together', 'help', 'game'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'silent-seed',
        title: 'The Silent Seed',
        src: '/Image/Cover/The Silent Seed.png',
        lexile: '300~350',
        wordCount: 145,
        category: 'Science 🔬',
        summary: 'Deep under the ground, a tiny seed waits silently for the perfect moment to grow into a magnificent tree.',
        keywords: ['grow', 'wait', 'ground', 'leaf'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'silent-stick',
        title: 'The Silent Stick',
        src: '/Image/Cover/The Silent Stick.png',
        lexile: '250~320',
        wordCount: 130,
        category: 'Adventure 🗺️',
        summary: "A magic stick that doesn't make a sound helps a quiet boy find his way through a mysterious forest.",
        keywords: ['magic', 'quiet', 'forest', 'path'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'broken-branch',
        title: 'The Broken Branch',
        src: '/Image/Cover/The Broken Branch.png',
        lexile: '280~340',
        wordCount: 135,
        category: 'Nature 🌳',
        summary: 'When a strong wind breaks a branch, the forest animals work together to make it a new home for a bird family.',
        keywords: ['tree', 'wind', 'home', 'birds'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'pea',
        title: 'The Pea',
        src: '/Image/Cover/The Pea.png',
        lexile: '180~230',
        wordCount: 95,
        category: 'Food 🫛',
        summary: 'One tiny green pea rolls off the plate and travels across the kitchen floor. Where will it end up?',
        keywords: ['green', 'roll', 'kitchen', 'floor'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'milo',
        title: 'Milo and the Lost Color',
        src: '/Image/Cover/Milo and the Lost Color.png',
        lexile: '320~380',
        wordCount: 160,
        category: 'Animals 🐶',
        summary: 'Milo is a dog with a very big imagination. Every time he goes for a walk, he sees a world full of dragons.',
        keywords: ['dog', 'dream', 'adventure', 'wild'],
        isBookmarked: false,
        videoUrl: '/Video/milo_and_the_lost_color_watch.mp4'
    },
    {
        id: 'rainbow-cloud',
        title: 'Rainbow Cloud',
        src: '/Image/Cover/The Rainbow Cloud.png',
        lexile: '350~400',
        wordCount: 180,
        category: 'Fantasy ✨',
        summary: 'A magical cloud that rains colors instead of water changes everything in the gray city of Grumbletown.',
        keywords: ['magic', 'cloud', 'color', 'happy'],
        isBookmarked: true,
        videoUrl: '/Video/rainbow_cloud_watch.mp4'
    },
    {
        id: 'cindellar',
        title: 'Cindellar',
        src: '/Image/Cover/Cindellar.png',
        lexile: '380~450',
        wordCount: 210,
        category: 'Classic 🏰',
        summary: 'A new retelling of the classic fairy tale with a focus on being kind to yourself and others.',
        keywords: ['princess', 'kind', 'dance', 'shoe'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'flying-trunk',
        title: 'The Flying Trunk',
        src: '/Image/Cover/The Fyling Trunk.png',
        lexile: '340~390',
        wordCount: 175,
        category: 'Adventure 🗺️',
        summary: 'Travel the world in a magic trunk that can fly over mountains and oceans.',
        keywords: ['fly', 'travel', 'ocean', 'magic'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'rapunzel',
        title: 'The Rapunzel',
        src: '/Image/Cover/The Rapunzel.png',
        lexile: '360~410',
        wordCount: 190,
        category: 'Classic 🏰',
        summary: 'A story about inner strength and finding your own voice from high up in a stone tower.',
        keywords: ['hair', 'tower', 'voice', 'strong'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
    {
        id: 'ugly-dukling',
        title: 'The Ugly Dukling',
        src: '/Image/Cover/The Ugly Dukling.png',
        lexile: '300~360',
        wordCount: 155,
        category: 'Animals  swan',
        summary: 'Discover how being different can lead to finding where you truly belong.',
        keywords: ['different', 'belong', 'lake', 'swan'],
        isBookmarked: false,
        videoUrl: '/Video/the_silent_stick_watch.mp4'
    },
];
