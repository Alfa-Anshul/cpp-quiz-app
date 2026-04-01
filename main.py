from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

app = FastAPI(title="C++ Quiz App")

# Mount static files
app.mount("/static", StaticFiles(directory=".", html=True), name="static")

@app.get("/")
async def root():
    return FileResponse("index.html")

@app.get("/health")
async def health():
    return {"status": "ok", "app": "C++ Quiz App"}
