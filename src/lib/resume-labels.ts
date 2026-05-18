import { RESUME_LABELS } from './translations'

export interface DegreeOption {
  value: string
  label: string
}

export interface QuickSkill {
  name: string
  category: 'technical' | 'tool' | 'soft'
}

export interface TemplateTranslation {
  name: string
  why: string
}

export interface ResumeLabels {
  months: string[]
  present: string
  inProgress: string
  degreeJoiner: string
  levelLabels: Record<string, string>
  categoryLabels: { technical: string; tool: string; soft: string }
  degreeOptions: DegreeOption[]
  bulletSuggestions: string[]
  quickSkills: QuickSkill[]
  templates: Record<string, TemplateTranslation>
  sections: {
    summary: string
    experience: string
    education: string
    skills: string
    languages: string
    certifications: string
    projects: string
    technical: string
    tools: string
    soft: string
  }
}

export interface LanguageOption {
  code: string
  name: string
  flag: string
}

export { LANGUAGES, RESUME_LABELS } from './translations'

export function getLabels(code: string): ResumeLabels {
  return RESUME_LABELS[code] ?? RESUME_LABELS['pt-BR']
}
