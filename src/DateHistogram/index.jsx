import { bin, scaleLinear, scaleTime, timeMonths, extent, max, sum, timeFormat } from "d3"
import { Marks } from "./Marks"

const margin = {
  top: 20,
  right: 40,
  bottom: 20,
  left: 40
}

const xAxisTickFormat = timeFormat('%m/%d/%Y')
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

  return (
    <svg>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map(tickValue => (
          <g className="ticks" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
            <line y2={innerHeight} />
            <text
              y={innerHeight+3}
              textAnchor="middle"
              dy="0.71em"

            >{xAxisTickFormat(tickValue)}</text>
          </g>
        ))}
        {yScale.ticks().map(tickValue => (
          <g className="ticks" transform={`translate(0, ${yScale(tickValue)})`}>
            <line x2={innerWidth} />
            <text
              textAnchor="end"
              dy="0.32em"
              x={-3}
            >
              {tickValue}
            </text>
          </g>
        ))}
        <Marks binnedData={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />
      </g>
    </svg>
  )
}