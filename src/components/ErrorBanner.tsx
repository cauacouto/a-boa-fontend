import React from 'react';

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  if (!message) return null;
  return (
    <div
      className="mb-6 p-4 rounded-xl text-sm font-dm flex justify-between items-start gap-4"
      style={{
        background: 'rgba(224,64,160,0.1)',
        border: '1px solid rgba(224,64,160,0.3)',
        color: '#E040A0',
      }}
    >
      <span>⚠️ {message}</span>
      <button onClick={onClose} className="underline whitespace-nowrap hover:opacity-70 transition-opacity">
        Fechar
      </button>
    </div>
  );
}
