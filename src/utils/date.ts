export function getMonthNameFromDateString(dateString: string) {
  const date = new Date(dateString + '-01')

  const monthName = date.toLocaleString('pt-BR', { month: 'long' })

  return monthName
}
