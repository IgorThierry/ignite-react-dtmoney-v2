import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'

import {
  TransactionsContainer,
  TransactionsTable,
  PriceHighlight,
  HeaderTransactions,
  TransactionCardList,
  CardTransaction,
  DeleteButton,
} from './styles'
import { CalendarBlank, TagSimple, Trash } from 'phosphor-react'
import { DeleteTransactionModal } from '../../components/DeleteTransactionModal'

export function Transactions() {
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null)
  const { transactions, fetchTransactions, deleteTransaction } =
    useContextSelector(TransactionsContext, (context) => {
      return {
        transactions: context.transactions,
        fetchTransactions: context.fetchTransactions,
        deleteTransaction: context.deleteTransaction,
      }
    })

  async function handleDeleteTransaction() {
    if (!selectedTransactionId) return

    await deleteTransaction(selectedTransactionId)

    setSelectedTransactionId(null)
  }

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <>
      <Header />
      <Summary />

      <TransactionsContainer>
        <HeaderTransactions>
          <span>Transações</span>
          <span>
            {transactions.length > 1
              ? `${transactions.length} itens`
              : `${transactions.length} item`}
          </span>
        </HeaderTransactions>

        <SearchForm />

        <TransactionsTable>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                <td>
                  <DeleteButton
                    type="button"
                    onClick={() => setSelectedTransactionId(transaction.id)}
                  >
                    <Trash size={16} />
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>

        <TransactionCardList>
          {transactions.map((transaction) => (
            <CardTransaction key={transaction.id}>
              <header>
                <div>
                  <span>{transaction.description}</span>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </div>

                <DeleteButton
                  type="button"
                  onClick={() => setSelectedTransactionId(transaction.id)}
                >
                  <Trash size={16} />
                </DeleteButton>
              </header>
              <footer>
                <div>
                  <TagSimple size={16} />
                  {transaction.category}
                </div>
                <div>
                  <CalendarBlank size={16} />
                  {dateFormatter.format(new Date(transaction.createdAt))}
                </div>
              </footer>
            </CardTransaction>
          ))}
        </TransactionCardList>
      </TransactionsContainer>
      <DeleteTransactionModal
        isOpen={selectedTransactionId !== null}
        onConfirm={handleDeleteTransaction}
        onCancel={() => setSelectedTransactionId(null)}
      />
    </>
  )
}
