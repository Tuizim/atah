'use client'

import { HeaderSection } from './header-section'
import { SummarySection } from './summary-section'
import { ExperienceSection } from './experience-section'
import { EducationSection } from './education-section'
import { SkillsSection } from './skills-section'
import { LanguagesSection } from './languages-section'
import { CertificationsSection } from './certifications-section'
import { ProjectsSection } from './projects-section'

export function FormPanel() {
  return (
    <div className='w-[480px] shrink-0 h-full overflow-y-auto flex flex-col gap-3 p-4'>
      <HeaderSection />
      <SummarySection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <LanguagesSection />
      <CertificationsSection />
      <ProjectsSection />
      <div className='h-4' />
    </div>
  )
}
