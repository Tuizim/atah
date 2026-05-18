export interface TemplateConfig {
  id: string
  accent: string
  accentLight: string
  accentText: string
}

export const TEMPLATES: TemplateConfig[] = [
  { id: 'classic',   accent: '#7c3aed', accentLight: '#f3f0ff', accentText: '#6d28d9' },
  { id: 'modern',    accent: '#0ea5e9', accentLight: '#f0f9ff', accentText: '#0369a1' },
  { id: 'minimal',   accent: '#334155', accentLight: '#f8fafc', accentText: '#1e293b' },
  { id: 'executive', accent: '#1e3a5f', accentLight: '#f0f4f8', accentText: '#ffffff' },
]

export function getTemplate(id: string): TemplateConfig {
  return TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0]
}
