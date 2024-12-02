import { create } from 'zustand';
import { Document, Message, Conversation } from '../types';
import { ApiService } from '../services/api';

interface Store {
  documents: Document[];
  selectedDocument: Document | null;
  conversations: Record<string, Conversation>;
  isLoading: boolean;
  error: string | null;
  addDocument: (file: File) => Promise<void>;
  selectDocument: (document: Document | null) => void;
  addMessage: (documentId: string, content: string) => Promise<void>;
  clearError: () => void;
}

export const useStore = create<Store>((set, get) => ({
  documents: [],
  selectedDocument: null,
  conversations: {},
  isLoading: false,
  error: null,
  
  // Upload a new document and add it to the store
  addDocument: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      // Upload document to backend
      const newDocument = await ApiService.uploadDocument(file);
      
      // Update store with new document and create conversation
      set((state) => ({
        documents: [...state.documents, newDocument],
        conversations: {
          ...state.conversations,
          [newDocument.id]: {
            id: newDocument.id,
            documentId: newDocument.id,
            messages: [],
          },
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to upload document',
        isLoading: false 
      });
    }
  },
  
  // Select a document for viewing/questioning
  selectDocument: (document) => {
    set({ selectedDocument: document });
  },
  
  // Add a new message to a conversation and get AI response
  addMessage: async (documentId: string, content: string) => {
    set({ isLoading: true, error: null });
    
    // Create question message
    const question: Message = {
      id: Date.now().toString(),
      content,
      type: 'question',
      timestamp: new Date(),
    };
    
    // Add question to conversation immediately
    set((state) => ({
      conversations: {
        ...state.conversations,
        [documentId]: {
          ...state.conversations[documentId],
          messages: [...state.conversations[documentId].messages, question],
        },
      },
    }));
    
    try {
      // Get answer from backend
      const answer = await ApiService.askQuestion(documentId, content);
      
      // Add answer to conversation
      set((state) => ({
        conversations: {
          ...state.conversations,
          [documentId]: {
            ...state.conversations[documentId],
            messages: [...state.conversations[documentId].messages, answer],
          },
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to get answer',
        isLoading: false 
      });
    }
  },
  
  // Clear any error messages
  clearError: () => set({ error: null }),
}));