const DEFAULT_API_KEY = "";

/**
 * ElevenLabs TTS Utility
 * Fetches audio from ElevenLabs API and returns a blob/URL to play.
 * Note: Requires an API key stored in localStorage (item: 'elevenlabs_api_key')
 */
export const speakWithElevenLabs = async (text: string, voiceId?: string): Promise<string | null> => {
    try {
        const actualVoiceId = voiceId || "RgEAVgtchm6TZk0TamG9"; // Default fallback
        const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${actualVoiceId}`;
        
        const storedKey = localStorage.getItem('elevenlabs_api_key');
        const apiKey = (storedKey && storedKey.trim().length > 0) ? storedKey : DEFAULT_API_KEY;
        
        if (!apiKey) {
            console.warn("ElevenLabs API Key is missing.");
            return null;
        }

        console.log(`Fetching TTS from ElevenLabs [Voice: ${actualVoiceId}] for:`, text);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': apiKey
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2", // Improved model
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`ElevenLabs API failed (${response.status}): ${errorBody}`);
        }

        console.log("ElevenLabs TTS Fetch Successful");
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (err) {
        console.error("ElevenLabs TTS Error detail:", err);
        return null;
    }
};
