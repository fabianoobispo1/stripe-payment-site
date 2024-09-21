import ButtonStupid from '@/components/buttonStupid';
import  Donut from '@/components/donut';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botão Estúpido',
  description: 'Pagina inicial de um botão estúpido',
  keywords:'botão, botao, estupido, Botao, 1 real, '
};

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center   bg-black">
      <Donut color='#FFFFFF'/>
     <ButtonStupid />
    </div>
  );
}
