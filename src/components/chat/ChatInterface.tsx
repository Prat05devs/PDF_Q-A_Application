import React from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { useStore } from '../../store/useStore';

interface ChatInterfaceProps {
  documentId: string;
}

export function ChatInterface({ documentId }: ChatInterfaceProps) {
  const conversation = useStore((state) => state.conversations[documentId]);
  const addMessage = useStore((state) => state.addMessage);
  const isLoading = useStore((state) => state.isLoading);
  const error = useStore((state) => state.error);
  const clearError = useStore((state) => state.clearError);

  // Clear error when component unmounts or documentId changes
  React.useEffect(() => {
    return () => clearError();
  }, [documentId, clearError]);

  const handleSendMessage = async (content: string) => {
    await addMessage(documentId, content);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation?.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-pulse text-gray-500">Processing...</div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">
            {error}
            <button 
              onClick={clearError}
              className="ml-2 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}