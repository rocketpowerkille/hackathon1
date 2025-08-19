from fastapi import FastAPI


app = FastAPI()



@app.get("/")
def read_root():
    """
    Root endpoint that returns a welcome message.
    """
    return {"message": "Server is running! 👋"}



