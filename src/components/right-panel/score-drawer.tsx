'use client'

import { X, TrendingUp } from 'lucide-react'
import { ATSScorePanel } from './ats-score-panel'
import { ATSScore } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ScoreDrawerProps {
  atsScore: ATSScore
  open: boolean
  onClose: () => void
}

export function ScoreDrawer({ atsScore, open, onClose }: ScoreDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-[1px] transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-[57px] right-0 bottom-0 z-40 w-80 bg-white border-l border-slate-200 shadow-2xl',
          'flex flex-col transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className='flex items-center gap-2 px-4 py-3 border-b border-slate-100 shrink-0'>
          <TrendingUp size={15} className='text-violet-600' />
          <span className='text-sm font-semibold text-slate-800 flex-1'>Score ATS</span>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors'
          >
            <X size={15} />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-4'>
          <ATSScorePanel atsScore={atsScore} />
        </div>
      </div>
    </>
  )
}
