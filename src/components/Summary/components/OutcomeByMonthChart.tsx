import { Card, Heading } from '@chakra-ui/react'
import { VictoryBar, VictoryTheme, VictoryChart } from 'victory'
import { priceFormatter } from '../../../utils/formatter'

interface Props {
  monthlyOutcomes: {
    month: string
    total: number
  }[]
}

export function OutcomeByMonthChart({ monthlyOutcomes }: Props) {
  return (
    <Card
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
      p="4"
    >
      <Heading size="lg">Gastos por mês</Heading>
      <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 15 }}>
        <VictoryBar
          data={monthlyOutcomes}
          x="month"
          y="total"
          height={300}
          labels={({ datum }) => priceFormatter.format(datum.total)}
          barWidth={20}
        />
      </VictoryChart>
    </Card>
  )
}
