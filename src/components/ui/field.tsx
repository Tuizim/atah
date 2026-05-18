'use client'

import React from 'react'
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { cn } from '@/lib/utils'

interface FieldProps {
  label: string
  tooltip?: string
  children: React.ReactNode
  className?: string
  required?: boolean
}

export function Field({ label, tooltip, children, className, required }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className='flex items-center gap-1.5'>
        <label className='text-xs font-medium text-slate-600 uppercase tracking-wide'>
          {label}
          {required && <span className='text-rose-500 ml-0.5'>*</span>}
        </label>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type='button' className='text-slate-400 hover:text-slate-600 transition-colors'>
                <Info size={12} />
              </button>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800',
        'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400',
        'transition-all duration-150',
        error && 'border-rose-400 focus:ring-rose-500/30',
        className
      )}
      {...props}
    />
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 resize-none',
        'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400',
        'transition-all duration-150',
        className
      )}
      {...props}
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({ className, options, placeholder, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800',
        'focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400',
        'transition-all duration-150',
        className
      )}
      {...props}
    >
      {placeholder && <option value=''>{placeholder}</option>}
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
