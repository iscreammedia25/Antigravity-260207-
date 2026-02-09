
import { BookMeta, SceneData } from '../types/learning';

export const MOCK_BOOK_META: BookMeta = {
    book_id: "001_lv4",
    title: "The Silent Stick",
    level: 4,
    lexile: "300~350",
    word_count: 140,
    summary: "The frozen lake lay still under the winter moon. A lone boy discovered a mysterious staff that hummed with a quiet power... Join him as he uncovers the secrets of the enchanted forest.",
    keywords: ["frozen lake", "mysterious staff", "enchanted forest", "adventure"],
    cover_url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070", // High quality nature image
};

export const MOCK_SCENES_DATA: SceneData[] = [
    {
        book_id: "001_lv4",
        scene_no: "#SC01",
        script: "The frozen lake lay still under the cold winter moon. Everything was silent, until Leo found the stick.",
        image_url: "https://images.unsplash.com/photo-1453228200676-e89c628f59d5?q=80&w=2070",
        full_audio: "/audio/full_01.mp3",
        sent_audios: ["/audio/sent_01_01.mp3", "/audio/sent_01_02.mp3"]
    },
    {
        book_id: "001_lv4",
        scene_no: "#SC02",
        script: "It was a long, dark branch that seemed to pulse with a faint golden light. When Leo touched it, he felt a warm tingle.",
        image_url: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1978",
        full_audio: "/audio/full_02.mp3",
        sent_audios: ["/audio/sent_02_01.mp3", "/audio/sent_02_02.mp3"]
    },
    {
        book_id: "001_lv4",
        scene_no: "#SC03",
        script: "Suddenly, the forest around him began to glow. The Silent Stick was guiding him to something hidden deep within the trees.",
        image_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071",
        full_audio: "/audio/full_03.mp3",
        sent_audios: ["/audio/sent_03_01.mp3", "/audio/sent_03_02.mp3"]
    }
];
