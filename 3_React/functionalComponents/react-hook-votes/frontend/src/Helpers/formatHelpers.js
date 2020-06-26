const numFormatter = Intl.NumberFormat('pt-BR');
function formatNumber(value) {
  return numFormatter.format(value);
}

function formatPercentage(value) {
  if (value) {
    const stringValue = value.toFixed(2);
    return stringValue.replace('.', ',') + '%';
  }
  return '0%';
}

export { formatNumber, formatPercentage };
