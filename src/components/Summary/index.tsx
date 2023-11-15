import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'

import { Box, Card, Flex, Grid, Text } from '@chakra-ui/react'

import { OutcomeByCategoryChart } from './components/OutcomeByCategoryChart'
import { OutcomeByMonthChart } from './components/OutcomeByMonthChart'

export function Summary() {
  const summary = useSummary()

  const { outcomeCategories, monthlyOutcomes } = summary

  const totalCategories = outcomeCategories.map((item) => {
    const percentage = Number(((item.total / summary.outcome) * 100).toFixed(0))

    return {
      ...item,
      percentage,
    }
  })

  return (
    <Box w="100%" maxW="1120px" m="0 auto" py="4" gap="8">
      <Grid templateColumns="repeat(3, 1fr)" gap="8" overflow="auto">
        <Card whiteSpace="nowrap" bg="green" p="8" color="gray.50" minW="auto">
          <Flex alignItems="center" justifyContent="space-between">
            <span>Entradas</span>
            <ArrowCircleUp size={32} />
          </Flex>

          <Text as="strong" display="block" mt="4" fontSize="2rem">
            {priceFormatter.format(summary.income)}
          </Text>
        </Card>

        <Card
          whiteSpace="nowrap"
          bg="red.600"
          p="8"
          color="gray.50"
          minW="auto"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <span>Saídas</span>
            <ArrowCircleDown size={32} />
          </Flex>

          <Text as="strong" display="block" mt="4" fontSize="2rem">
            {priceFormatter.format(summary.outcome)}
          </Text>
        </Card>

        <Card
          whiteSpace="nowrap"
          bg="blue.600"
          p="8"
          color="gray.50"
          minW="auto"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <span>Total</span>
            <CurrencyDollar size={32} />
          </Flex>

          <Text as="strong" display="block" mt="4" fontSize="2rem">
            {priceFormatter.format(summary.total)}
          </Text>
        </Card>
      </Grid>
      <Grid
        mt="4"
        templateColumns="repeat(2, 1fr)"
        gap="8"
        overflow="auto"
        py="2"
      >
        <OutcomeByCategoryChart data={totalCategories} />
        <OutcomeByMonthChart monthlyOutcomes={monthlyOutcomes} />
      </Grid>
    </Box>
  )
}
