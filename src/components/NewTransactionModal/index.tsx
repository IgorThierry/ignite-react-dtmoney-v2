import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'

import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data

    await createTransaction({
      description,
      price,
      category,
      type,
    })

    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent p="6" maxW="32rem">
        <ModalHeader>Nova Transação</ModalHeader>

        <IconButton
          aria-label="fechar modal"
          variant="transparent"
          position="absolute"
          top="1.5rem"
          right="1.5rem"
          onClick={onClose}
          icon={<X size={24} />}
        />

        <Flex
          as="form"
          onSubmit={handleSubmit(handleCreateNewTransaction)}
          mt="8"
          gap="4"
          direction="column"
        >
          <Input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <Input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <Input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap="4"
                  mt="2"
                >
                  <Button
                    leftIcon={<ArrowCircleUp size={24} />}
                    colorScheme="green"
                    size="lg"
                    variant={field.value === 'income' ? 'solid' : 'outline'}
                    onClick={() => field.onChange('income')}
                  >
                    Entrada
                  </Button>
                  <Button
                    leftIcon={<ArrowCircleDown size={24} />}
                    colorScheme="red"
                    size="lg"
                    variant={field.value === 'outcome' ? 'solid' : 'outline'}
                    onClick={() => field.onChange('outcome')}
                  >
                    Saída
                  </Button>
                </Box>
              )
            }}
          />

          <Button
            colorScheme="blue"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            Cadastrar
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
