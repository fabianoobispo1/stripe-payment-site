
import  Donut from '@/components/donut';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Botão Estúpido',
  description: 'Pagina inicial'
};

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center   bg-black">
      <Donut color='#18d156'/>
     <p className='text-yellow-100'>VLW</p>
    </div>
  );
}
