'use client'

import { X, Settings2, Info, Palette, Languages } from 'lucide-react'
import { useState } from 'react'
import { TEMPLATES } from '@/lib/templates'
import { LANGUAGES } from '@/lib/resume-labels'
import { useResumeLabels } from '@/hooks/use-resume-labels'
import { cn } from '@/lib/utils'

// ─── SVG thumbnails ───────────────────────────────────────────────────────────

const THUMBNAILS: Record<string, React.ReactNode> = {
  classic: (
    <svg viewBox='0 0 48 60' fill='none' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect x='4' y='4' width='40' height='7' rx='1' fill='#7c3aed' opacity='0.12' />
      <rect x='4' y='4' width='40' height='2' rx='0.5' fill='#7c3aed' />
      <rect x='4' y='14' width='20' height='1.5' rx='0.5' fill='#7c3aed' />
      <rect x='4' y='17' width='40' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='4' y='20' width='32' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='4' y='23' width='36' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='4' y='28' width='20' height='1.5' rx='0.5' fill='#7c3aed' />
      <rect x='4' y='31' width='40' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='34' width='34' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='37' width='28' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='4' y='43' width='20' height='1.5' rx='0.5' fill='#7c3aed' />
      <rect x='4' y='46' width='40' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='49' width='30' height='1' rx='0.5' fill='#cbd5e1' />
    </svg>
  ),
  modern: (
    <svg viewBox='0 0 48 60' fill='none' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect width='4' height='20' fill='#0ea5e9' />
      <rect x='4' width='44' height='20' fill='#f0f9ff' />
      <rect x='8' y='4' width='26' height='3' rx='0.5' fill='#0f172a' />
      <rect x='8' y='9' width='16' height='2' rx='0.5' fill='#0ea5e9' />
      <rect x='8' y='13' width='9' height='1.5' rx='3' fill='white' stroke='#e2e8f0' strokeWidth='0.5' />
      <rect x='19' y='13' width='9' height='1.5' rx='3' fill='white' stroke='#e2e8f0' strokeWidth='0.5' />
      <rect x='8' y='25' width='3' height='1.5' rx='0.3' fill='#0ea5e9' />
      <rect x='13' y='25.4' width='14' height='0.8' rx='0.3' fill='#1e293b' />
      <rect x='31' y='25' width='10' height='2' rx='3' fill='#0ea5e9' />
      <rect x='8' y='29' width='28' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='10' y='32' width='24' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='10' y='35' width='20' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='8' y='41' width='3' height='1.5' rx='0.3' fill='#0ea5e9' />
      <rect x='13' y='41.4' width='14' height='0.8' rx='0.3' fill='#1e293b' />
      <rect x='31' y='41' width='10' height='2' rx='3' fill='#0ea5e9' />
      <rect x='8' y='45' width='32' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='10' y='48' width='22' height='0.8' rx='0.5' fill='#e2e8f0' />
    </svg>
  ),
  minimal: (
    <svg viewBox='0 0 48 60' fill='none' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect x='4' y='5' width='30' height='4' rx='0.5' fill='#0f172a' opacity='0.7' />
      <rect x='4' y='11' width='18' height='1.5' rx='0.5' fill='#94a3b8' />
      <rect x='4' y='15' width='36' height='0.8' rx='0.5' fill='#94a3b8' opacity='0.5' />
      <rect x='4' y='22' width='40' height='0.5' rx='0.5' fill='#f1f5f9' />
      <rect x='4' y='20' width='16' height='1' rx='0.5' fill='#94a3b8' opacity='0.5' />
      <rect x='4' y='25' width='26' height='1' rx='0.5' fill='#334155' />
      <rect x='4' y='29' width='36' height='0.8' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='32' width='30' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='35' width='24' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='4' y='42' width='40' height='0.5' rx='0.5' fill='#f1f5f9' />
      <rect x='4' y='40' width='16' height='1' rx='0.5' fill='#94a3b8' opacity='0.5' />
      <rect x='4' y='45' width='22' height='1' rx='0.5' fill='#334155' />
      <rect x='4' y='49' width='32' height='0.8' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='52' width='26' height='0.8' rx='0.5' fill='#e2e8f0' />
    </svg>
  ),
  executive: (
    <svg viewBox='0 0 48 60' fill='none' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect width='48' height='21' fill='#1e3a5f' />
      <rect x='4' y='5' width='26' height='3.5' rx='0.5' fill='white' />
      <rect x='4' y='10' width='18' height='2' rx='0.5' fill='white' opacity='0.55' />
      <rect x='4' y='15' width='10' height='1' rx='0.5' fill='white' opacity='0.35' />
      <rect x='16' y='15' width='10' height='1' rx='0.5' fill='white' opacity='0.35' />
      <rect x='4' y='26' width='40' height='1.5' rx='0.5' fill='#1e3a5f' />
      <rect x='4' y='30' width='34' height='0.8' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='33' width='28' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='36' width='24' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='4' y='42' width='40' height='1.5' rx='0.5' fill='#1e3a5f' />
      <rect x='4' y='46' width='30' height='0.8' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='49' width='26' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='52' width='22' height='0.8' rx='0.5' fill='#e2e8f0' />
    </svg>
  ),
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ConfigDrawerProps {
  open: boolean
  onClose: () => void
  templateId: string
  language: string
  onTemplateChange: (id: string) => void
  onLanguageChange: (code: string) => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ConfigDrawer({ open, onClose, templateId, language, onTemplateChange, onLanguageChange }: ConfigDrawerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const labels = useResumeLabels()
  const activeId = hoveredId ?? templateId

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-[1px] transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-[57px] right-0 bottom-0 z-40 w-80 bg-white border-l border-slate-200 shadow-2xl',
          'flex flex-col transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className='flex items-center gap-2 px-4 py-3 border-b border-slate-100 shrink-0'>
          <Settings2 size={15} className='text-violet-600' />
          <span className='text-sm font-semibold text-slate-800 flex-1'>Configurações</span>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors'
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-6'>

          {/* Template section */}
          <section className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <Palette size={14} className='text-violet-500' />
              <span className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>Modelo de currículo</span>
            </div>

            <div className='grid grid-cols-2 gap-2'>
              {TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  type='button'
                  onClick={() => onTemplateChange(tpl.id)}
                  onMouseEnter={() => setHoveredId(tpl.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border-2 p-2.5 transition-all cursor-pointer group text-left',
                    templateId === tpl.id
                      ? 'border-violet-500 bg-violet-50 shadow-sm'
                      : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50'
                  )}
                >
                  <div className={cn(
                    'w-14 h-[68px] rounded-md overflow-hidden border transition-all',
                    templateId === tpl.id ? 'border-violet-300 shadow-sm' : 'border-slate-200 group-hover:border-violet-200'
                  )}>
                    {THUMBNAILS[tpl.id]}
                  </div>
                  <span className={cn(
                    'text-xs font-semibold transition-colors w-full text-center',
                    templateId === tpl.id ? 'text-violet-700' : 'text-slate-600 group-hover:text-violet-600'
                  )}>
                    {labels.templates[tpl.id]?.name ?? tpl.id}
                  </span>
                </button>
              ))}
            </div>

            {/* Why explanation */}
            <div className='flex items-start gap-2 bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100 min-h-[52px]'>
              <Info size={13} className='mt-0.5 shrink-0 text-violet-400' />
              <p className='text-xs text-slate-500 leading-relaxed'>{labels.templates[activeId]?.why}</p>
            </div>
          </section>

          {/* Divider */}
          <div className='h-px bg-slate-100' />

          {/* Language section */}
          <section className='flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <Languages size={14} className='text-violet-500' />
              <span className='text-xs font-semibold text-slate-700 uppercase tracking-wide'>Idioma do currículo</span>
            </div>
            <p className='text-xs text-slate-400 -mt-1'>Os títulos das seções e termos do documento serão traduzidos.</p>

            <div className='flex flex-col gap-1.5'>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type='button'
                  onClick={() => onLanguageChange(lang.code)}
                  className={cn(
                    'flex items-center gap-3 w-full px-3 py-2 rounded-lg border text-sm font-medium transition-all text-left',
                    language === lang.code
                      ? 'border-violet-400 bg-violet-50 text-violet-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-slate-50'
                  )}
                >
                  <span className='text-base'>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && (
                    <span className='ml-auto text-xs font-normal text-violet-500'>Ativo</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
