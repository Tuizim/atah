export interface ContactInfo {
  fullName: string
  title: string
  email: string
  phone: string
  linkedin: string
  city: string
  github?: string
}

export interface ExperienceBullet {
  id: string
  text: string
  metric?: string
}

export interface Experience {
  id: string
  company: string
  role: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  current: boolean
  bullets: ExperienceBullet[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: string
  endYear: string
  current: boolean
}

export interface Skill {
  id: string
  name: string
  category: 'technical' | 'soft' | 'tool'
}

export interface Language {
  id: string
  name: string
  level: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic'
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  url?: string
}

export interface Project {
  id: string
  title: string
  description: string
  url?: string
  technologies: string[]
}

export interface ResumeData {
  contact: ContactInfo
  summary: string
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  languages: Language[]
  certifications: Certification[]
  projects: Project[]
}

export interface ATSDimension {
  name: string
  score: number
  maxScore: number
  tips: string[]
}

export interface ATSScore {
  total: number
  dimensions: ATSDimension[]
}
