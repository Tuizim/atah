'use client'

import { User } from 'lucide-react'
import { useResumeStore } from '@/store/resume-store'
import { SectionCard } from '@/components/ui/section-card'
import { Field, Input } from '@/components/ui/field'

export function HeaderSection() {
  const { data, updateContact } = useResumeStore()
  const { contact } = data

  const filled = [contact.fullName, contact.title, contact.email, contact.phone, contact.linkedin, contact.city].filter(Boolean).length
  const strength = Math.round((filled / 6) * 100)

  return (
    <SectionCard title='Cabeçalho' icon={<User size={16} />} strength={strength} defaultOpen>
      <div className='grid grid-cols-2 gap-3 mt-3'>
        <Field label='Nome completo' tooltip='Seu nome legal completo, como aparecerá no topo do currículo' required className='col-span-2'>
          <Input
            placeholder='Ex: Maria Silva Santos'
            value={contact.fullName}
            onChange={e => updateContact('fullName', e.target.value)}
          />
        </Field>

        <Field label='Cargo / Título' tooltip='Seu cargo atual ou o cargo que está buscando (ex: Engenheira de Software Sênior)' required className='col-span-2'>
          <Input
            placeholder='Ex: Product Manager | Desenvolvedor Full Stack'
            value={contact.title}
            onChange={e => updateContact('title', e.target.value)}
          />
        </Field>

        <Field label='Email' tooltip='Use email profissional. Evite apelidos ou emails com números aleatórios' required>
          <Input
            type='email'
            placeholder='nome@email.com'
            value={contact.email}
            onChange={e => updateContact('email', e.target.value)}
          />
        </Field>

        <Field label='Telefone' tooltip='Inclua o DDD. Formato recomendado: (11) 99999-9999' required>
          <Input
            placeholder='(11) 99999-9999'
            value={contact.phone}
            onChange={e => updateContact('phone', e.target.value)}
          />
        </Field>

        <Field label='LinkedIn URL' tooltip='Cole a URL do seu perfil LinkedIn. Ex: linkedin.com/in/seu-nome' required className='col-span-2'>
          <Input
            placeholder='linkedin.com/in/seu-nome'
            value={contact.linkedin}
            onChange={e => updateContact('linkedin', e.target.value)}
          />
        </Field>

        <Field label='Cidade / UF' tooltip='Cidade e estado onde você mora ou está disponível para trabalhar' required>
          <Input
            placeholder='São Paulo, SP'
            value={contact.city}
            onChange={e => updateContact('city', e.target.value)}
          />
        </Field>

        <Field label='GitHub (opcional)' tooltip='Seu perfil GitHub aumenta a pontuação ATS para vagas técnicas'>
          <Input
            placeholder='github.com/seu-usuario'
            value={contact.github || ''}
            onChange={e => updateContact('github', e.target.value)}
          />
        </Field>
      </div>
    </SectionCard>
  )
}
