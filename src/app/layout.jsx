import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Calendar',
  description: 'Interview Task',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-center items-center h-screen`}>{children}</body>
    </html>
  )
}
