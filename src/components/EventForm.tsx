import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { EventoRequestDto, EventoResponseDto, TipoDoEvento } from '../types';
import { toISOWithSeconds } from '../utils';
import { TipoSelector } from './TipoSelector';

registerLocale('pt-BR', ptBR);

interface EventFormProps {
  initial?: Partial<EventoResponseDto>;
  onSubmit: (dto: EventoRequestDto) => void;
  loading: boolean;
}

const DEFAULT_FORM: EventoRequestDto = {
  nome: '',
  tipo: 'FESTIVAL',
  data: null,
  local: '',
  descricao: '',
  organizador: '',
};

export function EventForm({ initial, onSubmit, loading }: EventFormProps) {
  const [form, setForm] = useState<EventoRequestDto>({
    ...DEFAULT_FORM,
    ...initial,
    data: initial?.data ? initial.data.slice(0, 16) : '',
  } as EventoRequestDto);

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initial?.data ? new Date(initial.data) : null
  );

  const set = <K extends keyof EventoRequestDto>(key: K, value: EventoRequestDto[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const iso = date.toISOString().slice(0, 16);
      set('data', iso);
    } else {
      set('data', null);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      data: form.data ? toISOWithSeconds(form.data as string) : null,
    });
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
    e.currentTarget.style.boxShadow = '0 0 20px rgba(224,64,160,0.1)';
  };

  const onBlur = (e: React.FocusEvent<any>) => {
    e.currentTarget.style.borderColor = 'rgba(224,64,160,0.2)';
    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <div className="flex flex-col gap-5">
      <style>{`
        .boa-datepicker {
          background: #0d0020 !important;
          border: 1px solid rgba(224,64,160,0.3) !important;
          border-radius: 16px !important;
          font-family: 'DM Sans', sans-serif !important;
          box-shadow: 0 0 40px rgba(224,64,160,0.2) !important;
          color: #fff !important;
        }
        .boa-datepicker .react-datepicker__header {
          background: linear-gradient(135deg, #1a0030, #0d0020) !important;
          border-bottom: 1px solid rgba(224,64,160,0.2) !important;
          border-radius: 16px 16px 0 0 !important;
          padding: 12px !important;
        }
        .boa-datepicker .react-datepicker__current-month,
        .boa-datepicker .react-datepicker-time__header {
          color: #E040A0 !important;
          font-size: 14px !important;
          font-weight: 600 !important;
        }
        .boa-datepicker .react-datepicker__day-name {
          color: #7B2FBE !important;
          font-size: 11px !important;
          font-weight: 500 !important;
        }
        .boa-datepicker .react-datepicker__day {
          color: #ccc !important;
          border-radius: 8px !important;
          transition: all 0.15s !important;
        }
        .boa-datepicker .react-datepicker__day:hover {
          background: rgba(224,64,160,0.2) !important;
          color: #fff !important;
        }
        .boa-datepicker .react-datepicker__day--selected,
        .boa-datepicker .react-datepicker__day--keyboard-selected {
          background: linear-gradient(90deg, #E040A0, #7B2FBE) !important;
          color: #fff !important;
          font-weight: 600 !important;
        }
        .boa-datepicker .react-datepicker__day--today {
          border: 1px solid rgba(224,64,160,0.5) !important;
          color: #E040A0 !important;
          background: transparent !important;
        }
        .boa-datepicker .react-datepicker__day--today.react-datepicker__day--selected {
          background: linear-gradient(90deg, #E040A0, #7B2FBE) !important;
          color: #fff !important;
        }
        .boa-datepicker .react-datepicker__navigation-icon::before {
          border-color: #E040A0 !important;
        }
        .boa-datepicker .react-datepicker__month-container {
          background: #0d0020 !important;
          border-radius: 16px !important;
        }
        .boa-datepicker .react-datepicker__time-container {
          border-left: 1px solid rgba(224,64,160,0.2) !important;
        }
        .boa-datepicker .react-datepicker__time {
          background: #0d0020 !important;
        }
        .boa-datepicker .react-datepicker__time-list {
          background: #0d0020 !important;
        }
        .boa-datepicker .react-datepicker__time-list-item {
          color: #ccc !important;
          transition: all 0.15s !important;
        }
        .boa-datepicker .react-datepicker__time-list-item:hover {
          background: rgba(224,64,160,0.2) !important;
          color: #fff !important;
        }
        .boa-datepicker .react-datepicker__time-list-item--selected {
          background: linear-gradient(90deg, #E040A0, #7B2FBE) !important;
          color: #fff !important;
          font-weight: 600 !important;
        }
        .boa-datepicker .react-datepicker__day--outside-month {
          color: #444 !important;
        }
        .react-datepicker-wrapper {
          width: 100% !important;
        }
        .react-datepicker-popper {
          z-index: 9999 !important;
        }
      `}</style>

      <div>
        <label style={labelStyle}>Nome do Rolê *</label>
        <input
          style={inputStyle}
          value={form.nome}
          onChange={(e) => set('nome', e.target.value)}
          placeholder="Ex: Baile da Heavy"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <div>
        <label style={labelStyle}>Tipo *</label>
        <TipoSelector
          value={form.tipo}
          onChange={(v) => set('tipo', v as TipoDoEvento)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Data e Hora</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            locale="pt-BR"
            placeholderText="Selecionar data..."
            calendarClassName="boa-datepicker"
            customInput={<input style={inputStyle} onFocus={onFocus} onBlur={onBlur} />}
          />
        </div>
        <div>
          <label style={labelStyle}>Local</label>
          <input
            style={inputStyle}
            value={form.local}
            onChange={(e) => set('local', e.target.value)}
            placeholder="Ex: Lapa, RJ"
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Organizador</label>
        <input
          style={inputStyle}
          value={form.organizador}
          onChange={(e) => set('organizador', e.target.value)}
          placeholder="Seu nome ou marca"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <div>
        <label style={labelStyle}>Descrição</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical' }}
          rows={3}
          value={form.descricao}
          onChange={(e) => set('descricao', e.target.value)}
          placeholder="Conta mais sobre o rolê..."
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !form.nome.trim()}
        className="mt-2 py-4 rounded-2xl font-dm font-medium text-white disabled:opacity-50 transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'linear-gradient(90deg, #E040A0, #7B2FBE)',
          boxShadow: '0 4px 20px rgba(224,64,160,0.3)',
          fontSize: '15px',
          letterSpacing: '0.05em',
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.boxShadow = '0 8px 30px rgba(224,64,160,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,64,160,0.3)';
        }}
      >
        {loading ? 'Salvando...' : '✦ Salvar Rolê'}
      </button>
    </div>
  );
}