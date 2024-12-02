from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from transformers import pipeline
from database.session import get_db
from database.models import Document

class QAService:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        # Use Hugging Face embeddings
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        # Optionally, use a Hugging Face pipeline for LLM-like behavior
        self.llm = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")

    async def get_answer(self, document_id: str, question: str) -> str:
        # Get document from database
        db = next(get_db())
        document = db.query(Document).filter(Document.id == document_id).first()
        
        if not document:
            raise ValueError("Document not found")

        # Load and process the PDF
        loader = PyPDFLoader(document.path)
        pages = loader.load()
        texts = self.text_splitter.split_documents(pages)
        
        # Create vector store
        vectorstore = FAISS.from_documents(texts, self.embeddings)
        
        # Get relevant documents
        docs = vectorstore.similarity_search(question)
        relevant_texts = " ".join([doc.page_content for doc in docs])

        # Generate answer using Hugging Face pipeline
        answer = self.llm({"context": relevant_texts, "question": question})
        
        return answer['answer']