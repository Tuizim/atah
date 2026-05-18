'use client'

import { FileText, RotateCcw, BarChart2, ChevronRight, Settings2 } from 'lucide-react'
import { ExportButton } from './right-panel/export-button'
import { ATSScore } from '@/lib/types'
import { cn } from '@/lib/utils'

interface AppHeaderProps {
  atsScore: ATSScore
  onReset: () => void
  onScoreOpen: () => void
  onConfigOpen: () => void
}

export function AppHeader({ atsScore, onReset, onScoreOpen, onConfigOpen }: AppHeaderProps) {
  const { total } = atsScore

  const scoreConfig =
    total >= 75
      ? { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-300', hover: 'hover:bg-emerald-100 hover:border-emerald-400', ring: 'focus-visible:ring-emerald-400', pulse: false, label: 'Excelente' }
      : total >= 50
      ? { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300', hover: 'hover:bg-amber-100 hover:border-amber-400', ring: 'focus-visible:ring-amber-400', pulse: false, label: 'Bom' }
      : { text: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-300', hover: 'hover:bg-rose-100 hover:border-rose-400', ring: 'focus-visible:ring-rose-400', pulse: true, label: 'Fraco' }

  return (
    <header className='shrink-0 z-50 bg-white border-b border-slate-200 shadow-sm'>
      <div className='max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-3'>
        <div className='flex items-center gap-2.5'>
          <div className='w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center'>
            <FileText size={16} className='text-white' />
          </div>
          <div>
            <h1 className='text-sm font-bold text-slate-800'>Construtor de Currículo</h1>
            <p className='text-xs text-slate-400'>ATS-optimizado · Auto-save ativo</p>
          </div>
        </div>

        <div className='flex-1' />

        <div className='relative'>
          {scoreConfig.pulse && (
            <span className='absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping opacity-75' />
          )}
          <button
            type='button'
            onClick={onScoreOpen}
            className={cn(
              'relative flex items-center gap-2 pl-3 pr-2.5 py-2 rounded-xl border font-medium shadow-sm',
              'transition-all duration-150 cursor-pointer',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              'hover:shadow-md active:scale-[0.98]',
              scoreConfig.text,
              scoreConfig.bg,
              scoreConfig.border,
              scoreConfig.hover,
              scoreConfig.ring,
            )}
          >
            <BarChart2 size={15} className='shrink-0' />
            <div className='flex flex-col items-start leading-none'>
              <span className='text-[10px] font-normal opacity-60 uppercase tracking-wide'>Score ATS</span>
              <span className='text-sm font-bold tabular-nums'>{total} <span className='font-normal text-xs'>· {scoreConfig.label}</span></span>
            </div>
            <ChevronRight size={14} className='shrink-0 opacity-50' />
          </button>
        </div>

        <button
          type='button'
          onClick={onConfigOpen}
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:text-violet-600 hover:bg-violet-50 text-xs font-medium transition-colors border border-transparent hover:border-violet-200'
        >
          <Settings2 size={13} /> Configurações
        </button>

        <button
          type='button'
          onClick={onReset}
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-xs transition-colors'
        >
          <RotateCcw size={13} /> Recomeçar
        </button>

        <ExportButton />
      </div>
    </header>
  )
}
