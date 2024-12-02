import { Document, Message } from '../types';
import { API_ENDPOINTS } from '../config/constants';

export class ApiService {
  private static baseUrl = 'http://localhost:8000';

  private static getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  static async uploadDocument(file: File): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(this.getUrl(API_ENDPOINTS.upload), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to upload document');
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      uploadDate: new Date(data.upload_date),
      size: data.size,
    };
  }

  static async askQuestion(documentId: string, question: string): Promise<Message> {
    const response = await fetch(this.getUrl(API_ENDPOINTS.question), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document_id: documentId,
        question,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get answer');
    }

    const data = await response.json();
    return {
      id: Date.now().toString(),
      content: data.content,
      type: 'answer',
      timestamp: new Date(data.timestamp),
    };
  }
}