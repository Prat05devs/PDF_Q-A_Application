import React from 'react';
import { Header } from './components/layout/Header';
import { FileUpload } from './components/FileUpload';
import { DocumentList } from './components/documents/DocumentList';
import { ChatInterface } from './components/chat/ChatInterface';
import { useStore } from './store/useStore';
import { FileQuestion } from 'lucide-react';

function App() {
  const selectedDocument = useStore((state) => state.selectedDocument);
  const addDocument = useStore((state) => state.addDocument);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-6">
            <FileUpload onFileSelect={addDocument} />
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Your Documents</h2>
              <DocumentList />
            </div>
          </div>

          <div className="col-span-8">
            {selectedDocument ? (
              <div className="bg-white rounded-lg shadow h-[600px]">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">
                    Chat about: {selectedDocument.name}
                  </h2>
                </div>
                <ChatInterface documentId={selectedDocument.id} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FileQuestion className="h-16 w-16 text-gray-400 mx-auto" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Select a Document
                </h2>
                <p className="mt-2 text-gray-500">
                  Choose a document from the list to start asking questions
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;