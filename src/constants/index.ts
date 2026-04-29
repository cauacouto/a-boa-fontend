import { TipoDoEvento } from '../types';

export const API_BASE = 'http://localhost:8080/evento';

export const TIPOS: { value: string; label: string }[] = [
{ value: '', label: 'Todos' },
  { value: 'REVEILLON', label: 'Réveillon' },
  { value: 'FESTIVAL', label: 'Festival' },
  { value: 'ELETRONICO', label: 'Eletrônico' },
  { value: 'AFTER', label: 'After' },
  { value: 'POOL_PARTY', label: 'Pool Party' },
  { value: 'OPEN_BAR', label: 'Open Bar' },
  { value: 'BALADA', label: 'Balada' },
  { value: 'CLUBE', label: 'Clube' },
  { value: 'PRIVADA', label: 'Privada' },
];

export const TIPO_COLORS: Record<string, string> = {
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


export const getTipoLabel = (tipo: TipoDoEvento | string): string => {
  return TIPOS.find((t) => t.value === tipo)?.label ?? tipo;
};

export const getTipoColor = (tipo: TipoDoEvento | string): string => {
  return TIPO_COLORS[tipo] ?? '#888888';
};
