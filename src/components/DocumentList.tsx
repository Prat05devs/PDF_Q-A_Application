import React from 'react';
import { FileText } from 'lucide-react';
import { Document } from '../types';

interface DocumentListProps {
  documents: Document[];
  onSelectDocument: (document: Document) => void;
  selectedDocumentId?: string;
}

export function DocumentList({ documents, onSelectDocument, selectedDocumentId }: DocumentListProps) {
  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <button
          key={doc.id}
          onClick={() => onSelectDocument(doc)}
          className={clsx(
            'w-full flex items-center space-x-3 p-3 rounded-lg transition-colors',
            selectedDocumentId === doc.id
              ? 'bg-blue-100'
              : 'hover:bg-gray-100'
          )}
        >
          <FileText className="h-6 w-6 text-gray-500" />
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900 truncate">{doc.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(doc.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}