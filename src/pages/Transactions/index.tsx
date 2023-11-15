import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { SearchForm } from './components/SearchForm'

import { DeleteTransactionModal } from '../../components/DeleteTransactionModal'
import { Box, Button, Card, Flex, useDisclosure } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import { NewTransactionModal } from '../../components/NewTransactionModal'
import { TransactionsTable } from './components/TransactionsTable'

type TransactionId = number | null

export function Transactions() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedTransactionId, setSelectedTransactionId] =
    useState<TransactionId>(null)

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
          <TransactionsTable
            transactions={transactions}
            onDeleteTransaction={(id) => setSelectedTransactionId(id)}
          />
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
