'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ResumeData, Experience, Education, Skill, Language, Certification, Project } from '@/lib/types'
import { generateId } from '@/lib/utils'

interface ResumeStore {
  data: ResumeData
  templateId: string
  resumeLanguage: string
  setTemplate: (id: string) => void
  setResumeLanguage: (lang: string) => void
  updateContact: (field: string, value: string) => void
  updateSummary: (value: string) => void
  addExperience: () => void
  updateExperience: (id: string, field: string, value: unknown) => void
  removeExperience: (id: string) => void
  reorderExperiences: (startIndex: number, endIndex: number) => void
  addExperienceBullet: (expId: string) => void
  updateExperienceBullet: (expId: string, bulletId: string, field: string, value: string) => void
  removeExperienceBullet: (expId: string, bulletId: string) => void
  addEducation: () => void
  updateEducation: (id: string, field: string, value: unknown) => void
  removeEducation: (id: string) => void
  addSkill: (name: string, category: Skill['category']) => void
  removeSkill: (id: string) => void
  addLanguage: () => void
  updateLanguage: (id: string, field: string, value: string) => void
  removeLanguage: (id: string) => void
  addCertification: () => void
  updateCertification: (id: string, field: string, value: string) => void
  removeCertification: (id: string) => void
  addProject: () => void
  updateProject: (id: string, field: string, value: unknown) => void
  removeProject: (id: string) => void
  reset: () => void
}

const defaultData: ResumeData = {
  contact: { fullName: '', title: '', email: '', phone: '', linkedin: '', city: '', github: '' },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultData,
      templateId: 'classic',
      resumeLanguage: 'pt-BR',

      setTemplate: (id) => set({ templateId: id }),
      setResumeLanguage: (lang) => set({ resumeLanguage: lang }),

      updateContact: (field, value) =>
        set(s => ({ data: { ...s.data, contact: { ...s.data.contact, [field]: value } } })),

      updateSummary: (value) =>
        set(s => ({ data: { ...s.data, summary: value } })),

      addExperience: () =>
        set(s => ({
          data: {
            ...s.data,
            experiences: [
              ...s.data.experiences,
              {
                id: generateId(),
                company: '', role: '', startMonth: '', startYear: '',
                endMonth: '', endYear: '', current: false,
                bullets: [{ id: generateId(), text: '', metric: '' }],
              },
            ],
          },
        })),

      updateExperience: (id, field, value) =>
        set(s => ({
          data: {
            ...s.data,
            experiences: s.data.experiences.map(e => e.id === id ? { ...e, [field]: value } : e),
          },
        })),

      removeExperience: (id) =>
        set(s => ({ data: { ...s.data, experiences: s.data.experiences.filter(e => e.id !== id) } })),

      reorderExperiences: (startIndex, endIndex) =>
        set(s => {
          const list = [...s.data.experiences]
          const [removed] = list.splice(startIndex, 1)
          list.splice(endIndex, 0, removed)
          return { data: { ...s.data, experiences: list } }
        }),

      addExperienceBullet: (expId) =>
        set(s => ({
          data: {
            ...s.data,
            experiences: s.data.experiences.map(e =>
              e.id === expId
                ? { ...e, bullets: [...e.bullets, { id: generateId(), text: '', metric: '' }] }
                : e
            ),
          },
        })),

      updateExperienceBullet: (expId, bulletId, field, value) =>
        set(s => ({
          data: {
            ...s.data,
            experiences: s.data.experiences.map(e =>
              e.id === expId
                ? { ...e, bullets: e.bullets.map(b => b.id === bulletId ? { ...b, [field]: value } : b) }
                : e
            ),
          },
        })),

      removeExperienceBullet: (expId, bulletId) =>
        set(s => ({
          data: {
            ...s.data,
            experiences: s.data.experiences.map(e =>
              e.id === expId ? { ...e, bullets: e.bullets.filter(b => b.id !== bulletId) } : e
            ),
          },
        })),

      addEducation: () =>
        set(s => ({
          data: {
            ...s.data,
            education: [
              ...s.data.education,
              { id: generateId(), institution: '', degree: '', field: '', startYear: '', endYear: '', current: false },
            ],
          },
        })),

      updateEducation: (id, field, value) =>
        set(s => ({
          data: {
            ...s.data,
            education: s.data.education.map(e => e.id === id ? { ...e, [field]: value } : e),
          },
        })),

      removeEducation: (id) =>
        set(s => ({ data: { ...s.data, education: s.data.education.filter(e => e.id !== id) } })),

      addSkill: (name, category) =>
        set(s => ({
          data: { ...s.data, skills: [...s.data.skills, { id: generateId(), name, category }] },
        })),

      removeSkill: (id) =>
        set(s => ({ data: { ...s.data, skills: s.data.skills.filter(sk => sk.id !== id) } })),

      addLanguage: () =>
        set(s => ({
          data: {
            ...s.data,
            languages: [...s.data.languages, { id: generateId(), name: '', level: 'intermediate' }],
          },
        })),

      updateLanguage: (id, field, value) =>
        set(s => ({
          data: {
            ...s.data,
            languages: s.data.languages.map(l => l.id === id ? { ...l, [field]: value } : l),
          },
        })),

      removeLanguage: (id) =>
        set(s => ({ data: { ...s.data, languages: s.data.languages.filter(l => l.id !== id) } })),

      addCertification: () =>
        set(s => ({
          data: {
            ...s.data,
            certifications: [...s.data.certifications, { id: generateId(), name: '', issuer: '', year: '', url: '' }],
          },
        })),

      updateCertification: (id, field, value) =>
        set(s => ({
          data: {
            ...s.data,
            certifications: s.data.certifications.map(c => c.id === id ? { ...c, [field]: value } : c),
          },
        })),

      removeCertification: (id) =>
        set(s => ({ data: { ...s.data, certifications: s.data.certifications.filter(c => c.id !== id) } })),

      addProject: () =>
        set(s => ({
          data: {
            ...s.data,
            projects: [...s.data.projects, { id: generateId(), title: '', description: '', url: '', technologies: [] }],
          },
        })),

      updateProject: (id, field, value) =>
        set(s => ({
          data: {
            ...s.data,
            projects: s.data.projects.map(p => p.id === id ? { ...p, [field]: value } : p),
          },
        })),

      removeProject: (id) =>
        set(s => ({ data: { ...s.data, projects: s.data.projects.filter(p => p.id !== id) } })),

      reset: () => set({ data: defaultData }),
    }),
    { name: 'resume-builder-data' }
  )
)
