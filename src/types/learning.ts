
export interface BookMeta {
    book_id: string;
    title: string;
    level: number;
    lexile: string;
    word_count: number;
    summary: string;
    keywords: string[]; // Converted from comma-separated string
    cover_url: string;
}

export interface SceneData {
    book_id: string;
    scene_no: string; // e.g., "#SC01"
    script: string;
    image_url: string;
    full_audio?: string;
    sent_audios?: string[];
}

export type ReadingMode = 'ebook' | 'interactive';
export type ReadStep = 'selection' | 'intro' | 'viewing';
