import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Botão Estúpido',
  description: 'Botão Estúpido'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={'font-inter overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <Analytics/>
          <Toaster />
          {children}
 
      </body>
    </html>
  );
}
