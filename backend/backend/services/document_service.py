import os
import uuid
from fastapi import UploadFile
from sqlalchemy.orm import Session
from database.session import get_db
from database.models import Document

class DocumentService:
    UPLOAD_DIR = "uploads"

    def __init__(self):
        os.makedirs(self.UPLOAD_DIR, exist_ok=True)

    async def save_document(self, file: UploadFile) -> Document:
        # Generate unique ID for the document
        doc_id = str(uuid.uuid4())
        
        # Create file path
        file_path = os.path.join(self.UPLOAD_DIR, f"{doc_id}.pdf")
        
        # Save file to disk
        content = await file.read()
        with open(file_path, "wb") as f:
            f.write(content)
        
        # Save document metadata to database
        db = next(get_db())
        document = Document(
            id=doc_id,
            name=file.filename,
            path=file_path,
            size=len(content)
        )
        
        db.add(document)
        db.commit()
        db.refresh(document)
        
        return document