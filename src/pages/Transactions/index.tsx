import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { useEffect } from 'react'

export function Transactions() {
  const { transactions, fetchTransactions } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactions: context.transactions,
        fetchTransactions: context.fetchTransactions,
      }
    },
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <>
      <div>
        <Header />
        <Summary />

        <TransactionsContainer>
          <SearchForm />

          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionsTable>
        </TransactionsContainer>
      </div>
    </>
  )
}
