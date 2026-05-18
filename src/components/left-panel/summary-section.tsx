'use client'

import { FileText } from 'lucide-react'
import { useResumeStore } from '@/store/resume-store'
import { SectionCard } from '@/components/ui/section-card'
import { Field, Textarea } from '@/components/ui/field'
import { countWords, cn } from '@/lib/utils'

export function SummarySection() {
  const { data, updateSummary } = useResumeStore()
  const words = countWords(data.summary)
  const ideal = words >= 50 && words <= 80
  const tooShort = words > 0 && words < 50
  const tooLong = words > 80

  const strength = data.summary.trim().length === 0 ? 0 : ideal ? 100 : tooShort ? Math.round((words / 50) * 70) : 70

  return (
    <SectionCard title='Resumo Profissional' icon={<FileText size={16} />} strength={strength} defaultOpen={false}>
      <div className='mt-3 flex flex-col gap-2'>
        <Field
          label='Resumo'
          tooltip='3–5 frases que destacam seu valor como profissional: especialidade, anos de experiência, conquistas chave e objetivo de carreira'
        >
          <Textarea
            rows={5}
            placeholder='Ex: Engenheira de Software com 6 anos de experiência em sistemas distribuídos de alta escala. Liderou a migração de monolito para microsserviços, reduzindo latência em 40%. Especialista em Go, Kubernetes e AWS. Busca oportunidades em empresas de impacto social com cultura de engenharia forte.'
            value={data.summary}
            onChange={e => updateSummary(e.target.value)}
          />
        </Field>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden'>
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  ideal ? 'bg-emerald-500' : tooShort ? 'bg-amber-500' : tooLong ? 'bg-rose-500' : 'bg-slate-200'
                )}
                style={{ width: `${Math.min((words / 80) * 100, 100)}%` }}
              />
            </div>
            <span className={cn(
              'text-xs font-medium',
              ideal ? 'text-emerald-600' : tooShort ? 'text-amber-600' : tooLong ? 'text-rose-600' : 'text-slate-400'
            )}>
              {words} palavras
            </span>
          </div>
          <span className='text-xs text-slate-400'>Ideal: 50–80 palavras</span>
        </div>

        {(tooShort || tooLong) && (
          <p className='text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2'>
            {tooShort ? `Adicione mais ${50 - words} palavra(s) para atingir o mínimo recomendado.` : `Reduza ${words - 80} palavra(s) para melhorar a leitura por recrutadores.`}
          </p>
        )}
      </div>
    </SectionCard>
  )
}
