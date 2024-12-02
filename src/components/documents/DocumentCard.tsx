import React from 'react';
import { FileText } from 'lucide-react';
import { clsx } from 'clsx';
import { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  isSelected: boolean;
  onClick: () => void;
}

export function DocumentCard({ document, isSelected, onClick }: DocumentCardProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-full flex items-center space-x-3 p-3 rounded-lg transition-colors',
        isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
      )}
    >
      <FileText className="h-6 w-6 text-gray-500" />
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-900 truncate">{document.name}</p>
        <p className="text-sm text-gray-500">
          {new Date(document.uploadDate).toLocaleDateString()}
        </p>
      </div>
    </button>
  );
}