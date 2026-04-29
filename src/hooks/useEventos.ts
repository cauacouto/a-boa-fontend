import { useState, useEffect, useCallback } from 'react';
import { EventoResponseDto, EventoRequestDto } from '../types';
import { eventoService } from '../services/eventoService';

interface UseEventosReturn {
  eventos: EventoResponseDto[];
  loading: boolean;
  saving: boolean;
  error: string;
  clearError: () => void;
  fetchEventos: () => Promise<void>;
  criarEvento: (dto: EventoRequestDto) => Promise<boolean>;
  atualizarEvento: (id: number, dto: EventoRequestDto) => Promise<boolean>;
  deletarEvento: (id: number) => Promise<boolean>;
  uploadImagem: (id: number, file: File) => Promise<boolean>;
}

export function useEventos(): UseEventosReturn {
  const [eventos, setEventos] = useState<EventoResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchEventos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await eventoService.listar();
      setEventos(data);
    } catch (e: any) {
      setError(e.message || 'Não foi possível conectar à API.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  const criarEvento = async (dto: EventoRequestDto): Promise<boolean> => {
    setSaving(true);
    try {
      await eventoService.criar(dto);
      await fetchEventos();
      return true;
    } catch (e: any) {
      setError(e.message || 'Erro ao criar evento.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const atualizarEvento = async (id: number, dto: EventoRequestDto): Promise<boolean> => {
    setSaving(true);
    try {
      await eventoService.atualizar(id, dto);
      await fetchEventos();
      return true;
    } catch (e: any) {
      setError(e.message || 'Erro ao atualizar evento.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deletarEvento = async (id: number): Promise<boolean> => {
    try {
      await eventoService.deletar(id);
      await fetchEventos();
      return true;
    } catch (e: any) {
      setError(e.message || 'Erro ao excluir evento.');
      return false;
    }
  };

  const uploadImagem = async (id: number, file: File): Promise<boolean> => {
    try {
      await eventoService.uploadImagem(id, file);
      await fetchEventos();
      return true;
    } catch (e: any) {
      setError(e.message || 'Erro ao enviar imagem.');
      return false;
    }
  };

  return {
    eventos,
    loading,
    saving,
    error,
    clearError: () => setError(''),
    fetchEventos,
    criarEvento,
    atualizarEvento,
    deletarEvento,
    uploadImagem,
  };
}
