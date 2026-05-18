import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export const YEARS = Array.from({ length: 40 }, (_, i) => String(new Date().getFullYear() - i))
