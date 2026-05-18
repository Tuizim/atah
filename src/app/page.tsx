'use client'

import { useMemo, useState } from 'react'
import { useResumeStore } from '@/store/resume-store'
import { calculateATSScore } from '@/lib/ats-scoring'
import { getTemplate } from '@/lib/templates'
import { getLabels } from '@/lib/resume-labels'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppHeader } from '@/components/app-header'
import { FormPanel } from '@/components/left-panel/form-panel'
import { ResumePreview } from '@/components/right-panel/resume-preview'
import { ScoreDrawer } from '@/components/right-panel/score-drawer'
import { ConfigDrawer } from '@/components/right-panel/config-drawer'

export default function HomePage() {
  const { data, templateId, resumeLanguage, reset, setTemplate, setResumeLanguage } = useResumeStore()
  const atsScore = useMemo(() => calculateATSScore(data), [data])
  const [scoreOpen, setScoreOpen] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)

  const template = getTemplate(templateId)
  const labels = getLabels(resumeLanguage)

  const handleReset = () => {
    if (confirm('Limpar todos os dados? Esta ação não pode ser desfeita.')) reset()
  }

  return (
    <TooltipProvider delayDuration={400}>
      <div className='h-screen bg-slate-50 flex flex-col'>
        <AppHeader
          atsScore={atsScore}
          onReset={handleReset}
          onScoreOpen={() => setScoreOpen(true)}
          onConfigOpen={() => setConfigOpen(true)}
        />

        <div className='flex-1 overflow-hidden max-w-screen-2xl mx-auto w-full flex'>
          <FormPanel />

          <div className='flex-1 h-full overflow-y-auto flex justify-center p-4'>
            <div className='shadow-2xl rounded-sm border border-slate-200' style={{ width: '210mm' }}>
              <ResumePreview data={data} template={template} labels={labels} />
            </div>
          </div>
        </div>

        <ScoreDrawer
          atsScore={atsScore}
          open={scoreOpen}
          onClose={() => setScoreOpen(false)}
        />

        <ConfigDrawer
          open={configOpen}
          onClose={() => setConfigOpen(false)}
          templateId={templateId}
          language={resumeLanguage}
          onTemplateChange={setTemplate}
          onLanguageChange={setResumeLanguage}
        />
      </div>
    </TooltipProvider>
  )
}
