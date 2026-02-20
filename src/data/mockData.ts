
import { BookMeta, SceneData } from '../types/learning';

export const MOCK_BOOK_META: BookMeta = {
    book_id: "silent-stick",
    title: "The Silent Stick",
    level: 2,
    lexile: "250~320",
    word_count: 130,
    summary: "A magic stick that doesn't make a sound helps a quiet boy find his way through a mysterious forest.",
    keywords: ["magic", "quiet", "forest", "path"],
    cover_url: "/Image/Cover/The Silent Stick.png",
};

export const MOCK_SCENES_DATA: SceneData[] = [
    // Story 0001, Level 4 (Sample Data)
    {
        book_id: "0001_lv4",
        scene_no: "#Cover",
        script: "The Rainbow Cloud",
        image_url: "https://drive.google.com/file/d/1jkziaT-vjGPdLfvR6rWBzSTAyTaJkz7c/view?usp=sharing",
        full_audio: "/audio/cover_0001.mp3"
    },
    {
        book_id: "0001_lv4",
        scene_no: "#SC01",
        script: "Once upon a time, there was a gray city called Grumbletown. People there always grumbled.",
        image_url: "https://drive.google.com/file/d/1NZ7jzGBsZVwAK6OAWqJyf_NQEmNdu6sE/view?usp=sharing",
        full_audio: "/audio/sc01_0001.mp3"
    },
    {
        book_id: "0001_lv4",
        scene_no: "#SC02",
        script: "But one day, a magical Rainbow Cloud appeared in the sky. It began to rain beautiful colors!",
        image_url: "https://drive.google.com/file/d/1f58jqkEwjGST6fzhdysf8-1LBK0FyzV6/view?usp=sharing",
        full_audio: "/audio/sc02_0001.mp3"
    },
    {
        book_id: "0001_lv4",
        scene_no: "#SC03",
        script: "The people looked up and smiled. For the first time, Grumbletown was full of joy.",
        image_url: "https://drive.google.com/file/d/1XmIuNrQbT0ZqYNfEXZwW4hAZ2Lq2DOHD/view?usp=sharing",
        full_audio: "/audio/sc03_0001.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC01",
        script: "The frozen lake lay still, \na big area of gray ice \nbeneath a heavy winter sky.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC01.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC01.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC02",
        script: "He hit the puck with force, \nbut his old stick broke \nsuddenly upon impact.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC02.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC02.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC03",
        script: "Two pieces of wood lay on the ice, \nshowing the end of his practice.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC03.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC03.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC04",
        script: "Ren worked for hours, \ncutting the skin to show \nthe hard wood under.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC04.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC04.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC05",
        script: "When he tested it, \nthe puck flew in strange circles \ndue to the wood’s natural shape.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC05.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC05.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC06",
        script: "Jax glanced at Ren’s rough branch \nand offered a cold smile, saying nothing.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC06.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC06.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC07",
        script: "Jax controlled the ice, \nhis speed pushing Ren \nback toward his own goal.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC07.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC07.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC08",
        script: "The puck turned around the confused player, \ngoing quietly into the net as the whistle blew.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC08.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC08.mp3"
    },
    {
        book_id: "silent-stick",
        scene_no: "SC09",
        script: "Ren smiled at his rough stick \nand skated away silently.",
        image_url: "/Image/Book/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC09.png",
        full_audio: "/Audio/OG_0001(The Silent Stick)_lv4/OG_0001(The Silent Stick)_lv4_SC09.mp3"
    }
];
