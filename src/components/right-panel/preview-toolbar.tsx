'use client'

import { Info } from 'lucide-react'
import { useState } from 'react'
import { TEMPLATES } from '@/lib/templates'
import { LANGUAGES } from '@/lib/resume-labels'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const TEMPLATE_THUMBNAILS: Record<string, React.ReactNode> = {
  classic: (
    <svg viewBox='0 0 48 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect x='4' y='4' width='40' height='7' rx='1' fill='#7c3aed' opacity='0.15' />
      <rect x='4' y='4' width='40' height='2' rx='0.5' fill='#7c3aed' />
      <rect x='4' y='14' width='18' height='1.5' rx='0.5' fill='#7c3aed' />
      <rect x='4' y='17' width='40' height='1' rx='0.5' fill='#e2e8f0' />
      <rect x='4' y='20' width='32' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='4' y='23' width='36' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='4' y='28' width='18' height='1.5' rx='0.5' fill='#7c3aed' />
      <rect x='4' y='31' width='40' height='1' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='34' width='34' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='37' width='30' height='1' rx='0.5' fill='#cbd5e1' />
    </svg>
  ),
  modern: (
    <svg viewBox='0 0 48 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect width='4' height='18' fill='#0ea5e9' />
      <rect x='4' width='44' height='18' fill='#f0f9ff' />
      <rect x='7' y='4' width='28' height='3' rx='0.5' fill='#0f172a' />
      <rect x='7' y='9' width='16' height='2' rx='0.5' fill='#0ea5e9' />
      <rect x='7' y='13' width='8' height='1.5' rx='3' fill='white' stroke='#e2e8f0' strokeWidth='0.5' />
      <rect x='17' y='13' width='8' height='1.5' rx='3' fill='white' stroke='#e2e8f0' strokeWidth='0.5' />
      <rect x='7' y='24' width='3' height='1.5' rx='0.3' fill='#0ea5e9' />
      <rect x='12' y='24.4' width='16' height='0.8' rx='0.3' fill='#1e293b' />
      <rect x='29' y='24.4' width='15' height='0.5' rx='0.3' fill='#e2e8f0' />
      <rect x='7' y='28' width='26' height='1' rx='0.5' fill='#cbd5e1' />
      <rect x='9' y='31' width='22' height='1' rx='0.5' fill='#e2e8f0' />
      <rect x='9' y='34' width='20' height='1' rx='0.5' fill='#e2e8f0' />
      <rect x='7' y='40' width='3' height='1.5' rx='0.3' fill='#0ea5e9' />
      <rect x='12' y='40.4' width='16' height='0.8' rx='0.3' fill='#1e293b' />
      <rect x='29' y='40.4' width='15' height='0.5' rx='0.3' fill='#e2e8f0' />
      <rect x='7' y='44' width='30' height='1' rx='0.5' fill='#cbd5e1' />
    </svg>
  ),
  minimal: (
    <svg viewBox='0 0 48 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect x='4' y='5' width='32' height='4' rx='0.5' fill='#0f172a' opacity='0.8' />
      <rect x='4' y='11' width='18' height='1.5' rx='0.5' fill='#94a3b8' />
      <rect x='4' y='15' width='38' height='0.8' rx='0.5' fill='#94a3b8' />
      <rect x='4' y='22' width='40' height='0.5' rx='0.5' fill='#f1f5f9' />
      <rect x='4' y='20' width='14' height='1' rx='0.5' fill='#94a3b8' opacity='0.6' />
      <rect x='4' y='25' width='28' height='1' rx='0.5' fill='#334155' />
      <rect x='4' y='29' width='36' height='0.8' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='32' width='30' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='35' width='26' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='4' y='42' width='40' height='0.5' rx='0.5' fill='#f1f5f9' />
      <rect x='4' y='40' width='14' height='1' rx='0.5' fill='#94a3b8' opacity='0.6' />
      <rect x='4' y='45' width='24' height='1' rx='0.5' fill='#334155' />
      <rect x='4' y='49' width='32' height='0.8' rx='0.5' fill='#cbd5e1' />
    </svg>
  ),
  executive: (
    <svg viewBox='0 0 48 60' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-full'>
      <rect width='48' height='60' fill='white' />
      <rect width='48' height='20' fill='#1e3a5f' />
      <rect x='4' y='5' width='28' height='3.5' rx='0.5' fill='white' />
      <rect x='4' y='10' width='18' height='2' rx='0.5' fill='white' opacity='0.6' />
      <rect x='4' y='15' width='12' height='1' rx='0.5' fill='white' opacity='0.4' />
      <rect x='16' y='15' width='12' height='1' rx='0.5' fill='white' opacity='0.4' />
      <rect x='4' y='26' width='18' height='1.5' rx='0.5' fill='#1e3a5f' />
      <rect x='4' y='28' width='40' height='1.5' rx='0.5' fill='#1e3a5f' />
      <rect x='4' y='31' width='36' height='0.8' rx='0.5' fill='#cbd5e1' />
      <rect x='6' y='34' width='30' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='6' y='37' width='26' height='0.8' rx='0.5' fill='#e2e8f0' />
      <rect x='4' y='43' width='18' height='1.5' rx='0.5' fill='#1e3a5f' />
      <rect x='4' y='45' width='40' height='1.5' rx='0.5' fill='#1e3a5f' />
      <rect x='4' y='48' width='32' height='0.8' rx='0.5' fill='#cbd5e1' />
    </svg>
  ),
}

interface PreviewToolbarProps {
  templateId: string
  language: string
  onTemplateChange: (id: string) => void
  onLanguageChange: (code: string) => void
}

export function PreviewToolbar({ templateId, language, onTemplateChange, onLanguageChange }: PreviewToolbarProps) {
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)
  const currentTemplate = TEMPLATES.find(t => t.id === templateId)

  return (
    <div className='flex flex-col gap-2 mb-3 w-full' style={{ maxWidth: '210mm' }}>
      {/* Templates */}
      <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col gap-2.5'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-semibold text-slate-700'>Modelo</span>
          {/* Language selector */}
          <div className='flex items-center gap-1.5'>
            <span className='text-xs text-slate-400'>Idioma do currículo:</span>
            <div className='flex gap-1'>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  type='button'
                  onClick={() => onLanguageChange(lang.code)}
                  title={lang.name}
                  className={cn(
                    'flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-all',
                    language === lang.code
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-100'
                  )}
                >
                  <span>{lang.flag}</span>
                  <span className='hidden sm:inline'>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='flex gap-2'>
          {TEMPLATES.map(tpl => (
            <button
              key={tpl.id}
              type='button'
              onClick={() => onTemplateChange(tpl.id)}
              onMouseEnter={() => setHoveredTemplate(tpl.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              className={cn(
                'flex-1 flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all cursor-pointer group',
                templateId === tpl.id
                  ? 'border-violet-500 bg-violet-50 shadow-sm'
                  : 'border-slate-200 hover:border-violet-300 hover:bg-slate-50'
              )}
            >
              <div className={cn(
                'w-12 h-14 rounded overflow-hidden border transition-all',
                templateId === tpl.id ? 'border-violet-300 shadow-sm' : 'border-slate-200 group-hover:border-violet-200'
              )}>
                {TEMPLATE_THUMBNAILS[tpl.id]}
              </div>
              <span className={cn(
                'text-xs font-medium transition-colors',
                templateId === tpl.id ? 'text-violet-700' : 'text-slate-600 group-hover:text-violet-600'
              )}>
                {tpl.name}
              </span>
            </button>
          ))}
        </div>

        {/* Why explanation */}
        <div className='flex items-start gap-1.5 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 min-h-[2rem]'>
          <Info size={12} className='mt-0.5 shrink-0 text-violet-400' />
          <span>{(hoveredTemplate ? TEMPLATES.find(t => t.id === hoveredTemplate) : currentTemplate)?.why}</span>
        </div>
      </div>
    </div>
  )
}
