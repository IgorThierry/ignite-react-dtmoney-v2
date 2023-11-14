import { Card, Heading } from '@chakra-ui/react'

import { VictoryPie, VictoryLegend, VictoryTheme } from 'victory'

interface Props {
  data: {
    category: string
    total: number
    color: string
    percentage: number
  }[]
}

export function OutcomeByCategoryChart({ data }: Props) {
  return (
    <Card
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
      p="4"
      minW="300px"
      whiteSpace="nowrap"
    >
      <Heading size="lg">Gastos por categoria</Heading>
      <VictoryPie
        theme={VictoryTheme.material}
        data={data}
        x="category"
        y="percentage"
        colorScale={data.map((item) => item.color)}
        height={300}
        startAngle={90}
        endAngle={450}
        labelPlacement={'parallel'}
        labelRadius={100}
        labels={({ datum }) => `${datum.percentage}%`}
      />
      <VictoryLegend
        title="Categoria"
        centerTitle
        data={data.map(({ category, color }) => ({
          name: category,
          symbol: { fill: color },
        }))}
        orientation="horizontal"
        gutter={20}
        height={60}
      />
    </Card>
  )
}
