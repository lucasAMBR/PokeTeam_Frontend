// src/app/layout.tsx
import { ThemeProvider } from '@/context/theme-context'
import './globals.css'
import { ReactQueryProvider } from '@/providers/react-query'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeSwitch } from '@/components/ui/theme-switch'
import { ThemeButton } from '@/components/ui/theme-button'
import { AuthProvider } from '@/context/user-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokémon Teams',
  description: 'Gerencie seus times de Pokémon!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            <ThemeButton />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
