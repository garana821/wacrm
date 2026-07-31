const OPENAI_TRANSCRIPTION_URL = 'https://api.openai.com/v1/audio/transcriptions'

interface TranscribeAudioOptions {
  apiKey: string
  audioBuffer: Buffer
  filename?: string
}

/**
 * Transcribe an audio buffer (OGG/MP3/WAV/M4A) using OpenAI Whisper REST API directly (no external npm dependencies).
 * Returns the transcribed text string, or null if transcription fails/empty.
 */
export async function transcribeAudioWithWhisper(
  opts: TranscribeAudioOptions
): Promise<string | null> {
  const { apiKey, audioBuffer, filename = 'voice_message.ogg' } = opts

  if (!apiKey || !audioBuffer || audioBuffer.length === 0) {
    return null
  }

  try {
    const formData = new FormData()
    const blob = new Blob([new Uint8Array(audioBuffer)], { type: 'audio/ogg' })
    formData.append('file', blob, filename)
    formData.append('model', 'whisper-1')

    const response = await fetch(OPENAI_TRANSCRIPTION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.error(`[Whisper Transcription] OpenAI API error (${response.status}):`, errText)
      return null
    }

    const data = (await response.json()) as { text?: string }
    const text = data.text?.trim()
    return text || null
  } catch (error) {
    console.error('[Whisper Transcription] Error transcribing audio:', error)
    return null
  }
}
