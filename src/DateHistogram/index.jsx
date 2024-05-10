import { bin, scaleLinear, scaleTime, timeMonths, extent, max, sum } from "d3"

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
    (binnedData.map(d => (
      <rect 
        x={xScale(d.x0)}
        y={yScale(d.totalDeadAndMissing)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.totalDeadAndMissing)}
      />
    )))
  )
}