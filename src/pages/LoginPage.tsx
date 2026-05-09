import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // NOVO
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const letters = ['A', ' ', 'B', 'O', 'A'];

  const set = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Email ou senha inválidos');

      const data = await res.json();

      localStorage.setItem('token', data.token);

      navigate('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(224,64,160,0.2)',
    borderRadius: '12px',
    color: '#fff',
    padding: '0.75rem 1rem',
    width: '100%',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    color: '#E040A0',
    marginBottom: '6px',
    fontFamily: 'DM Sans, sans-serif',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  };

  const onFocus = (e: React.FocusEvent<any>) => {
    e.currentTarget.style.borderColor = '#E040A0';
    e.currentTarget.style.background = 'rgba(224,64,160,0.08)';
    e.currentTarget.style.boxShadow =
      '0 0 20px rgba(224,64,160,0.1)';
  };

  const onBlur = (e: React.FocusEvent<any>) => {
    e.currentTarget.style.borderColor =
      'rgba(224,64,160,0.2)';
    e.currentTarget.style.background =
      'rgba(255,255,255,0.04)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          'linear-gradient(135deg, #080010 0%, #0a0a0a 50%, #080010 100%)',
      }}
    >
      {/* Glow orbs */}
      <div
        className="fixed top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: '#E040A0',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div
        className="fixed bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{
          background: '#7B2FBE',
          transform: 'translate(50%, 50%)',
        }}
      />

      <div className="w-full max-w-md">

        {/* NOVO LOGO */}
        <div className="text-center mb-10">
          <h1 className="font-syne text-5xl font-extrabold mb-2 flex justify-center gap-1">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="inline-block transition-all duration-500"
                style={{
                  background:
                    'linear-gradient(180deg, #FF6B35, #E040A0, #7B2FBE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? 'translateY(0) scale(1)'
                    : 'translateY(-60px) scale(0.5)',
                  transitionDelay: `${i * 80}ms`,
                  filter: visible
                    ? 'drop-shadow(0 0 20px rgba(224,64,160,0.5))'
                    : 'none',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>

          <p
            className="text-sm font-dm transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? 'translateY(0)'
                : 'translateY(10px)',
              transitionDelay: '450ms',
              background:
                'linear-gradient(90deg, #aaa, #E040A0, #FF6B35, #7B2FBE, #aaa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
              animation: visible
                ? 'shimmer 4s linear infinite'
                : 'none',
            }}
          >
            Entra na festa 
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background:
              'linear-gradient(135deg, #0d0020, #0F0A1A)',
            border: '1px solid rgba(224,64,160,0.2)',
            boxShadow: '0 0 60px rgba(224,64,160,0.08)',
          }}
        >
          <h2 className="font-syne font-bold text-white text-xl mb-1">
            Entrar
          </h2>

          <div
            className="h-px mb-6 w-12"
            style={{
              background:
                'linear-gradient(90deg, #E040A0, transparent)',
            }}
          />

          {error && (
            <div
              className="mb-4 px-4 py-3 rounded-xl text-sm font-dm"
              style={{
                background: 'rgba(224,64,160,0.1)',
                border: '1px solid rgba(224,64,160,0.3)',
                color: '#E040A0',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label style={labelStyle}>Email</label>

              <input
                style={inputStyle}
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="seu@email.com"
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <div>
              <label style={labelStyle}>Senha</label>

              <input
                style={inputStyle}
                type="password"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                placeholder="••••••••"
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleSubmit()
                }
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !form.email ||
                !form.password
              }
              className="mt-2 py-4 rounded-2xl font-dm font-medium text-white disabled:opacity-50 transition-all duration-300 hover:-translate-y-1"
              style={{
                background:
                  'linear-gradient(90deg, #E040A0, #7B2FBE)',
                boxShadow:
                  '0 4px 20px rgba(224,64,160,0.3)',
                fontSize: '15px',
              }}
              onMouseEnter={(e) => {
                if (!loading)
                  e.currentTarget.style.boxShadow =
                    '0 8px 30px rgba(224,64,160,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 4px 20px rgba(224,64,160,0.3)';
              }}
            >
              {loading ? 'Entrando...' : '✦ Entrar'}
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm font-dm mt-6">
            Ainda não tem conta?{' '}
            <Link
              to="/register"
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}