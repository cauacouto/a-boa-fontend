import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const email = sessionStorage.getItem('userEmail') ?? '';
  const inicial = email.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div ref={ref} className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-bold text-white transition-all duration-200 hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #E040A0, #7B2FBE)',
          boxShadow: open ? '0 0 20px rgba(224,64,160,0.5)' : '0 0 10px rgba(224,64,160,0.2)',
          border: '2px solid rgba(224,64,160,0.4)',
        }}
      >
        {inicial}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden z-50"
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

          {/* Info do usuário */}
          <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(224,64,160,0.15)' }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-syne font-bold text-white mb-2"
              style={{ background: 'linear-gradient(135deg, #E040A0, #7B2FBE)' }}
            >
              {inicial}
            </div>
            <p className="text-white text-sm font-dm font-medium truncate">{email}</p>
          </div>

          {/* Opções */}
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-dm transition-all duration-150"
              style={{ color: '#E040A0' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(224,64,160,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
                  stroke="#E040A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}