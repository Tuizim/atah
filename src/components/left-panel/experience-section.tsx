'use client'

import { useState } from 'react'
import { Briefcase, Plus, Trash2, GripVertical, Lightbulb, X } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { useResumeStore } from '@/store/resume-store'
import { useResumeLabels } from '@/hooks/use-resume-labels'
import { SectionCard } from '@/components/ui/section-card'
import { Field, Input, Select } from '@/components/ui/field'
import { YEARS } from '@/lib/utils'
import { Experience } from '@/lib/types'

const yearOptions = YEARS.map(y => ({ value: y, label: y }))

function BulletRow({
  expId,
  bullet,
  canRemove,
}: {
  expId: string
  bullet: { id: string; text: string; metric?: string }
  canRemove: boolean
}) {
  const { updateExperienceBullet, removeExperienceBullet } = useResumeStore()
  const labels = useResumeLabels()
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-2 items-start'>
        <span className='text-slate-300 mt-2.5 text-xs'>•</span>
        <div className='flex-1 flex flex-col gap-1'>
          <div className='flex gap-1'>
            <input
              className='flex-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all'
              placeholder='Verbo de ação + resultado + impacto (ex: Aumentou conversão em 35%...)'
              value={bullet.text}
              onChange={e => updateExperienceBullet(expId, bullet.id, 'text', e.target.value)}
            />
            <button
              type='button'
              onClick={() => setShowSuggestions(!showSuggestions)}
              className='p-1.5 rounded-md text-amber-500 hover:bg-amber-50 transition-colors shrink-0'
              title='Ver sugestões de bullet'
            >
              <Lightbulb size={14} />
            </button>
            {canRemove && (
              <button
                type='button'
                onClick={() => removeExperienceBullet(expId, bullet.id)}
                className='p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0'
              >
                <X size={14} />
              </button>
            )}
          </div>
          <input
            className='rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-400 transition-all'
            placeholder='Métrica (ex: +35%, R$2M, 3x mais rápido)'
            value={bullet.metric || ''}
            onChange={e => updateExperienceBullet(expId, bullet.id, 'metric', e.target.value)}
          />
        </div>
      </div>

      {showSuggestions && (
        <div className='ml-4 bg-amber-50 rounded-lg border border-amber-200 p-2 flex flex-col gap-1'>
          <p className='text-xs font-medium text-amber-700 mb-1'>Sugestões — clique para usar:</p>
          {labels.bulletSuggestions.map((s, i) => (
            <button
              key={i}
              type='button'
              className='text-left text-xs text-amber-800 hover:bg-amber-100 rounded px-2 py-1 transition-colors'
              onClick={() => {
                updateExperienceBullet(expId, bullet.id, 'text', s)
                setShowSuggestions(false)
              }}
            >
              {s}
            </button>
          ))}
          <button
            type='button'
            className='text-xs text-amber-500 mt-1 self-end hover:underline'
            onClick={() => setShowSuggestions(false)}
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}

function ExperienceCard({ exp, index, monthOptions }: { exp: Experience; index: number; monthOptions: { value: string; label: string }[] }) {
  const { updateExperience, removeExperience, addExperienceBullet } = useResumeStore()

  return (
    <Draggable draggableId={exp.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`rounded-lg border ${snapshot.isDragging ? 'border-violet-400 shadow-lg bg-violet-50' : 'border-slate-200 bg-slate-50'} p-3 flex flex-col gap-3 transition-colors`}
        >
          <div className='flex items-center gap-2'>
            <div {...provided.dragHandleProps} className='text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing'>
              <GripVertical size={16} />
            </div>
            <span className='text-xs font-semibold text-slate-500 flex-1'>Experiência {index + 1}</span>
            <button
              type='button'
              onClick={() => removeExperience(exp.id)}
              className='p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors'
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <Field label='Empresa' tooltip='Nome completo da empresa onde trabalhou'>
              <Input
                placeholder='Ex: Google Brasil'
                value={exp.company}
                onChange={e => updateExperience(exp.id, 'company', e.target.value)}
              />
            </Field>
            <Field label='Cargo' tooltip='Seu cargo exato na empresa'>
              <Input
                placeholder='Ex: Software Engineer II'
                value={exp.role}
                onChange={e => updateExperience(exp.id, 'role', e.target.value)}
              />
            </Field>
          </div>

          <div className='grid grid-cols-5 gap-2 items-end'>
            <div className='col-span-2'>
              <Field label='Início' tooltip='Mês e ano em que começou'>
                <div className='flex gap-1'>
                  <Select
                    options={monthOptions}
                    placeholder='Mês'
                    value={exp.startMonth}
                    onChange={e => updateExperience(exp.id, 'startMonth', e.target.value)}
                  />
                  <Select
                    options={yearOptions}
                    placeholder='Ano'
                    value={exp.startYear}
                    onChange={e => updateExperience(exp.id, 'startYear', e.target.value)}
                  />
                </div>
              </Field>
            </div>
            <div className='col-span-2'>
              <Field label='Fim' tooltip='Mês e ano que saiu, ou deixe vazio se for emprego atual'>
                <div className='flex gap-1'>
                  <Select
                    options={monthOptions}
                    placeholder='Mês'
                    value={exp.endMonth}
                    disabled={exp.current}
                    onChange={e => updateExperience(exp.id, 'endMonth', e.target.value)}
                  />
                  <Select
                    options={yearOptions}
                    placeholder='Ano'
                    value={exp.endYear}
                    disabled={exp.current}
                    onChange={e => updateExperience(exp.id, 'endYear', e.target.value)}
                  />
                </div>
              </Field>
            </div>
            <div className='flex items-center gap-1.5 pb-1'>
              <input
                type='checkbox'
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={e => updateExperience(exp.id, 'current', e.target.checked)}
                className='w-3.5 h-3.5 accent-violet-600'
              />
              <label htmlFor={`current-${exp.id}`} className='text-xs text-slate-600 cursor-pointer'>Atual</label>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium text-slate-500 uppercase tracking-wide'>Conquistas (3–5)</span>
              {exp.bullets.length < 5 && (
                <button
                  type='button'
                  onClick={() => addExperienceBullet(exp.id)}
                  className='flex items-center gap-1 text-xs text-violet-600 hover:text-violet-800 transition-colors'
                >
                  <Plus size={12} /> Adicionar bullet
                </button>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              {exp.bullets.map(bullet => (
                <BulletRow key={bullet.id} expId={exp.id} bullet={bullet} canRemove={exp.bullets.length > 1} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export function ExperienceSection() {
  const { data, addExperience, reorderExperiences } = useResumeStore()
  const labels = useResumeLabels()
  const monthOptions = labels.months.map((m, i) => ({ value: String(i + 1).padStart(2, '0'), label: m }))

  const strength = data.experiences.length === 0 ? 0 :
    Math.min(100, Math.round(
      (data.experiences.filter(e => e.company && e.role && e.startYear).length / Math.max(data.experiences.length, 1)) * 60 +
      (data.experiences.reduce((s, e) => s + e.bullets.filter(b => b.text).length, 0) / Math.max(data.experiences.length * 3, 1)) * 40
    ))

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    reorderExperiences(result.source.index, result.destination.index)
  }

  return (
    <SectionCard
      title='Experiência Profissional'
      icon={<Briefcase size={16} />}
      strength={strength}
      badge={data.experiences.length > 0 ? `${data.experiences.length}` : undefined}
      defaultOpen={false}
    >
      <div className='mt-3 flex flex-col gap-3'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='experiences'>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col gap-3'>
                {data.experiences.map((exp, i) => (
                  <ExperienceCard key={exp.id} exp={exp} index={i} monthOptions={monthOptions} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          type='button'
          onClick={addExperience}
          className='flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm text-slate-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all'
        >
          <Plus size={16} /> Adicionar Experiência
        </button>

        {data.experiences.length > 1 && (
          <p className='text-xs text-slate-400 text-center'>Arraste as experiências para reordenar</p>
        )}
      </div>
    </SectionCard>
  )
}
