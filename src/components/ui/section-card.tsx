'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  strength?: number
  badge?: string
}

export function SectionCard({ title, icon, children, defaultOpen = true, strength, badge }: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  const strengthColor =
    strength === undefined ? '' :
    strength >= 80 ? 'bg-emerald-500' :
    strength >= 50 ? 'bg-amber-500' :
    'bg-rose-500'

  return (
    <div className='rounded-xl border border-slate-200 bg-white shadow-sm'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors'
      >
        <span className='text-violet-600'>{icon}</span>
        <span className='font-semibold text-slate-800 text-sm flex-1 text-left'>{title}</span>
        {badge && (
          <span className='text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium'>{badge}</span>
        )}
        {strength !== undefined && (
          <div className='flex items-center gap-2'>
            <div className='w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden'>
              <div className={cn('h-full rounded-full transition-all duration-500', strengthColor)} style={{ width: `${strength}%` }} />
            </div>
            <span className='text-xs text-slate-500 w-8 text-right'>{strength}%</span>
          </div>
        )}
        <span className='text-slate-400 ml-1'>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {open && (
        <div className='px-4 pb-4 pt-1 border-t border-slate-100'>
          {children}
        </div>
      )}
    </div>
  )
}
