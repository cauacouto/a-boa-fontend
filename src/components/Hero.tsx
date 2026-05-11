import React, { useEffect, useState } from 'react';
import { UserMenu } from './UserMenu';

interface HeroProps {
  onAddClick: () => void;
  onRefresh: () => void;
}

export function Hero({ onAddClick, onRefresh }: HeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const letters = ['✦ ', 'A', ' ', 'B', 'O', 'A', ' ✦'];

  return (
    <div
      className="relative px-6 pt-16 pb-20 text-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #080010 0%, #0a0a0a 50%, #080010 100%)' }}
    >
      {/* UserMenu no canto superior direito */}
      <div className="absolute top-5 right-6 z-20">
        <UserMenu />
      </div>

      {/* Grid futurista de fundo */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(224,64,160,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224,64,160,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: '#E040A0', transform: 'translate(-50%, -50%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: '#7B2FBE', transform: 'translate(50%, 50%)' }}
      />

      {/* Conteúdo */}
      <div className="relative z-10">
        <p
          className="text-xs tracking-widest text-pink-400 font-dm uppercase mb-6 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-20px)',
          }}
        >
          ✦ Rio de Janeiro ✦
        </p>

        {/* Título letra por letra */}
        <h1 className="font-syne text-7xl font-extrabold mb-6 flex justify-center gap-1">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-500"
              style={{
                background: 'linear-gradient(180deg, #FF6B35, #E040A0, #7B2FBE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(-60px) scale(0.5)',
                transitionDelay: `${i * 80}ms`,
                filter: visible ? 'drop-shadow(0 0 20px rgba(224,64,160,0.5))' : 'none',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Linha decorativa */}
        <div
          className="mx-auto mb-6 h-px transition-all duration-1000"
          style={{
            background: 'linear-gradient(90deg, transparent, #E040A0, #7B2FBE, transparent)',
            width: visible ? '300px' : '0px',
            transitionDelay: '500ms',
          }}
        />

        <p
          className="text-base font-dm max-w-md mx-auto mb-10 leading-relaxed transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms',
            background: 'linear-gradient(90deg, #aaa, #E040A0, #FF6B35, #7B2FBE, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% auto',
            animation: 'shimmer 4s linear infinite',
          }}
        >
          Descobre, compartilha e registra os melhores rolês que estão agitando o Rio —
          do baile ao after!
        </p>

        <div
          className="flex gap-3 justify-center flex-wrap transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '550ms',
          }}
        >
          <button
            onClick={onAddClick}
            className="relative flex items-center gap-2 px-8 py-3 rounded-full font-dm font-medium text-white text-sm overflow-hidden group"
            style={{ background: 'linear-gradient(90deg, #E040A0, #7B2FBE)' }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(90deg, #7B2FBE, #E040A0)' }}
            />
            <span className="relative">+ Adicionar Rolê</span>
          </button>

          <button
            onClick={onRefresh}
            className="px-8 py-3 rounded-full font-dm text-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(224,64,160,0.4)',
              color: '#ccc',
              background: 'rgba(224,64,160,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#E040A0';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.background = 'rgba(224,64,160,0.15)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(224,64,160,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(224,64,160,0.4)';
              e.currentTarget.style.color = '#ccc';
              e.currentTarget.style.background = 'rgba(224,64,160,0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}