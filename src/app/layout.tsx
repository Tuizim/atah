import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Construtor de Currículo | ATS-Optimizado',
  description: 'Crie um currículo profissional com score ATS em tempo real',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt-BR' className={`${inter.variable} h-screen overflow-hidden antialiased`}>
      <body className='h-full overflow-hidden bg-slate-50'>{children}</body>
    </html>
  )
}
