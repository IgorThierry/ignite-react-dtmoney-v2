import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'

import {
  TransactionsContainer,
  PriceHighlight,
  HeaderTransactions,
  TransactionCardList,
  CardTransaction,
  DeleteButton,
} from './styles'
import { CalendarBlank, TagSimple, Trash } from 'phosphor-react'
import { DeleteTransactionModal } from '../../components/DeleteTransactionModal'
import {
  Card,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'

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
      <Navbar />
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

        <Card mt="6">
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Descrição</Th>
                  <Th>Categoria</Th>
                  <Th>Data</Th>
                  <Th isNumeric>Valor</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>{transaction.description}</Td>

                    <Td>{transaction.category}</Td>
                    <Td>
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </Td>
                    <Td
                      isNumeric
                      color={transaction.type === 'income' ? 'green' : 'red'}
                    >
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </Td>
                    <Td isNumeric>
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        icon={<Trash />}
                        aria-label="Deletar transação"
                        onClick={() => setSelectedTransactionId(transaction.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>

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
