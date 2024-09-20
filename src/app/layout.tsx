import type { Metadata } from 'next';
import './globals.css';


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

          {children}
         
      </body>
    </html>
  );
}
