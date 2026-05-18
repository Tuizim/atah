'use client'

import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import { useResumeStore } from '@/store/resume-store'
import { useResumeLabels } from '@/hooks/use-resume-labels'
import { SectionCard } from '@/components/ui/section-card'
import { Field, Input, Select } from '@/components/ui/field'
import { YEARS } from '@/lib/utils'
import { Education } from '@/lib/types'

const yearOptions = YEARS.map(y => ({ value: y, label: y }))

function EducationCard({ edu, degreeOptions, inProgressLabel }: {
  edu: Education
  degreeOptions: { value: string; label: string }[]
  inProgressLabel: string
}) {
  const { updateEducation, removeEducation } = useResumeStore()

  return (
    <div className='rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <span className='text-xs font-semibold text-slate-500 flex-1'>Formação</span>
        <button
          type='button'
          onClick={() => removeEducation(edu.id)}
          className='p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors'
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <Field label='Instituição' tooltip='Nome completo da instituição de ensino' className='col-span-2'>
          <Input
            placeholder='Ex: Universidade de São Paulo'
            value={edu.institution}
            onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
          />
        </Field>

        <Field label='Grau' tooltip='Nível do curso'>
          <Select
            options={degreeOptions}
            placeholder='Selecione...'
            value={edu.degree}
            onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
          />
        </Field>

        <Field label='Área / Curso' tooltip='Nome do curso ou área de estudo'>
          <Input
            placeholder='Ex: Ciência da Computação'
            value={edu.field}
            onChange={e => updateEducation(edu.id, 'field', e.target.value)}
          />
        </Field>

        <Field label='Ano início'>
          <Select
            options={yearOptions}
            placeholder='Ano'
            value={edu.startYear}
            onChange={e => updateEducation(edu.id, 'startYear', e.target.value)}
          />
        </Field>

        <div className='flex gap-2 items-end'>
          <Field label='Ano conclusão' className='flex-1'>
            <Select
              options={yearOptions}
              placeholder='Ano'
              value={edu.endYear}
              disabled={edu.current}
              onChange={e => updateEducation(edu.id, 'endYear', e.target.value)}
            />
          </Field>
          <div className='flex items-center gap-1.5 pb-1'>
            <input
              type='checkbox'
              id={`edu-current-${edu.id}`}
              checked={edu.current}
              onChange={e => updateEducation(edu.id, 'current', e.target.checked)}
              className='w-3.5 h-3.5 accent-violet-600'
            />
            <label htmlFor={`edu-current-${edu.id}`} className='text-xs text-slate-600 cursor-pointer'>{inProgressLabel}</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EducationSection() {
  const { data, addEducation } = useResumeStore()
  const labels = useResumeLabels()

  const strength = data.education.length === 0 ? 0 :
    Math.min(100, Math.round(
      (data.education.filter(e => e.institution && e.degree && e.field).length / data.education.length) * 100
    ))

  return (
    <SectionCard
      title='Formação Acadêmica'
      icon={<GraduationCap size={16} />}
      strength={strength}
      badge={data.education.length > 0 ? `${data.education.length}` : undefined}
      defaultOpen={false}
    >
      <div className='mt-3 flex flex-col gap-3'>
        {data.education.map(edu => (
          <EducationCard
            key={edu.id}
            edu={edu}
            degreeOptions={labels.degreeOptions}
            inProgressLabel={labels.inProgress}
          />
        ))}
        <button
          type='button'
          onClick={addEducation}
          className='flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm text-slate-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all'
        >
          <Plus size={16} /> Adicionar Formação
        </button>
      </div>
    </SectionCard>
  )
}
