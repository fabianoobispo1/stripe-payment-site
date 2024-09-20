import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botão Estúpido',
  description: 'Pagina inicial'
};

export default function HomePage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
     botao
    </div>
  );
}
