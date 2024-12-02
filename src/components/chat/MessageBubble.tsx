import React from 'react';
import { clsx } from 'clsx';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={clsx(
        'max-w-[80%] rounded-lg p-4',
        message.type === 'question'
          ? 'bg-blue-100 ml-auto'
          : 'bg-gray-100'
      )}
    >
      <p className="text-gray-800">{message.content}</p>
      <span className="text-xs text-gray-500 mt-1 block">
        {message.timestamp.toLocaleTimeString()}
      </span>
    </div>
  );
}