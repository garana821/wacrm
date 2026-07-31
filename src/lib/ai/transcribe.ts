import { OpenAI } from 'openai'

interface TranscribeAudioOptions {
  apiKey: string
  audioBuffer: Buffer
  filename?: string
}

/**
 * Transcribe an audio buffer (OGG/MP3/WAV/M4A) using OpenAI Whisper API.
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
    const openai = new OpenAI({ apiKey })
    
    // Create File object for OpenAI SDK from Buffer
    const file = new File([audioBuffer], filename, { type: 'audio/ogg' })

    const response = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
    })

    const text = response.text?.trim()
    return text || null
  } catch (error) {
    console.error('[Whisper Transcription] Error transcribing audio:', error)
    return null
  }
}
