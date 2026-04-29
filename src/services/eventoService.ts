import { API_BASE } from '../constants';
import { Evento, EventoRequestDto, EventoResponseDto } from '../types';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ${res.status}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json();
}

export const eventoService = {
  async listar(): Promise<EventoResponseDto[]> {
    const res = await fetch(API_BASE);
    return handleResponse<EventoResponseDto[]>(res);
  },

  async buscarPorId(id: number): Promise<EventoResponseDto> {
    const res = await fetch(`${API_BASE}/${id}`);
    return handleResponse<EventoResponseDto>(res);
  },

  async criar(dto: EventoRequestDto): Promise<EventoResponseDto> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    return handleResponse<EventoResponseDto>(res);
  },

  async atualizar(id: number, dto: EventoRequestDto): Promise<EventoResponseDto> {
    const res = await fetch(`${API_BASE}?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    return handleResponse<EventoResponseDto>(res);
  },

  async deletar(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    return handleResponse<void>(res);
  },

  async uploadImagem(id: number, file: File): Promise<Evento> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/${id}/imagem`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<Evento>(res);
  },
};
