import { ReadingHistory } from '../types/learning';

const STORAGE_KEY = 'kids_reading_history';

export function getReadingHistory(): ReadingHistory[] {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
        const history: ReadingHistory[] = JSON.parse(stored);
        // Sort by last update time (descending)
        return history.sort((a, b) => b.lastUpdateTime - a.lastUpdateTime);
    } catch (e) {
        console.error('Failed to parse reading history:', e);
        return [];
    }
}

export function saveReadingHistory(item: ReadingHistory) {
    if (typeof window === 'undefined') return;

    const history = getReadingHistory();
    const existingIndex = history.findIndex(h => h.bookId === item.bookId);

    const updatedItem = {
        ...item,
        lastUpdateTime: Date.now()
    };

    if (existingIndex > -1) {
        history[existingIndex] = updatedItem;
    } else {
        history.unshift(updatedItem);
    }

    // Keep only the most recent 5 items
    const limitedHistory = history.slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
}

export function updateReadingProgress(bookId: string, phase: string, isCompleted: boolean) {
    const history = getReadingHistory();
    const item = history.find(h => h.bookId === bookId) || {
        bookId,
        completedPhases: [],
        currentPhase: 'watch',
        lastUpdateTime: Date.now()
    };

    // @ts-ignore
    item.currentPhase = phase;

    if (isCompleted && !item.completedPhases.includes(phase as any)) {
        item.completedPhases.push(phase as any);
    }

    saveReadingHistory(item as ReadingHistory);
}
