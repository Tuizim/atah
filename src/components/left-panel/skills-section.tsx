'use client'

import { useState, KeyboardEvent } from 'react'
import { Code, X, Plus } from 'lucide-react'
import { useResumeStore } from '@/store/resume-store'
import { useResumeLabels } from '@/hooks/use-resume-labels'
import { SectionCard } from '@/components/ui/section-card'
import { Field } from '@/components/ui/field'
import { Skill } from '@/lib/types'
import { cn } from '@/lib/utils'

const CATEGORY_COLORS = {
  technical: 'bg-violet-100 text-violet-800 border-violet-200',
  tool: 'bg-blue-100 text-blue-800 border-blue-200',
  soft: 'bg-emerald-100 text-emerald-800 border-emerald-200',
} as const


export function SkillsSection() {
  const { data, addSkill, removeSkill } = useResumeStore()
  const labels = useResumeLabels()
  const [input, setInput] = useState('')
  const [category, setCategory] = useState<Skill['category']>('technical')

  const strength = Math.min(100, Math.round((data.skills.filter(s => s.category === 'technical' || s.category === 'tool').length / 5) * 100))

  const handleAdd = () => {
    const name = input.trim()
    if (!name || data.skills.some(s => s.name.toLowerCase() === name.toLowerCase())) return
    addSkill(name, category)
    setInput('')
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd() }
  }

  const quickAdd = (name: string, cat: Skill['category']) => {
    if (!data.skills.some(s => s.name.toLowerCase() === name.toLowerCase())) addSkill(name, cat)
  }

  const grouped = (['technical', 'tool', 'soft'] as Skill['category'][]).map(cat => ({
    cat,
    skills: data.skills.filter(s => s.category === cat),
  }))

  return (
    <SectionCard
      title='Habilidades'
      icon={<Code size={16} />}
      strength={strength}
      badge={data.skills.length > 0 ? `${data.skills.length}` : undefined}
      defaultOpen={false}
    >
      <div className='mt-3 flex flex-col gap-4'>
        <Field label='Adicionar habilidade' tooltip='Pressione Enter ou clique em + para adicionar. Use tags separadas por categoria'>
          <div className='flex gap-2'>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as Skill['category'])}
              className='rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400'
            >
              {(['technical', 'tool', 'soft'] as Skill['category'][]).map(k => (
                <option key={k} value={k}>{labels.categoryLabels[k]}</option>
              ))}
            </select>
            <input
              className='flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all'
              placeholder='Ex: React, Python, Liderança...'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button
              type='button'
              onClick={handleAdd}
              className='px-3 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors'
            >
              <Plus size={16} />
            </button>
          </div>
        </Field>

        {grouped.map(({ cat, skills }) => skills.length > 0 && (
          <div key={cat} className='flex flex-col gap-2'>
            <span className='text-xs font-medium text-slate-500 uppercase tracking-wide'>{labels.categoryLabels[cat]}</span>
            <div className='flex flex-wrap gap-1.5'>
              {skills.map(skill => (
                <span
                  key={skill.id}
                  className={cn('flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium', CATEGORY_COLORS[cat])}
                >
                  {skill.name}
                  <button type='button' onClick={() => removeSkill(skill.id)} className='hover:opacity-60 transition-opacity'>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className='flex flex-col gap-2'>
          <span className='text-xs font-medium text-slate-400'>Sugestões rápidas:</span>
          <div className='flex flex-wrap gap-1.5'>
            {labels.quickSkills.filter(q => !data.skills.some(s => s.name === q.name)).map(q => (
              <button
                key={q.name}
                type='button'
                onClick={() => quickAdd(q.name, q.category)}
                className='flex items-center gap-1 px-2 py-0.5 rounded-full border border-dashed border-slate-300 text-xs text-slate-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all'
              >
                <Plus size={10} /> {q.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
