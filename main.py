import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Pydantic Model for Request Body ---
class PromptRequest(BaseModel):
    
    prompt: str

# --- FastAPI App Initialization ---
app = FastAPI()

# --- Configure the Gemini API ---
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in environment variables.")

genai.configure(api_key=api_key)

# Initialize the Generative Model
model = genai.GenerativeModel('gemini-2.5-flash')


# --- API Endpoint ---
@app.post("/generate")
def generate_content(request: PromptRequest):
    try:
        # Generate content using the provided prompt
        intro = "write a story based on the given prompt in about 150 words"
        response = model.generate_content(intro + request.prompt)
        
        # Check if the response has text
        if not response.text:
            raise HTTPException(status_code=500, detail="Failed to generate content.")
            
        return {"response": response.text}

    except Exception as e:
        
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"An internal error occurred: {e}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Gemini API with FastAPI! Visit /docs to try the /generate endpoint."}