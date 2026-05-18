'use client'

import { Globe, Plus, Trash2 } from 'lucide-react'
import { useResumeStore } from '@/store/resume-store'
import { useResumeLabels } from '@/hooks/use-resume-labels'
import { SectionCard } from '@/components/ui/section-card'
import { Field, Input, Select } from '@/components/ui/field'
import { Language } from '@/lib/types'

export function LanguagesSection() {
  const { data, addLanguage, updateLanguage, removeLanguage } = useResumeStore()
  const labels = useResumeLabels()
  const levelOptions = (Object.keys(labels.levelLabels) as Language['level'][]).map(k => ({ value: k, label: labels.levelLabels[k] }))
  const strength = data.languages.length === 0 ? 0 :
    Math.min(100, Math.round((data.languages.filter(l => l.name && l.level).length / data.languages.length) * 100))

  return (
    <SectionCard
      title='Idiomas'
      icon={<Globe size={16} />}
      strength={strength}
      badge={data.languages.length > 0 ? `${data.languages.length}` : undefined}
      defaultOpen={false}
    >
      <div className='mt-3 flex flex-col gap-3'>
        {data.languages.map(lang => (
          <div key={lang.id} className='flex gap-2 items-end'>
            <Field label='Idioma' tooltip='Nome do idioma (ex: Inglês, Espanhol, Mandarim)' className='flex-1'>
              <Input
                placeholder='Ex: Inglês'
                value={lang.name}
                onChange={e => updateLanguage(lang.id, 'name', e.target.value)}
              />
            </Field>
            <Field label='Nível' className='w-40'>
              <Select
                options={levelOptions}
                value={lang.level}
                onChange={e => updateLanguage(lang.id, 'level', e.target.value)}
              />
            </Field>
            <button
              type='button'
              onClick={() => removeLanguage(lang.id)}
              className='mb-0.5 p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors'
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        <button
          type='button'
          onClick={addLanguage}
          className='flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm text-slate-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all'
        >
          <Plus size={16} /> Adicionar Idioma
        </button>
      </div>
    </SectionCard>
  )
}
