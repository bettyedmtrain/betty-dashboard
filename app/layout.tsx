import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Betty Command Center ⭐',
  description: 'Personal command center for Betty',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
