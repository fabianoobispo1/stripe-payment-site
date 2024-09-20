import ButtonStupid from '@/components/buttonStupid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botão Estúpido',
  description: 'Pagina inicial'
};

export default function HomePage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center ">
     <ButtonStupid />
    </div>
  );
}
