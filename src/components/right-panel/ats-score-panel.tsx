'use client'

import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { useState } from 'react'
import { ATSScore } from '@/lib/types'
import { cn } from '@/lib/utils'

function ScoreRing({ score }: { score: number }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#f43f5e'

  return (
    <svg width='96' height='96' viewBox='0 0 96 96'>
      <circle cx='48' cy='48' r={r} fill='none' stroke='#f1f5f9' strokeWidth='8' />
      <circle
        cx='48' cy='48' r={r}
        fill='none'
        stroke={color}
        strokeWidth='8'
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap='round'
        transform='rotate(-90 48 48)'
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
      <text x='48' y='44' textAnchor='middle' fontSize='20' fontWeight='700' fill={color}>{score}</text>
      <text x='48' y='60' textAnchor='middle' fontSize='10' fill='#94a3b8'>/ 100</text>
    </svg>
  )
}

function DimensionRow({ name, score, maxScore, tips }: { name: string; score: number; maxScore: number; tips: string[] }) {
  const [open, setOpen] = useState(false)
  const pct = Math.round((score / maxScore) * 100)
  const color = pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'

  return (
    <div className='flex flex-col gap-1'>
      <button type='button' onClick={() => setOpen(!open)} className='flex items-center gap-2 w-full text-left hover:bg-slate-50 rounded px-1 py-0.5 transition-colors'>
        <span className='text-xs text-slate-600 w-24 shrink-0'>{name}</span>
        <div className='flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden'>
          <div className={cn('h-full rounded-full transition-all duration-500', color)} style={{ width: `${pct}%` }} />
        </div>
        <span className='text-xs font-semibold text-slate-700 w-14 text-right shrink-0'>{score}/{maxScore}</span>
        {tips.length > 0 ? (
          open ? <ChevronUp size={12} className='text-slate-400' /> : <ChevronDown size={12} className='text-slate-400' />
        ) : (
          <CheckCircle2 size={12} className='text-emerald-500' />
        )}
      </button>
      {open && tips.length > 0 && (
        <ul className='ml-2 flex flex-col gap-1 pb-1'>
          {tips.map((tip, i) => (
            <li key={i} className='flex gap-1.5 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1'>
              <AlertCircle size={11} className='mt-0.5 shrink-0' />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ATSScorePanel({ atsScore }: { atsScore: ATSScore }) {
  const { total, dimensions } = atsScore
  const label = total >= 75 ? 'Excelente' : total >= 50 ? 'Bom' : total >= 30 ? 'Regular' : 'Fraco'
  const labelColor = total >= 75 ? 'text-emerald-600' : total >= 50 ? 'text-amber-600' : 'text-rose-600'
  const allTips = dimensions.flatMap(d => d.tips)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <ScoreRing score={total} />
        <div>
          <p className='text-xs text-slate-500 font-medium uppercase tracking-wide'>Pontuação</p>
          <p className={cn('text-xl font-bold', labelColor)}>{label}</p>
          <p className='text-xs text-slate-400 mt-0.5'>
            {allTips.length === 0 ? 'Currículo otimizado!' : `${allTips.length} melhoria${allTips.length > 1 ? 's' : ''} sugerida${allTips.length > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-1 mb-1'>
          <Info size={12} className='text-slate-400' />
          <span className='text-xs text-slate-400'>Clique em cada categoria para ver dicas</span>
        </div>
        {dimensions.map(d => (
          <DimensionRow key={d.name} {...d} />
        ))}
      </div>
    </div>
  )
}
