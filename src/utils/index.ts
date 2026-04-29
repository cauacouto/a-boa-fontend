export function formatDate(dt: string | null): string {
  if (!dt) return '';
  const d = new Date(dt);
  return (
    d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) +
    ' · ' +
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  );
}

export function toDatetimeLocal(isoString: string | null): string {
  if (!isoString) return '';
  return isoString.slice(0, 16);
}

export function toISOWithSeconds(datetimeLocal: string): string {
  if (!datetimeLocal) return '';
  return datetimeLocal + ':00';
}
