import React from 'react';
import { EventoResponseDto } from '../types';
import { getTipoLabel, getTipoColor } from '../constants';
import { formatDate } from '../utils';

interface EventCardProps {
  evento: EventoResponseDto;
  onEdit: (evento: EventoResponseDto) => void;
  onDelete: (id: number) => void;
  onImageUpload: (id: number) => void;
}

export function EventCard({ evento, onEdit, onDelete, onImageUpload }: EventCardProps) {
  const cor = getTipoColor(evento.tipo);
  const label = getTipoLabel(evento.tipo);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1"
      style={{
        background: '#1A1228',
        border: '1px solid #2D2040',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Flyer / Imagem */}
      <div
        className="relative h-44 overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1a0533, #2D2040)' }}
      >
        {evento.imageUrl ? (
          <img
            src={evento.imageUrl}
            alt={evento.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">🎭</span>
            <button
              onClick={() => onImageUpload(evento.id)}
              className="text-xs text-gray-400 hover:text-pink-400 border border-gray-600 hover:border-pink-400 px-3 py-1 rounded-full transition-all"
            >
              + Adicionar flyer
            </button>
          </div>
        )}

        {/* Badge tipo */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-dm font-medium px-3 py-1 rounded-full"
            style={{
              background: `${cor}22`,
              color: cor,
              border: `1px solid ${cor}44`,
            }}
          >
            {label}
          </span>
        </div>

        {/* Overlay no hover para trocar imagem */}
        {evento.imageUrl && (
          <button
            onClick={() => onImageUpload(evento.id)}
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-xs text-white font-dm"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            Trocar flyer
          </button>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h3 className="font-syne font-bold text-white text-base mb-1 truncate">
          {evento.nome}
        </h3>

        {evento.local && (
          <p className="text-gray-400 text-xs mb-1 truncate">📍 {evento.local}</p>
        )}

        {evento.data && (
          <p className="text-gray-500 text-xs mb-2">{formatDate(evento.data)}</p>
        )}

        {evento.descricao && (
          <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
            {evento.descricao}
          </p>
        )}

        {evento.organizador && (
          <p className="text-xs text-gray-500 font-dm">
            por{' '}
            <span className="text-pink-400">{evento.organizador}</span>
          </p>
        )}

        {/* Ações */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit(evento)}
            className="flex-1 text-xs py-2 rounded-lg border border-gray-700 hover:border-pink-400 text-gray-400 hover:text-pink-400 transition-all font-dm"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(evento.id)}
            className="flex-1 text-xs py-2 rounded-lg border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 transition-all font-dm"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
