import ButtonStupid from '@/components/buttonStupid';
import Donut from '@/components/donut';
import TotalVendas from '@/components/totalVendas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botão Estúpido',
  description: 'Pagina inicial de um botão estúpido',
  keywords: 'botão, botao, estupido, Botao, 1 real, '
};

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center   bg-black">
      <div className="absolute right-0 top-0 p-4">
        <TotalVendas />
      </div>
      <Donut color="#FFFFFF" />
      <ButtonStupid />
    </div>
  );
}
