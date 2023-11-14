import { useContextSelector } from 'use-context-selector'
import { GlobalLoadingContext } from '../../contexts/GlobalLoading'

import { Flex, Spinner, Text } from '@chakra-ui/react'

export function GlobalLoading() {
  const { show, msg } = useContextSelector(GlobalLoadingContext, (context) => {
    return {
      show: context.show,
      msg: context.msg,
    }
  })

  if (!show) {
    return null
  }

  return (
    <Flex
      direction="column"
      pos="fixed"
      top="0"
      left="0"
      w="100%"
      h="100%"
      bg="rgba(255, 255, 255, 0.8)"
      justify="center"
      align="center"
      zIndex="9999"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      {msg && (
        <Text
          textTransform="capitalize"
          marginTop="16px"
          fontSize="1.5rem"
          fontWeight="bold"
          color="blue.500"
        >
          {msg}
        </Text>
      )}
    </Flex>
  )
}
