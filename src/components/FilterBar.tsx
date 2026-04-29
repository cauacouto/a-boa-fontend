import React, { useState, useRef, useEffect } from 'react';
import { TIPOS } from '../constants';

interface FilterBarProps {
  busca: string;
  filtro: string;
  onBuscaChange: (v: string) => void;
  onFiltroChange: (v: string) => void;
}

export function FilterBar({ busca, filtro, onBuscaChange, onFiltroChange }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = TIPOS.find((t) => t.value === filtro)?.label ?? 'Todos';

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div
      className="sticky top-0 z-10 px-4 py-4"
      style={{
        background: 'rgba(10,0,21,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(224,64,160,0.2)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
        backgroundImage: `
          linear-gradient(rgba(224,64,160,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(224,64,160,0.07) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    >
      <div className="max-w-5xl mx-auto flex gap-3 items-center">

        {/* Campo de busca */}
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            value={busca}
            onChange={(e) => onBuscaChange(e.target.value)}
            placeholder="Buscar por rolê ou local..."
            className="w-full pl-10 pr-4 py-2.5 text-sm font-dm text-gray-200 rounded-3xl focus:outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1.5px solid rgba(224,64,160,0.2)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#E040A0';
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(224,64,160,0.2)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          />
        </div>

        {/* Dropdown de tipo */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-3xl text-sm font-dm font-medium transition-all duration-200"
            style={
              filtro
                ? {
                    background: 'linear-gradient(90deg, #E040A0, #7B2FBE)',
                    color: '#fff',
                    border: '1.5px solid transparent',
                    boxShadow: '0 4px 12px rgba(224,64,160,0.35)',
                  }
                : {
                    background: 'rgba(255,255,255,0.05)',
                    color: '#ccc',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                  }
            }
          >
            {selectedLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-200"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden z-50"
              style={{
                background: 'linear-gradient(135deg, #0d0020, #0F0A1A)',
                border: '1px solid rgba(224,64,160,0.25)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(224,64,160,0.1)',
                animation: 'dropIn 0.2s ease',
              }}
            >
              <style>{`
                @keyframes dropIn {
                  from { opacity: 0; transform: translateY(-8px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              {TIPOS.map((t, i) => (
                <button
                  key={t.value}
                  onClick={() => { onFiltroChange(t.value); setOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm font-dm transition-all duration-150"
                  style={{
                    background: filtro === t.value ? 'rgba(224,64,160,0.15)' : 'transparent',
                    color: filtro === t.value ? '#E040A0' : '#ccc',
                    borderBottom: i < TIPOS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (filtro !== t.value) e.currentTarget.style.background = 'rgba(224,64,160,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    if (filtro !== t.value) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {filtro === t.value && <span className="mr-2">✦</span>}
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}