import { ResumeData, ATSScore, ATSDimension } from './types'

const ACTION_VERBS = [
  'liderou', 'desenvolveu', 'implementou', 'criou', 'gerenciou', 'aumentou',
  'reduziu', 'otimizou', 'melhorou', 'entregou', 'coordenou', 'construiu',
  'projetou', 'definiu', 'executou', 'lançou', 'negociou', 'analisou',
  'monitorou', 'automatizou', 'integrou', 'migrou', 'refatorou', 'escalou',
  'treinou', 'mentorou', 'apresentou', 'colaborou', 'estabeleceu', 'alcançou',
  'superou', 'garantiu', 'acelerou', 'expandiu', 'transformou', 'reestruturou',
  'led', 'developed', 'implemented', 'created', 'managed', 'increased',
  'reduced', 'optimized', 'improved', 'delivered', 'coordinated', 'built',
  'designed', 'defined', 'executed', 'launched', 'negotiated', 'analyzed',
]

const METRIC_PATTERN = /\d+(%|x|\+|k|m|mil|milhão|milhões|reais|r\$|\$)/i
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LINKEDIN_PATTERN = /linkedin\.com\/in\//i

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function hasActionVerb(text: string): boolean {
  const lower = text.toLowerCase()
  return ACTION_VERBS.some(v => lower.startsWith(v) || lower.includes(` ${v} `))
}

function hasMetric(text: string): boolean {
  return METRIC_PATTERN.test(text)
}

function scoreCompleteness(data: ResumeData): ATSDimension {
  const tips: string[] = []
  let score = 0

  const { contact } = data
  const criticalFields = [
    contact.fullName, contact.title, contact.email,
    contact.phone, contact.linkedin, contact.city,
  ]
  const filledCritical = criticalFields.filter(Boolean).length
  score += Math.round((filledCritical / criticalFields.length) * 10)
  if (filledCritical < 6) tips.push('Preencha todos os campos de contato (nome, cargo, email, telefone, LinkedIn, cidade)')

  if (data.summary.trim().length > 0) score += 5
  else tips.push('Adicione um resumo profissional')

  const expScore = Math.min(data.experiences.length, 3) * 3
  score += expScore
  if (data.experiences.length === 0) tips.push('Adicione pelo menos uma experiência profissional')
  else if (data.experiences.length < 2) tips.push('Adicione mais experiências para demonstrar trajetória')

  if (data.education.length > 0) score += 5
  else tips.push('Adicione sua formação acadêmica')

  if (score > 30) score = 30
  return { name: 'Completude', score, maxScore: 30, tips }
}

function scoreATSFormat(data: ResumeData): ATSDimension {
  const tips: string[] = []
  let score = 0

  if (EMAIL_PATTERN.test(data.contact.email)) score += 5
  else tips.push('Use um email válido no formato correto')

  if (LINKEDIN_PATTERN.test(data.contact.linkedin)) score += 5
  else tips.push('Inclua a URL completa do LinkedIn (linkedin.com/in/...)')

  const sorted = [...data.experiences].sort((a, b) => {
    const yearA = parseInt(a.startYear) || 0
    const yearB = parseInt(b.startYear) || 0
    return yearB - yearA
  })

  if (sorted.length === 0) {
    tips.push('Adicione experiências profissionais para avaliação de consistência de datas')
  } else {
    let dateConsistency = true
    let hasGap = false

    for (let i = 0; i < sorted.length - 1; i++) {
      const curr = sorted[i]
      const next = sorted[i + 1]
      if (!curr.startYear || !next.endYear) { dateConsistency = false; break }
      const endYearNext = parseInt(next.endYear) || 0
      const startYearCurr = parseInt(curr.startYear) || 0
      if (startYearCurr - endYearNext > 1) hasGap = true
    }

    if (dateConsistency) score += 8
    else tips.push('Preencha datas de início e fim em todas as experiências')

    if (!hasGap) score += 7
    else tips.push('Gaps de mais de 6 meses podem ser questionados — explique no resumo')
  }

  if (score > 25) score = 25
  return { name: 'Formato ATS', score, maxScore: 25, tips }
}

function scoreContent(data: ResumeData): ATSDimension {
  const tips: string[] = []
  let score = 0

  const wordCount = countWords(data.summary)
  if (wordCount >= 50 && wordCount <= 80) score += 8
  else if (wordCount > 0) score += 4
  if (wordCount < 50) tips.push('Resumo profissional muito curto — ideal: 50–80 palavras')
  else if (wordCount > 80) tips.push('Resumo muito longo — corte para 50–80 palavras')

  const allBullets = data.experiences.flatMap(e => e.bullets)
  const bulletsWithVerb = allBullets.filter(b => hasActionVerb(b.text))
  const bulletsWithMetric = allBullets.filter(b => hasMetric(b.text) || hasMetric(b.metric || ''))

  if (allBullets.length > 0) {
    const verbRatio = bulletsWithVerb.length / allBullets.length
    score += Math.round(verbRatio * 10)
    if (verbRatio < 0.7) tips.push('Use verbos de ação no início dos bullets (ex: "Aumentou", "Desenvolveu", "Reduziu")')

    const metricRatio = bulletsWithMetric.length / allBullets.length
    score += Math.round(metricRatio * 7)
    if (metricRatio < 0.5) tips.push('Adicione métricas numéricas aos bullets (ex: "30%", "R$50k", "2x")')
  } else {
    tips.push('Adicione conquistas em bullet points nas experiências')
  }

  if (score > 25) score = 25
  return { name: 'Conteúdo', score, maxScore: 25, tips }
}

function scoreSkills(data: ResumeData): ATSDimension {
  const tips: string[] = []
  let score = 0

  const techSkills = data.skills.filter(s => s.category === 'technical' || s.category === 'tool')
  if (techSkills.length >= 5) score += 6
  else if (techSkills.length > 0) score += 3
  if (techSkills.length < 5) tips.push(`Adicione mais habilidades técnicas (${techSkills.length}/5 mínimo recomendado)`)

  if (data.languages.length > 0) score += 4
  else tips.push('Adicione pelo menos um idioma')

  if (score > 10) score = 10
  return { name: 'Habilidades', score, maxScore: 10, tips }
}

function scoreExtras(data: ResumeData): ATSDimension {
  const tips: string[] = []
  let score = 0

  if (data.certifications.length > 0) score += 4
  else tips.push('Certificações aumentam a credibilidade — adicione pelo menos uma')

  if (data.projects.length > 0) score += 3
  else tips.push('Projetos/portfolio demonstram habilidades práticas')

  if (data.contact.github) score += 3
  else tips.push('Adicione seu GitHub para mostrar projetos reais')

  if (score > 10) score = 10
  return { name: 'Extras', score, maxScore: 10, tips }
}

export function calculateATSScore(data: ResumeData): ATSScore {
  const dimensions = [
    scoreCompleteness(data),
    scoreATSFormat(data),
    scoreContent(data),
    scoreSkills(data),
    scoreExtras(data),
  ]
  const total = dimensions.reduce((sum, d) => sum + d.score, 0)
  return { total, dimensions }
}
