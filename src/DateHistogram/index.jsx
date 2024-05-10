import { bin, scaleLinear, scaleTime, timeMonths, extent, max, sum } from "d3"
import { Marks } from "./Marks"

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}
export const DateHistogram = ({data, width, height}) => {

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xValue = d => d['Reported Date']
  const yValue = d => d['Total Dead and Missing']

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice() 

  const [start, stop] = xScale.domain()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      totalDeadAndMissing: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }))

  const yScale = scaleLinear()
  .domain([0, max(binnedData, d => d.totalDeadAndMissing)])
  .range([innerHeight, 0])
  .nice()

  console.log(binnedData)

  return (
    <svg>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Marks binnedData={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />
      </g>
    </svg>
  )
}