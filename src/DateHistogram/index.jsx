import { bin, scaleLinear, scaleTime, timeMonths, extent, max, sum, timeFormat } from "d3"
import { Marks } from "./Marks"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"

const margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 80
}

const xAxisLabelOffset = 50
const yAxisLabelOffset = 45

const xAxisTickFormat = timeFormat('%m/%d/%Y')
export const DateHistogram = ({data, width, height}) => {

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const xValue = d => d['Reported Date']
  const xAxisLabel = 'Time'

  const yValue = d => d['Total Dead and Missing']
  const yAxisLabel = 'Total Dead and Missing'

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

  return (
    <svg>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset={5} />
        <text className="axis-label" y={innerHeight+xAxisLabelOffset} textAnchor="middle" x={innerWidth/2}>{xAxisLabel}</text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={3} />
        <text className="axis-label" transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`} textAnchor="middle">{yAxisLabel}</text>
        <Marks binnedData={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />
      </g>
    </svg>
  )
}