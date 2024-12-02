from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from datetime import datetime
from services.document_service import DocumentService
from services.qa_service import QAService
from database.models import init_db
from database.session import engine

app = FastAPI(title="PDF Q&A Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
document_service = DocumentService()
qa_service = QAService()

# Initialize database
init_db(engine)

class QuestionRequest(BaseModel):
    document_id: str
    question: str

class Answer(BaseModel):
    content: str
    document_id: str
    timestamp: datetime

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        document = await document_service.save_document(file)
        return document
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/question", response_model=Answer)
async def ask_question(request: QuestionRequest):
    try:
        answer = await qa_service.get_answer(request.document_id, request.question)
        return Answer(
            content=answer,
            document_id=request.document_id,
            timestamp=datetime.now()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)