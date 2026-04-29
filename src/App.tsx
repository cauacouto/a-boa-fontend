import React, { useRef, useState } from 'react';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { EventForm } from './components/EventForm';
import { Modal } from './components/Modal';
import { EmptyState } from './components/EmptyState';
import { SkeletonGrid } from './components/SkeletonCard';
import { ErrorBanner } from './components/ErrorBanner';
import { useEventos } from './hooks/useEventos';
import { EventoResponseDto, EventoRequestDto } from './types';

export default function App() {
  const {
    eventos,
    loading,
    saving,
    error,
    clearError,
    fetchEventos,
    criarEvento,
    atualizarEvento,
    deletarEvento,
    uploadImagem,
  } = useEventos();

  const [filtro, setFiltro] = useState('');
  const [busca, setBusca] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editando, setEditando] = useState<EventoResponseDto | null>(null);
  const [uploadId, setUploadId] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = eventos.filter((e) => {
    const matchTipo = !filtro || e.tipo === filtro;
    const term = busca.toLowerCase();
    const matchBusca =
      !busca ||
      e.nome?.toLowerCase().includes(term) ||
      e.local?.toLowerCase().includes(term);
    return matchTipo && matchBusca;
  });

  const handleCriar = async (dto: EventoRequestDto) => {
    const ok = await criarEvento(dto);
    if (ok) setShowAdd(false);
  };

  const handleAtualizar = async (dto: EventoRequestDto) => {
    if (!editando) return;
    const ok = await atualizarEvento(editando.id, dto);
    if (ok) setEditando(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este rolê?')) return;
    await deletarEvento(id);
  };

  const handleImageUpload = (id: number) => {
    setUploadId(id);
    fileRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadId !== null) {
      await uploadImagem(uploadId, file);
      setUploadId(null);
    }
    e.target.value = '';
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #080010 0%, #0a0a0a 50%, #080010 100%)' }}
    >
      <Hero onAddClick={() => setShowAdd(true)} onRefresh={fetchEventos} />
      <FilterBar
        busca={busca}
        filtro={filtro}
        onBuscaChange={setBusca}
        onFiltroChange={setFiltro}
      />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <ErrorBanner message={error} onClose={clearError} />

        <div className="flex justify-between items-center mb-6">
          <h2
            className="font-syne font-medium text-xl"
            style={{
              background: 'linear-gradient(90deg, #E040A0, #FF6B35, #7B2FBE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Rolês que estão bombando
            {filtered.length > 0 && (
              <span style={{ WebkitTextFillColor: '#888', fontSize: '14px', fontFamily: 'DM Sans' }}>
                {' '}({filtered.length})
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <EmptyState onAdd={() => setShowAdd(true)} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((e) => (
              <EventCard
                key={e.id}
                evento={e}
                onEdit={setEditando}
                onDelete={handleDelete}
                onImageUpload={handleImageUpload}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div
            className="mt-12 rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #E040A0 0%, #7B2FBE 100%)' }}
          >
            <h3 className="font-syne font-bold text-white text-2xl mb-2">
              Não achou seu rolê ideal?
            </h3>
            <p className="text-pink-100 text-sm mb-5 font-dm">
              Compartilhe com a galera e faça acontecer!
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-white text-pink-600 font-dm font-medium px-8 py-3 rounded-full text-sm hover:bg-pink-50 transition-colors"
            >
              + Criar Novo Rolê
            </button>
          </div>
        )}
      </main>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {showAdd && (
        <Modal title="+ Novo Rolê" onClose={() => setShowAdd(false)}>
          <EventForm onSubmit={handleCriar} loading={saving} />
        </Modal>
      )}

      {editando && (
        <Modal title="Editar Rolê" onClose={() => setEditando(null)}>
          <EventForm
            initial={editando}
            onSubmit={handleAtualizar}
            loading={saving}
          />
        </Modal>
      )}
    </div>
  );
}
