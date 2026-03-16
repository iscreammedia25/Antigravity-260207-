export type MediaType = 'Greeting' | 'Movie Book' | 'Audio Book';

export interface MediaItem {
    id: string;
    bookId: string;
    title: string;
    type: MediaType;
    src: string; // Video or Audio URL
    thumbnail: string;
    duration: string;
    isUnplayed: boolean;
    bookTitle: string;
}

export interface PlayerState {
    isOpen: boolean;
    mediaList: MediaItem[];
    currentIndex: number;
    isAutoPlay: boolean;
}
