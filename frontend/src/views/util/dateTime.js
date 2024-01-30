import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export default {
  GetDate({ dia, diaMod = 0, mes, mesMod = 0, ano, anoMod = 0 } = {}) {
    const newDate = new Date();

    const diaDate = (dia ?? newDate.getDate() + diaMod)
      .toString()
      .padStart(2, 0);
    const mesDate = (mes ?? newDate.getMonth() + 1 + mesMod)
      .toString()
      .padStart(2, 0);
    const anoDate = (ano ?? newDate.getFullYear() + anoMod)
      .toString()
      .padStart(2, 0);

    return [anoDate, mesDate, diaDate].join('/');
  },
  FormatDate(value) {
    const date = format(parseISO(value), 'dd/MM/yy HH:mm', { locale: pt });

    return date;
  },
  ValidaDatas(inicial, final) {
    const dataInicio = new Date(inicial);
    const dataFim = new Date(final);

    return dataInicio <= dataFim;
  },
  ValidaDDMMYYYY(data) {
    if (!data) return true;
    return /(((0[1-9]|[12][0-9]|3[01])([/])(0[13578]|10|12)([/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([/])(0[469]|11)([/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([/])(02)([/])(\d{4}))|((29)(\/)(02)([/])([02468][048]00))|((29)([/])(02)([/])([13579][26]00))|((29)([/])(02)([/])([0-9][0-9][0][48]))|((29)([/])(02)([/])([0-9][0-9][2468][048]))|((29)([/])(02)([/])([0-9][0-9][13579][26])))/.test(
      data
    );
  },
  ValidaLimiteDias(inicial, final, { limiteDias = 0 }) {
    const dataInicio = new Date(inicial);
    const dataFim = new Date(final);
    const diferencaTempo = dataFim.getTime() - dataInicio.getTime();
    const diferencaDias = diferencaTempo / (1000 * 3600 * 24);

    return diferencaDias <= limiteDias;
  }
};
