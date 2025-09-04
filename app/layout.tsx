import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameLog - Seu diário de jogos',
  description: 'Acompanhe os jogos que você jogou e compartilhe suas experiências',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
      </body>
    </html>
  )
}