import { NewTransactionModal } from '../NewTransactionModal'

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'

export function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box p="2.5rem 0rem 7.5rem" bg="cyan.400">
      <Flex
        w="100%"
        maxW="1120px"
        mx="auto"
        px="1.5rem"
        align="center"
        justify="flex-end"
      >
        <Button colorScheme="blue" size="lg" onClick={() => onOpen()}>
          Nova transação
        </Button>
        <NewTransactionModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Box>
  )
}
