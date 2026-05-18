'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

export function ExportButton() {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    setLoading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('resume-preview')
      if (!element) return

      await html2pdf()
        .set({
          margin: 0,
          filename: 'curriculo.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(element)
        .save()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type='button'
      onClick={handleExport}
      disabled={loading}
      className='flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 disabled:opacity-60 transition-all shadow-sm'
    >
      {loading ? <Loader2 size={16} className='animate-spin' /> : <Download size={16} />}
      {loading ? 'Gerando PDF...' : 'Exportar PDF'}
    </button>
  )
}
