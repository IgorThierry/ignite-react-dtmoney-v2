import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Trash } from 'phosphor-react'
import { Transaction } from '../../../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../../../utils/formatter'

interface TransactionsTableProps {
  onDeleteTransaction: (id: number) => void
  transactions: Transaction[]
}

export function TransactionsTable({
  onDeleteTransaction,
  transactions,
}: TransactionsTableProps) {
  return (
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
              <Td>{dateFormatter.format(new Date(transaction.createdAt))}</Td>
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
                  onClick={() => onDeleteTransaction(transaction.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
