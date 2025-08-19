import os
import io
import wave
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from google import genai
from google.genai import types

# --- Load .env ---
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in environment variables.")

# --- FastAPI init ---
app = FastAPI(
    title="Gemini Story to Audio API",
    description="Generate a short story and return as WAV audio",
    version="1.0.0"
)

# --- Gemini Client ---
client = genai.Client(api_key=api_key)

# --- Request model ---
class PromptRequest(BaseModel):
    prompt: str

# --- WAV helper ---
def create_wav_file(pcm_data: bytes, sample_rate: int = 24000, channels: int = 1, sample_width: int = 2) -> io.BytesIO:
    """Wraps raw PCM audio in a proper WAV header."""
    wav_io = io.BytesIO()
    with wave.open(wav_io, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(sample_rate)
        wf.writeframes(pcm_data)
    wav_io.seek(0)
    return wav_io

# --- API endpoint ---
@app.post("/generate")
def generate_audio_story(request: PromptRequest):
    try:
        # Step 1. Generate story text
        story_prompt = f"Write a short, imaginative story (~100 words) about: {request.prompt}"
        text_response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=story_prompt
        )
        story_text = text_response.candidates[0].content.parts[0].text
        if not story_text:
            raise HTTPException(status_code=500, detail="Failed to generate story text.")

        print("Generated Story:", story_text)

        # Step 2. Generate speech from story text
        audio_response = client.models.generate_content(
            model="gemini-2.5-flash-preview-tts",
            contents=story_text,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(
                            voice_name="Kore"
                        )
                    )
                )
            )
        )

        # Step 3. Extract audio bytes
        audio_bytes = audio_response.candidates[0].content.parts[0].inline_data.data

        # Step 4. Convert to WAV
        wav_io = create_wav_file(audio_bytes)

        return StreamingResponse(
            wav_io,
            media_type="audio/wav",
            headers={"Content-Disposition": 'attachment; filename="generated_story.wav"'}
        )

    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "Visit /docs to try the /generate endpoint!"}
