import React from 'react';
import { FileQuestion } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <FileQuestion className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">PDF Q&A Assistant</h1>
        </div>
      </div>
    </header>
  );
}