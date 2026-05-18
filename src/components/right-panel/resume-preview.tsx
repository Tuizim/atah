'use client'

import React from 'react'
import { ResumeData } from '@/lib/types'
import { TemplateConfig } from '@/lib/templates'
import { ResumeLabels } from '@/lib/resume-labels'

interface PreviewProps {
  data: ResumeData
  template: TemplateConfig
  labels: ResumeLabels
}

function formatPeriod(
  startMonth: string, startYear: string,
  endMonth: string, endYear: string,
  current: boolean,
  labels: ResumeLabels,
): string {
  const fmt = (m: string, y: string) => {
    const mn = parseInt(m)
    return mn > 0 ? `${labels.months[mn - 1]} ${y}` : y
  }
  const start = fmt(startMonth, startYear)
  const end = current ? labels.present : fmt(endMonth, endYear)
  return [start, end].filter(Boolean).join(' – ')
}

function resolveDegree(value: string, labels: ResumeLabels): string {
  return labels.degreeOptions.find(d => d.value === value)?.label ?? value
}

function ContactLine({ contact }: { contact: ResumeData['contact'] }) {
  const parts = [contact.email, contact.phone, contact.city, contact.linkedin, contact.github].filter(Boolean)
  return <>{parts.join('  ·  ')}</>
}

// ─── Classic ─────────────────────────────────────────────────────────────────

function ClassicPreview({ data, template, labels }: PreviewProps) {
  const { contact, summary, experiences, education, skills, languages, certifications, projects } = data
  const techSkills = skills.filter(s => s.category === 'technical' || s.category === 'tool')
  const softSkills = skills.filter(s => s.category === 'soft')
  const t = template.accent

  const ST = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: '8.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8pt', color: t, borderBottom: `1.5px solid ${t}`, paddingBottom: '2pt', marginBottom: '6pt', marginTop: 0 }}>{children}</h2>
  )

  return (
    <div id='resume-preview' style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Inter',Arial,sans-serif", fontSize: '9.5pt', lineHeight: '1.45', color: '#1e293b', backgroundColor: '#fff', padding: '16mm 18mm', boxSizing: 'border-box' }}>
      <div style={{ borderBottom: `2px solid ${t}`, paddingBottom: '10pt', marginBottom: '12pt' }}>
        {contact.fullName && <h1 style={{ fontSize: '21pt', fontWeight: 700, margin: 0, color: '#0f172a', letterSpacing: '-0.3pt' }}>{contact.fullName}</h1>}
        {contact.title && <p style={{ fontSize: '11pt', color: t, fontWeight: 600, margin: '2pt 0 5pt' }}>{contact.title}</p>}
        <p style={{ fontSize: '8pt', color: '#475569', margin: 0 }}><ContactLine contact={contact} /></p>
      </div>
      {summary.trim() && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.summary}</ST><p style={{ fontSize: '9pt', color: '#374151', textAlign: 'justify', margin: 0 }}>{summary}</p></section>}
      {experiences.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.experience}</ST>{experiences.map((exp, i) => (<div key={exp.id} style={{ marginBottom: i < experiences.length - 1 ? '9pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><div><span style={{ fontWeight: 700 }}>{exp.role}</span>{exp.company && <span style={{ color: t, fontWeight: 600 }}> · {exp.company}</span>}</div><span style={{ fontSize: '8pt', color: '#64748b', whiteSpace: 'nowrap' }}>{formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current, labels)}</span></div>{exp.bullets.filter(b => b.text.trim()).length > 0 && <ul style={{ margin: '3pt 0 0 12pt', padding: 0 }}>{exp.bullets.filter(b => b.text.trim()).map(b => <li key={b.id} style={{ fontSize: '8.5pt', color: '#374151', marginBottom: '2pt' }}>{b.text}{b.metric?.trim() && <span style={{ color: t, fontWeight: 600 }}> ({b.metric})</span>}</li>)}</ul>}</div>))}</section>}
      {education.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.education}</ST>{education.map((edu, i) => (<div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: i < education.length - 1 ? '5pt' : 0 }}><div><span style={{ fontWeight: 700 }}>{resolveDegree(edu.degree, labels)}{edu.field ? ` ${labels.degreeJoiner} ${edu.field}` : ''}</span>{edu.institution && <span style={{ fontSize: '8.5pt', color: '#475569' }}> · {edu.institution}</span>}</div><span style={{ fontSize: '8pt', color: '#64748b' }}>{edu.startYear && (edu.endYear || edu.current) ? `${edu.startYear} – ${edu.current ? labels.inProgress : edu.endYear}` : (edu.endYear || edu.startYear)}</span></div>))}</section>}
      {(techSkills.length > 0 || softSkills.length > 0 || languages.length > 0) && <section style={{ marginBottom: '12pt', display: 'flex', gap: '20pt' }}>{(techSkills.length > 0 || softSkills.length > 0) && <div style={{ flex: 2 }}><ST>{labels.sections.skills}</ST>{techSkills.length > 0 && <p style={{ fontSize: '8.5pt', marginBottom: '2pt' }}><strong>{labels.sections.technical}: </strong>{techSkills.map(s => s.name).join(' · ')}</p>}{softSkills.length > 0 && <p style={{ fontSize: '8.5pt', margin: 0 }}><strong>{labels.sections.soft}: </strong>{softSkills.map(s => s.name).join(' · ')}</p>}</div>}{languages.length > 0 && <div style={{ flex: 1 }}><ST>{labels.sections.languages}</ST>{languages.map(l => <p key={l.id} style={{ fontSize: '8.5pt', margin: '0 0 1pt' }}><strong>{l.name}</strong>{l.level ? ` — ${labels.levelLabels[l.level]}` : ''}</p>)}</div>}</section>}
      {certifications.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.certifications}</ST>{certifications.map((c, i) => (<div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < certifications.length - 1 ? '3pt' : 0 }}><span style={{ fontSize: '8.5pt' }}><strong>{c.name}</strong>{c.issuer && ` · ${c.issuer}`}</span>{c.year && <span style={{ fontSize: '8pt', color: '#64748b' }}>{c.year}</span>}</div>))}</section>}
      {projects.length > 0 && <section><ST>{labels.sections.projects}</ST>{projects.map((p, i) => (<div key={p.id} style={{ marginBottom: i < projects.length - 1 ? '7pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{p.title}</strong>{p.url && <span style={{ fontSize: '7.5pt', color: t }}>{p.url}</span>}</div>{p.description && <p style={{ fontSize: '8.5pt', color: '#374151', margin: '2pt 0 1pt' }}>{p.description}</p>}{p.technologies.length > 0 && <p style={{ fontSize: '8pt', color: '#64748b', margin: 0 }}><em>{p.technologies.join(' · ')}</em></p>}</div>))}</section>}
    </div>
  )
}

// ─── Modern ──────────────────────────────────────────────────────────────────

function ModernPreview({ data, template, labels }: PreviewProps) {
  const { contact, summary, experiences, education, skills, languages, certifications, projects } = data
  const techSkills = skills.filter(s => s.category === 'technical' || s.category === 'tool')
  const softSkills = skills.filter(s => s.category === 'soft')
  const t = template.accent

  const ST = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '7pt', marginBottom: '7pt' }}>
      <div style={{ width: '3pt', height: '11pt', backgroundColor: t, borderRadius: '2pt', flexShrink: 0 }} />
      <h2 style={{ fontSize: '8.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6pt', color: '#1e293b', margin: 0 }}>{children}</h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
    </div>
  )

  return (
    <div id='resume-preview' style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Inter',Arial,sans-serif", fontSize: '9.5pt', lineHeight: '1.45', color: '#1e293b', backgroundColor: '#fff', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: template.accentLight, borderLeft: `5pt solid ${t}`, padding: '14mm 18mm 12mm' }}>
        {contact.fullName && <h1 style={{ fontSize: '22pt', fontWeight: 800, margin: '0 0 2pt', color: '#0f172a', letterSpacing: '-0.5pt' }}>{contact.fullName}</h1>}
        {contact.title && <p style={{ fontSize: '11pt', color: t, fontWeight: 600, margin: '0 0 7pt' }}>{contact.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4pt' }}>
          {[contact.email, contact.phone, contact.city, contact.linkedin, contact.github].filter(Boolean).map((v, i) => (
            <span key={i} style={{ fontSize: '7.5pt', color: '#475569', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '99pt', padding: '1pt 7pt' }}>{v}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: '12mm 18mm' }}>
        {summary.trim() && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.summary}</ST><p style={{ fontSize: '9pt', color: '#374151', margin: 0, textAlign: 'justify' }}>{summary}</p></section>}
        {experiences.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.experience}</ST>{experiences.map((exp, i) => (<div key={exp.id} style={{ marginBottom: i < experiences.length - 1 ? '9pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><span style={{ fontWeight: 700, fontSize: '10pt' }}>{exp.role}</span>{exp.company && <span style={{ color: '#475569', fontSize: '9pt' }}> · {exp.company}</span>}</div><span style={{ fontSize: '7.5pt', color: '#fff', backgroundColor: t, borderRadius: '99pt', padding: '1pt 8pt', whiteSpace: 'nowrap' }}>{formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current, labels)}</span></div>{exp.bullets.filter(b => b.text.trim()).length > 0 && <ul style={{ margin: '3pt 0 0 12pt', padding: 0 }}>{exp.bullets.filter(b => b.text.trim()).map(b => <li key={b.id} style={{ fontSize: '8.5pt', color: '#374151', marginBottom: '2pt' }}>{b.text}{b.metric?.trim() && <span style={{ color: t, fontWeight: 600 }}> ({b.metric})</span>}</li>)}</ul>}</div>))}</section>}
        {education.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.education}</ST>{education.map((edu, i) => (<div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < education.length - 1 ? '5pt' : 0 }}><div><strong>{resolveDegree(edu.degree, labels)}{edu.field ? ` ${labels.degreeJoiner} ${edu.field}` : ''}</strong>{edu.institution && <span style={{ color: '#475569', fontSize: '8.5pt' }}> · {edu.institution}</span>}</div><span style={{ fontSize: '8pt', color: '#64748b' }}>{edu.startYear && (edu.endYear || edu.current) ? `${edu.startYear} – ${edu.current ? labels.inProgress : edu.endYear}` : (edu.endYear || edu.startYear)}</span></div>))}</section>}
        {(techSkills.length > 0 || softSkills.length > 0 || languages.length > 0) && <section style={{ marginBottom: '12pt', display: 'flex', gap: '20pt' }}>{(techSkills.length > 0 || softSkills.length > 0) && <div style={{ flex: 2 }}><ST>{labels.sections.skills}</ST>{techSkills.length > 0 && <p style={{ fontSize: '8.5pt', marginBottom: '2pt' }}><strong>{labels.sections.technical}: </strong>{techSkills.map(s => s.name).join(' · ')}</p>}{softSkills.length > 0 && <p style={{ fontSize: '8.5pt', margin: 0 }}><strong>{labels.sections.soft}: </strong>{softSkills.map(s => s.name).join(' · ')}</p>}</div>}{languages.length > 0 && <div style={{ flex: 1 }}><ST>{labels.sections.languages}</ST>{languages.map(l => <p key={l.id} style={{ fontSize: '8.5pt', margin: '0 0 1pt' }}><strong>{l.name}</strong>{l.level ? ` — ${labels.levelLabels[l.level]}` : ''}</p>)}</div>}</section>}
        {certifications.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.certifications}</ST>{certifications.map((c, i) => (<div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < certifications.length - 1 ? '3pt' : 0 }}><span style={{ fontSize: '8.5pt' }}><strong>{c.name}</strong>{c.issuer && ` · ${c.issuer}`}</span>{c.year && <span style={{ fontSize: '8pt', color: '#64748b' }}>{c.year}</span>}</div>))}</section>}
        {projects.length > 0 && <section><ST>{labels.sections.projects}</ST>{projects.map((p, i) => (<div key={p.id} style={{ marginBottom: i < projects.length - 1 ? '7pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{p.title}</strong>{p.url && <span style={{ fontSize: '7.5pt', color: t }}>{p.url}</span>}</div>{p.description && <p style={{ fontSize: '8.5pt', color: '#374151', margin: '2pt 0 1pt' }}>{p.description}</p>}{p.technologies.length > 0 && <p style={{ fontSize: '8pt', color: '#64748b', margin: 0 }}><em>{p.technologies.join(' · ')}</em></p>}</div>))}</section>}
      </div>
    </div>
  )
}

// ─── Minimal ─────────────────────────────────────────────────────────────────

function MinimalPreview({ data, template, labels }: PreviewProps) {
  const { contact, summary, experiences, education, skills, languages, certifications, projects } = data
  const techSkills = skills.filter(s => s.category === 'technical' || s.category === 'tool')
  const softSkills = skills.filter(s => s.category === 'soft')

  const ST = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: '7.5pt', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '1.5pt', color: '#94a3b8', borderBottom: '1px solid #f1f5f9', paddingBottom: '4pt', marginBottom: '8pt', marginTop: 0 }}>{children}</h2>
  )

  return (
    <div id='resume-preview' style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Inter',Arial,sans-serif", fontSize: '9.5pt', lineHeight: '1.55', color: '#334155', backgroundColor: '#fff', padding: '20mm 20mm', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '16pt' }}>
        {contact.fullName && <h1 style={{ fontSize: '24pt', fontWeight: 300, margin: '0 0 1pt', color: '#0f172a', letterSpacing: '-0.5pt' }}>{contact.fullName}</h1>}
        {contact.title && <p style={{ fontSize: '10pt', color: '#64748b', fontWeight: 400, margin: '0 0 6pt' }}>{contact.title}</p>}
        <p style={{ fontSize: '8pt', color: '#94a3b8', margin: 0 }}><ContactLine contact={contact} /></p>
      </div>
      {summary.trim() && <section style={{ marginBottom: '14pt' }}><ST>{labels.sections.summary}</ST><p style={{ fontSize: '9pt', color: '#475569', margin: 0, lineHeight: 1.6 }}>{summary}</p></section>}
      {experiences.length > 0 && <section style={{ marginBottom: '14pt' }}><ST>{labels.sections.experience}</ST>{experiences.map((exp, i) => (<div key={exp.id} style={{ marginBottom: i < experiences.length - 1 ? '10pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><div><span style={{ fontWeight: 600, color: '#1e293b' }}>{exp.role}</span>{exp.company && <span style={{ color: '#64748b' }}> — {exp.company}</span>}</div><span style={{ fontSize: '8pt', color: '#94a3b8', whiteSpace: 'nowrap' }}>{formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current, labels)}</span></div>{exp.bullets.filter(b => b.text.trim()).length > 0 && <ul style={{ margin: '4pt 0 0 12pt', padding: 0 }}>{exp.bullets.filter(b => b.text.trim()).map(b => <li key={b.id} style={{ fontSize: '8.5pt', color: '#475569', marginBottom: '2pt' }}>{b.text}{b.metric?.trim() && <span style={{ color: '#334155', fontWeight: 600 }}> ({b.metric})</span>}</li>)}</ul>}</div>))}</section>}
      {education.length > 0 && <section style={{ marginBottom: '14pt' }}><ST>{labels.sections.education}</ST>{education.map((edu, i) => (<div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < education.length - 1 ? '5pt' : 0 }}><div><span style={{ fontWeight: 600, color: '#1e293b' }}>{resolveDegree(edu.degree, labels)}{edu.field ? ` ${labels.degreeJoiner} ${edu.field}` : ''}</span>{edu.institution && <span style={{ color: '#64748b' }}> · {edu.institution}</span>}</div><span style={{ fontSize: '8pt', color: '#94a3b8' }}>{edu.startYear && (edu.endYear || edu.current) ? `${edu.startYear} – ${edu.current ? labels.inProgress : edu.endYear}` : (edu.endYear || edu.startYear)}</span></div>))}</section>}
      {(techSkills.length > 0 || softSkills.length > 0 || languages.length > 0) && <section style={{ marginBottom: '14pt', display: 'flex', gap: '20pt' }}>{(techSkills.length > 0 || softSkills.length > 0) && <div style={{ flex: 2 }}><ST>{labels.sections.skills}</ST>{techSkills.length > 0 && <p style={{ fontSize: '8.5pt', marginBottom: '2pt', color: '#475569' }}><strong style={{ color: '#334155' }}>{labels.sections.technical}: </strong>{techSkills.map(s => s.name).join(' · ')}</p>}{softSkills.length > 0 && <p style={{ fontSize: '8.5pt', margin: 0, color: '#475569' }}><strong style={{ color: '#334155' }}>{labels.sections.soft}: </strong>{softSkills.map(s => s.name).join(' · ')}</p>}</div>}{languages.length > 0 && <div style={{ flex: 1 }}><ST>{labels.sections.languages}</ST>{languages.map(l => <p key={l.id} style={{ fontSize: '8.5pt', margin: '0 0 1pt', color: '#475569' }}><strong style={{ color: '#334155' }}>{l.name}</strong>{l.level ? ` — ${labels.levelLabels[l.level]}` : ''}</p>)}</div>}</section>}
      {certifications.length > 0 && <section style={{ marginBottom: '14pt' }}><ST>{labels.sections.certifications}</ST>{certifications.map((c, i) => (<div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < certifications.length - 1 ? '3pt' : 0 }}><span style={{ fontSize: '8.5pt', color: '#475569' }}><span style={{ fontWeight: 600, color: '#334155' }}>{c.name}</span>{c.issuer && ` · ${c.issuer}`}</span>{c.year && <span style={{ fontSize: '8pt', color: '#94a3b8' }}>{c.year}</span>}</div>))}</section>}
      {projects.length > 0 && <section><ST>{labels.sections.projects}</ST>{projects.map((p, i) => (<div key={p.id} style={{ marginBottom: i < projects.length - 1 ? '7pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 600, color: '#1e293b' }}>{p.title}</span>{p.url && <span style={{ fontSize: '7.5pt', color: '#94a3b8' }}>{p.url}</span>}</div>{p.description && <p style={{ fontSize: '8.5pt', color: '#475569', margin: '2pt 0 1pt' }}>{p.description}</p>}{p.technologies.length > 0 && <p style={{ fontSize: '8pt', color: '#94a3b8', margin: 0 }}>{p.technologies.join(' · ')}</p>}</div>))}</section>}
    </div>
  )
}

// ─── Executive ───────────────────────────────────────────────────────────────

function ExecutivePreview({ data, template, labels }: PreviewProps) {
  const { contact, summary, experiences, education, skills, languages, certifications, projects } = data
  const techSkills = skills.filter(s => s.category === 'technical' || s.category === 'tool')
  const softSkills = skills.filter(s => s.category === 'soft')
  const t = template.accent

  const ST = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: '8.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1pt', color: t, borderBottom: `2px solid ${t}`, paddingBottom: '2pt', marginBottom: '6pt', marginTop: 0 }}>{children}</h2>
  )

  return (
    <div id='resume-preview' style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Inter',Arial,sans-serif", fontSize: '9.5pt', lineHeight: '1.45', color: '#1e293b', backgroundColor: '#fff', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: t, padding: '14mm 18mm 12mm', color: '#fff' }}>
        {contact.fullName && <h1 style={{ fontSize: '23pt', fontWeight: 800, margin: '0 0 2pt', color: '#fff', letterSpacing: '-0.3pt' }}>{contact.fullName}</h1>}
        {contact.title && <p style={{ fontSize: '11pt', color: 'rgba(255,255,255,0.8)', fontWeight: 400, margin: '0 0 8pt', letterSpacing: '0.2pt' }}>{contact.title}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 14pt', fontSize: '7.5pt', color: 'rgba(255,255,255,0.7)' }}>
          {[contact.email, contact.phone, contact.city, contact.linkedin, contact.github].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
        </div>
      </div>
      <div style={{ padding: '12mm 18mm' }}>
        {summary.trim() && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.summary}</ST><p style={{ fontSize: '9pt', color: '#374151', margin: 0, textAlign: 'justify' }}>{summary}</p></section>}
        {experiences.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.experience}</ST>{experiences.map((exp, i) => (<div key={exp.id} style={{ marginBottom: i < experiences.length - 1 ? '9pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><div><span style={{ fontWeight: 700, color: '#0f172a' }}>{exp.role}</span>{exp.company && <span style={{ color: '#475569', fontSize: '9pt' }}> · {exp.company}</span>}</div><span style={{ fontSize: '8pt', color: '#64748b', whiteSpace: 'nowrap', fontStyle: 'italic' }}>{formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current, labels)}</span></div>{exp.bullets.filter(b => b.text.trim()).length > 0 && <ul style={{ margin: '3pt 0 0 12pt', padding: 0 }}>{exp.bullets.filter(b => b.text.trim()).map(b => <li key={b.id} style={{ fontSize: '8.5pt', color: '#374151', marginBottom: '2pt' }}>{b.text}{b.metric?.trim() && <span style={{ color: t, fontWeight: 700 }}> ({b.metric})</span>}</li>)}</ul>}</div>))}</section>}
        {education.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.education}</ST>{education.map((edu, i) => (<div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < education.length - 1 ? '5pt' : 0 }}><div><strong>{resolveDegree(edu.degree, labels)}{edu.field ? ` ${labels.degreeJoiner} ${edu.field}` : ''}</strong>{edu.institution && <span style={{ color: '#475569', fontSize: '8.5pt' }}> · {edu.institution}</span>}</div><span style={{ fontSize: '8pt', color: '#64748b' }}>{edu.startYear && (edu.endYear || edu.current) ? `${edu.startYear} – ${edu.current ? labels.inProgress : edu.endYear}` : (edu.endYear || edu.startYear)}</span></div>))}</section>}
        {(techSkills.length > 0 || softSkills.length > 0 || languages.length > 0) && <section style={{ marginBottom: '12pt', display: 'flex', gap: '20pt' }}>{(techSkills.length > 0 || softSkills.length > 0) && <div style={{ flex: 2 }}><ST>{labels.sections.skills}</ST>{techSkills.length > 0 && <p style={{ fontSize: '8.5pt', marginBottom: '2pt' }}><strong>{labels.sections.technical}: </strong>{techSkills.map(s => s.name).join(' · ')}</p>}{softSkills.length > 0 && <p style={{ fontSize: '8.5pt', margin: 0 }}><strong>{labels.sections.soft}: </strong>{softSkills.map(s => s.name).join(' · ')}</p>}</div>}{languages.length > 0 && <div style={{ flex: 1 }}><ST>{labels.sections.languages}</ST>{languages.map(l => <p key={l.id} style={{ fontSize: '8.5pt', margin: '0 0 1pt' }}><strong>{l.name}</strong>{l.level ? ` — ${labels.levelLabels[l.level]}` : ''}</p>)}</div>}</section>}
        {certifications.length > 0 && <section style={{ marginBottom: '12pt' }}><ST>{labels.sections.certifications}</ST>{certifications.map((c, i) => (<div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: i < certifications.length - 1 ? '3pt' : 0 }}><span style={{ fontSize: '8.5pt' }}><strong>{c.name}</strong>{c.issuer && ` · ${c.issuer}`}</span>{c.year && <span style={{ fontSize: '8pt', color: '#64748b' }}>{c.year}</span>}</div>))}</section>}
        {projects.length > 0 && <section><ST>{labels.sections.projects}</ST>{projects.map((p, i) => (<div key={p.id} style={{ marginBottom: i < projects.length - 1 ? '7pt' : 0 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{p.title}</strong>{p.url && <span style={{ fontSize: '7.5pt', color: t }}>{p.url}</span>}</div>{p.description && <p style={{ fontSize: '8.5pt', color: '#374151', margin: '2pt 0 1pt' }}>{p.description}</p>}{p.technologies.length > 0 && <p style={{ fontSize: '8pt', color: '#64748b', margin: 0 }}><em>{p.technologies.join(' · ')}</em></p>}</div>))}</section>}
      </div>
    </div>
  )
}

// ─── Router ──────────────────────────────────────────────────────────────────

export function ResumePreview({ data, template, labels }: PreviewProps) {
  switch (template.id) {
    case 'modern':    return <ModernPreview    data={data} template={template} labels={labels} />
    case 'minimal':   return <MinimalPreview   data={data} template={template} labels={labels} />
    case 'executive': return <ExecutivePreview data={data} template={template} labels={labels} />
    default:          return <ClassicPreview   data={data} template={template} labels={labels} />
  }
}
