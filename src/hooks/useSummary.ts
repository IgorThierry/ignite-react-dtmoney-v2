import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { getRandomColor } from '../utils/getRandomColor'
import { getMonthNameFromDateString } from '../utils/date'

interface SummaryProps {
  income: number
  outcome: number
  total: number
  outcomeCategories: {
    category: string
    total: number
    color: string
  }[]
  monthlyOutcomes: {
    month: string
    total: number
  }[]
}

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce<SummaryProps>(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price

          const category = transaction.category || 'Outras'
          const existingCategory = acc.outcomeCategories.find(
            (item) => item.category === category,
          )

          if (existingCategory) {
            existingCategory.total += transaction.price
          } else {
            acc.outcomeCategories.push({
              category,
              total: transaction.price,
              color: getRandomColor(),
            })
          }

          // Gasto por mês
          const createdAt = new Date(transaction.createdAt)
          const monthYear = `${createdAt.getFullYear()}-${
            createdAt.getMonth() + 1
          }`
          const monthName = getMonthNameFromDateString(monthYear)

          const existingMonth = acc.monthlyOutcomes.find(
            (item) => item.month === monthName,
          )

          if (existingMonth) {
            existingMonth.total += transaction.price
          } else {
            acc.monthlyOutcomes.push({
              month: monthName,
              total: transaction.price,
            })
          }
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
        outcomeCategories: [],
        monthlyOutcomes: [],
      },
    )
  }, [transactions])

  return summary
}
