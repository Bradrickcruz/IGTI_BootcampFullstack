const numFormatter = Intl.NumberFormat('pt-BR');
function formatNumber(value) {
  return numFormatter.format(value);
}

export { formatNumber };
