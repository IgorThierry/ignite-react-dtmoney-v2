import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'

import { Trash } from 'phosphor-react'
import { DeleteTransactionModal } from '../../components/DeleteTransactionModal'
import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import { NewTransactionModal } from '../../components/NewTransactionModal'

export function Transactions() {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      <Box as="main" w="100%" maxW="1120px" m="1rem auto 0" p="0 1.5rem 2rem">
        <Summary />

        <Flex my="4" justifyContent="flex-end">
          <Button colorScheme="green" size="lg" onClick={() => onOpen()}>
            Nova transação
          </Button>
        </Flex>

        <SearchForm />

        <Card mt="6">
          <TableContainer maxH="500px" overflowY="scroll">
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
      </Box>
      <DeleteTransactionModal
        isOpen={selectedTransactionId !== null}
        onConfirm={handleDeleteTransaction}
        onCancel={() => setSelectedTransactionId(null)}
      />
      <NewTransactionModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
