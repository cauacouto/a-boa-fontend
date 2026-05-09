import { API_BASE } from '../constants';
import { Evento, EventoRequestDto, EventoResponseDto } from '../types';

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

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
    const res = await fetch(API_BASE, {
      headers: authHeaders(),
    });
    return handleResponse<EventoResponseDto[]>(res);
  },

  async buscarPorId(id: number): Promise<EventoResponseDto> {
    const res = await fetch(`${API_BASE}/${id}`, {
      headers: authHeaders(),
    });
    return handleResponse<EventoResponseDto>(res);
  },

  async criar(dto: EventoRequestDto): Promise<EventoResponseDto> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(dto),
    });
    return handleResponse<EventoResponseDto>(res);
  },

  async atualizar(id: number, dto: EventoRequestDto): Promise<EventoResponseDto> {
    const res = await fetch(`${API_BASE}?id=${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(dto),
    });
    return handleResponse<EventoResponseDto>(res);
  },

  async deletar(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse<void>(res);
  },

  async uploadImagem(id: number, file: File): Promise<Evento> {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/${id}/imagem`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    return handleResponse<Evento>(res);
  },
};