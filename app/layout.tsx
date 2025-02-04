import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "./globals.css";
import localFont from 'next/font/local'

const atomicMd = localFont({ 
  src: '../public/fonts/aAtomicMd.ttf',
  variable: '--font-atomic-md',
})

export const metadata: Metadata = {
  title: "maas",
  description: "M&A as a Service",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${atomicMd.variable}`}>
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
