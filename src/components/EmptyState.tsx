import React from 'react';

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, rgba(224,64,160,0.1), rgba(123,47,190,0.1))', border: '1px solid rgba(224,64,160,0.2)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke="#E040A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3 className="font-syne font-bold text-xl mb-2" style={{ color: '#0F0A1A' }}>
        Nenhum rolê por aqui ainda
      </h3>
      <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed font-dm">
        Seja o primeiro a cadastrar um evento e movimentar a galera!
      </p>

      <button
        onClick={onAdd}
        className="px-8 py-3 rounded-full font-dm font-medium text-white text-sm transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'linear-gradient(90deg, #E040A0, #7B2FBE)',
          boxShadow: '0 4px 20px rgba(224,64,160,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(224,64,160,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,64,160,0.3)';
        }}
      >
        + Adicionar Rolê
      </button>
    </div>
  );
}
