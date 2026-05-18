'use client'

import { FolderOpen, Plus, Trash2, X } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { SectionCard } from '@/components/ui/section-card'
import { Field, Input, Textarea } from '@/components/ui/field'

export function ProjectsSection() {
  const { data, addProject, updateProject, removeProject } = useResumeStore()
  const [techInputs, setTechInputs] = useState<Record<string, string>>({})

  const strength = data.projects.length === 0 ? 0 :
    Math.min(100, Math.round((data.projects.filter(p => p.title && p.description).length / data.projects.length) * 100))

  const addTech = (projId: string) => {
    const val = (techInputs[projId] || '').trim()
    if (!val) return
    const proj = data.projects.find(p => p.id === projId)
    if (!proj || proj.technologies.includes(val)) return
    updateProject(projId, 'technologies', [...proj.technologies, val])
    setTechInputs(prev => ({ ...prev, [projId]: '' }))
  }

  const removeTech = (projId: string, tech: string) => {
    const proj = data.projects.find(p => p.id === projId)
    if (!proj) return
    updateProject(projId, 'technologies', proj.technologies.filter(t => t !== tech))
  }

  const handleTechKey = (e: KeyboardEvent<HTMLInputElement>, projId: string) => {
    if (e.key === 'Enter') { e.preventDefault(); addTech(projId) }
  }

  return (
    <SectionCard
      title='Projetos / Portfolio'
      icon={<FolderOpen size={16} />}
      strength={strength}
      badge={data.projects.length > 0 ? `${data.projects.length}` : undefined}
      defaultOpen={false}
    >
      <div className='mt-3 flex flex-col gap-3'>
        {data.projects.map(proj => (
          <div key={proj.id} className='rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-semibold text-slate-500'>Projeto</span>
              <button
                type='button'
                onClick={() => removeProject(proj.id)}
                className='p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors'
              >
                <Trash2 size={14} />
              </button>
            </div>
            <Field label='Título' tooltip='Nome do projeto ou produto que desenvolveu'>
              <Input
                placeholder='Ex: Sistema de Gestão de Estoque'
                value={proj.title}
                onChange={e => updateProject(proj.id, 'title', e.target.value)}
              />
            </Field>
            <Field label='Descrição curta' tooltip='1–2 frases: o que faz, qual problema resolve e qual foi o impacto'>
              <Textarea
                rows={2}
                placeholder='Ex: Plataforma de e-commerce com +10k usuários ativos. Reduziu abandono de carrinho em 23% com checkout otimizado.'
                value={proj.description}
                onChange={e => updateProject(proj.id, 'description', e.target.value)}
              />
            </Field>
            <Field label='URL (opcional)' tooltip='Link do projeto, repositório GitHub ou demo'>
              <Input
                placeholder='https://github.com/...'
                value={proj.url || ''}
                onChange={e => updateProject(proj.id, 'url', e.target.value)}
              />
            </Field>
            <Field label='Tecnologias' tooltip='Tecnologias usadas no projeto — pressione Enter para adicionar'>
              <div className='flex gap-2'>
                <input
                  className='flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all'
                  placeholder='Ex: React, Node.js...'
                  value={techInputs[proj.id] || ''}
                  onChange={e => setTechInputs(prev => ({ ...prev, [proj.id]: e.target.value }))}
                  onKeyDown={e => handleTechKey(e, proj.id)}
                />
                <button
                  type='button'
                  onClick={() => addTech(proj.id)}
                  className='px-2.5 py-1.5 rounded-lg bg-violet-600 text-white text-xs hover:bg-violet-700 transition-colors'
                >
                  +
                </button>
              </div>
              {proj.technologies.length > 0 && (
                <div className='flex flex-wrap gap-1.5 mt-2'>
                  {proj.technologies.map(tech => (
                    <span key={tech} className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs'>
                      {tech}
                      <button type='button' onClick={() => removeTech(proj.id, tech)} className='hover:opacity-60'>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Field>
          </div>
        ))}

        <button
          type='button'
          onClick={addProject}
          className='flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm text-slate-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all'
        >
          <Plus size={16} /> Adicionar Projeto
        </button>
      </div>
    </SectionCard>
  )
}
