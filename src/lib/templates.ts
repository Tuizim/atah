export interface TemplateConfig {
  id: string
  name: string
  accent: string
  accentLight: string
  accentText: string
  why: string
}

export const TEMPLATES: TemplateConfig[] = [
  { id: 'classic',   name: 'Classic',   accent: '#7c3aed', accentLight: '#f3f0ff', accentText: '#6d28d9', why: 'Layout tradicional, ideal para a maioria das vagas.' },
  { id: 'modern',    name: 'Modern',    accent: '#0ea5e9', accentLight: '#f0f9ff', accentText: '#0369a1', why: 'Visual contemporâneo, destaca-se em empresas de tecnologia.' },
  { id: 'minimal',   name: 'Minimal',   accent: '#334155', accentLight: '#f8fafc', accentText: '#1e293b', why: 'Sóbrio e elegante, ótimo para cargos sênior e executivo.' },
  { id: 'executive', name: 'Executive', accent: '#1e3a5f', accentLight: '#f0f4f8', accentText: '#ffffff', why: 'Autoridade e seriedade para posições de liderança.' },
]

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0]
}
