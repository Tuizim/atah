'use client'

import { useResumeStore } from '@/store/resume-store'
import { getLabels, ResumeLabels } from '@/lib/resume-labels'

export function useResumeLabels(): ResumeLabels {
  const resumeLanguage = useResumeStore(s => s.resumeLanguage)
  return getLabels(resumeLanguage)
}
