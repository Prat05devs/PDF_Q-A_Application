import React from 'react';
import { DocumentCard } from './DocumentCard';
import { useStore } from '../../store/useStore';

export function DocumentList() {
  const documents = useStore((state) => state.documents);
  const selectedDocument = useStore((state) => state.selectedDocument);
  const selectDocument = useStore((state) => state.selectDocument);

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          isSelected={selectedDocument?.id === doc.id}
          onClick={() => selectDocument(doc)}
        />
      ))}
    </div>
  );
}