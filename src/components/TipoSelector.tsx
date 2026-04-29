import React, { useState } from 'react';
import { TIPOS,getTipoColor } from '../constants';

const TIPO_ICONS: Record<string, string> = {
  REVEILLON: '🎆',
  FESTIVAL: '🎪',
  ELETRONICO: '🎧',
  AFTER: '🌙',
  POOL_PARTY: '🏊',
  OPEN_BAR: '🍹',
  BALADA: '🪩',
  CLUBE: '🏛️',
  PRIVADA: '🔒',
};


interface TipoSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TipoSelector({ value, onChange }: TipoSelectorProps) {
  const [open, setOpen] = useState(false);
  const selected = TIPOS.find((t) => t.value === value) ?? TIPOS[1];

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1.5px solid rgba(224,64,160,0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <span>{TIPO_ICONS[value] ?? '✨'}</span>
          <span className="text-sm font-dm text-white">{selected.label}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="#E040A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Popup overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6"
            style={{
              background: 'linear-gradient(135deg, #0d0020, #0F0A1A)',
              border: '1px solid rgba(224,64,160,0.3)',
              boxShadow: '0 0 60px rgba(224,64,160,0.2)',
              animation: 'dropIn 0.25s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <style>{`
              @keyframes dropIn {
                from { opacity: 0; transform: scale(0.92); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>

            <h3
              className="font-syne font-bold text-lg mb-5 text-center"
              style={{
                background: 'linear-gradient(90deg, #E040A0, #7B2FBE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Qual o tipo do rolê?
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {TIPOS.filter((t) => t.value).map((t) => {
                const isSelected = t.value === value;
                const cor = getTipoColor(t.value);
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => { onChange(t.value); setOpen(false); }}
                    className="flex flex-col items-center gap-2 py-4 px-3 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${cor}33, ${cor}11)`
                        : 'rgba(255,255,255,0.04)',
                      border: isSelected
                        ? `1.5px solid ${cor}`
                        : '1.5px solid rgba(255,255,255,0.08)',
                      boxShadow: isSelected ? `0 4px 20px ${cor}44` : 'none',
                    }}
                  >
                    <span className="text-3xl">{TIPO_ICONS[t.value] ?? '✨'}</span>
                    <span
                      className="text-xs font-dm font-medium"
                      style={{ color: isSelected ? cor : '#ccc' }}
                    >
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}