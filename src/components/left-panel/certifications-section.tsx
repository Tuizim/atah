'use client'

import { Award, Plus, Trash2 } from 'lucide-react'
import { useResumeStore } from '@/store/resume-store'
import { SectionCard } from '@/components/ui/section-card'
import { Field, Input, Select } from '@/components/ui/field'
import { YEARS } from '@/lib/utils'

const yearOptions = YEARS.map(y => ({ value: y, label: y }))

export function CertificationsSection() {
  const { data, addCertification, updateCertification, removeCertification } = useResumeStore()
  const strength = data.certifications.length === 0 ? 0 :
    Math.min(100, Math.round((data.certifications.filter(c => c.name && c.issuer).length / data.certifications.length) * 100))

  return (
    <SectionCard
      title='Certificações / Cursos'
      icon={<Award size={16} />}
      strength={strength}
      badge={data.certifications.length > 0 ? `${data.certifications.length}` : undefined}
      defaultOpen={false}
    >
      <div className='mt-3 flex flex-col gap-3'>
        {data.certifications.map(cert => (
          <div key={cert.id} className='rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-semibold text-slate-500'>Certificação</span>
              <button
                type='button'
                onClick={() => removeCertification(cert.id)}
                className='p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors'
              >
                <Trash2 size={14} />
              </button>
            </div>
            <Field label='Nome' tooltip='Título completo da certificação ou curso'>
              <Input
                placeholder='Ex: AWS Solutions Architect Associate'
                value={cert.name}
                onChange={e => updateCertification(cert.id, 'name', e.target.value)}
              />
            </Field>
            <div className='grid grid-cols-2 gap-2'>
              <Field label='Emissora' tooltip='Empresa ou instituição que emitiu a certificação'>
                <Input
                  placeholder='Ex: Amazon Web Services'
                  value={cert.issuer}
                  onChange={e => updateCertification(cert.id, 'issuer', e.target.value)}
                />
              </Field>
              <Field label='Ano'>
                <Select
                  options={yearOptions}
                  placeholder='Ano'
                  value={cert.year}
                  onChange={e => updateCertification(cert.id, 'year', e.target.value)}
                />
              </Field>
            </div>
            <Field label='URL (opcional)' tooltip='Link para verificar a certificação'>
              <Input
                placeholder='https://...'
                value={cert.url || ''}
                onChange={e => updateCertification(cert.id, 'url', e.target.value)}
              />
            </Field>
          </div>
        ))}

        <button
          type='button'
          onClick={addCertification}
          className='flex items-center justify-center gap-2 w-full rounded-lg border-2 border-dashed border-slate-200 py-3 text-sm text-slate-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all'
        >
          <Plus size={16} /> Adicionar Certificação
        </button>
      </div>
    </SectionCard>
  )
}
