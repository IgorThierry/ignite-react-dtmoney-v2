import { ReactNode, useCallback, useState } from 'react'
import { createContext, useContextSelector } from 'use-context-selector'
import { api } from '../lib/axios'
import { GlobalLoadingContext } from './GlobalLoading'
import { toast } from 'react-toastify'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const showLoading = useContextSelector(
    GlobalLoadingContext,
    (c) => c.showLoading,
  )

  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/api/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = async (data: CreateTransactionInput) => {
    const { description, price, category, type } = data

    showLoading({ show: true })

    const response = await api.post('/api/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    toast('Transação criada com sucesso!', {
      type: 'success',
    })

    setTransactions((state) => [response.data, ...state])

    showLoading({ show: false })
  }

  const deleteTransaction = async (id: number) => {
    showLoading({ show: true })

    await api.delete(`/api/transactions/${id}`)

    toast('Transação deletada com sucesso!', {
      type: 'success',
    })

    setTransactions((state) =>
      state.filter((transaction) => transaction.id !== id),
    )

    showLoading({ show: false })
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
