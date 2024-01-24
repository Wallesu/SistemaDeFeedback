export const utilFundos = {
  FormatOptions(array) {
    var arrayFormatado = array.map(item => {
      return { value: item.value, text: `${item.value} - ${item.text}` };
    });
    return arrayFormatado;
  }
};
