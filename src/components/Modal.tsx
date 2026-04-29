import React, { useEffect, useState } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300"
      style={{ background: visible ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
       className="w-full max-w-lg rounded-3xl p-8 transition-all duration-300"
        style={{
           overflowY: 'visible',
          overflowX: 'visible',
          background: 'linear-gradient(135deg, #0d0020 0%, #0F0A1A 100%)',
          border: '1px solid rgba(224,64,160,0.3)',
          boxShadow: '0 0 60px rgba(224,64,160,0.15), 0 0 120px rgba(123,47,190,0.1)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          backgroundImage: `
          //   linear-gradient(rgba(224,64,160,0.05) 1px, transparent 1px),
          //   linear-gradient(90deg, rgba(224,64,160,0.05) 1px, transparent 1px)
          // `,
          // backgroundSize: '40px 40px',
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2
              className="font-syne font-bold text-2xl"
              style={{
                background: 'linear-gradient(90deg, #E040A0, #FF6B35, #7B2FBE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </h2>
            <div
              className="h-px mt-1 w-16"
              style={{ background: 'linear-gradient(90deg, #E040A0, transparent)' }}
            />
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(224,64,160,0.1)',
              border: '1px solid rgba(224,64,160,0.3)',
              color: '#E040A0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(224,64,160,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(224,64,160,0.1)';
            }}
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
