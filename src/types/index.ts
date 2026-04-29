export type TipoDoEvento =
  | 'FESTIVAL'
  | 'SAMBA'
  | 'PAGODE'
  | 'AFTER'
  | 'CULTURAL'
  | 'ESPORTIVO'
  | 'GASTRONOMICO'
  | 'FEIRA'
  | 'OUTROS';

export interface Evento {
  id: number;
  nome: string;
  tipo: TipoDoEvento;
  data: string | null;
  local: string;
  descricao: string;
  organizador: string;
  imageUrl: string | null;
}

export interface EventoRequestDto {
  nome: string;
  tipo: TipoDoEvento;
  data: string | null;
  local: string;
  descricao: string;
  organizador: string;
}

export interface EventoResponseDto {
  id: number;
  nome: string;
  tipo: TipoDoEvento;
  data: string | null;
  local: string;
  descricao: string;
  organizador: string;
  imageUrl: string | null;
}

export interface FiltroState {
  tipo: string;
  busca: string;
}
