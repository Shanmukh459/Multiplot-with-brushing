import { Marks } from "./Marks"
import { scaleSqrt, max } from "d3"

export const BubbleMap = ({data, worldAtlas}) => {
  const sizeValue= d => d['Total Dead and Missing']
  const maxRadius = 10

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius])

  return (
    <Marks data={data} worldAtlas={worldAtlas} sizeScale={sizeScale} sizeValue={sizeValue} />
  )
}