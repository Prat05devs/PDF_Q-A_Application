# PDF Q&A Application

An intelligent document analysis application that allows users to upload PDF documents and ask questions about their content using natural language processing.

## Features

- PDF document upload and management
- Natural language question answering based on document content
- Real-time chat interface for document queries
- Document organization and history
- Responsive and modern UI design

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TanStack Query for data fetching and caching
- Zustand for state management
- Tailwind CSS for styling
- Lucide React for icons
- React Dropzone for file uploads

### Backend
- FastAPI for REST API
- LangChain/LlamaIndex for NLP processing
- SQLAlchemy for database ORM
- SQLite for data storage
- PyPDF for PDF processing

## Project Structure

```
├── src/
│   ├── components/           # React components
│   │   ├── chat/            # Chat-related components
│   │   ├── documents/       # Document management components
│   │   └── layout/         # Layout components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and API client
│   ├── store/              # State management
│   └── types/              # TypeScript type definitions
├── backend/
│   ├── database/           # Database models and configuration
│   ├── services/           # Business logic services
│   └── main.py            # FastAPI application entry point
```

## Setup Instructions

1. Install frontend dependencies:
   ```bash
   npm install
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   # backend/.env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development servers:
   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   npm run backend
   ```

## API Documentation

### Endpoints

#### `POST /api/upload`
Upload a PDF document.
- Request: Multipart form data with 'file' field
- Response: Document metadata including ID and name

#### `POST /api/question`
Ask a question about a document.
- Request Body:
  ```json
  {
    "document_id": "string",
    "question": "string"
  }
  ```
- Response: Answer with timestamp and metadata