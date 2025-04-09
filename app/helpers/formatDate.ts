import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: Date) => {
  return `há ${formatDistanceToNow(date, { locale: ptBR })}`;
};
