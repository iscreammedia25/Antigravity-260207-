/**
 * Converts a standard Google Drive share link to a direct image URL.
 * Supports /file/d/... and ?id= format.
 */
export function convertDriveLink(url: string): string {
    if (!url) return '';

    // Regular expression to match the File ID in both formats
    const idMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

    if (idMatch && idMatch[1]) {
        // lh3.googleusercontent.com/d/{ID} is the most reliable direct image link format
        return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }

    return url; // Return original if no match
}
