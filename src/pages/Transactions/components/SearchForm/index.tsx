import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'
import { Button, Flex, Input } from '@chakra-ui/react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <Flex as="form" gap="4" onSubmit={handleSubmit(handleSearchTransactions)}>
      <Input
        size="lg"
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <Button
        leftIcon={<MagnifyingGlass />}
        colorScheme="blue"
        size="lg"
        isLoading={isSubmitting}
        display={{ base: 'none', md: 'block' }}
        onClick={handleSubmit(handleSearchTransactions)}
      >
        Buscar
      </Button>
    </Flex>
  )
}
