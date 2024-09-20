import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (dateString: string) => {
  if (dateString) {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  }else{
    return '-'
  }

};