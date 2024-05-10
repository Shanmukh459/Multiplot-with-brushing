import { bin, scaleLinear, scaleTime, timeMonths, extent, max, sum, timeFormat, brushX, select } from "d3"
import { Marks } from "./Marks"
import { AxisBottom } from "./AxisBottom"
import { AxisLeft } from "./AxisLeft"
import { useEffect } from "react"
import { useRef } from "react"

const margin = {
  top: 10,
  right: 25,
  bottom: 15,
  left: 40
}

const xAxisLabelOffset = 50
const yAxisLabelOffset = 25

const xAxisTickFormat = timeFormat('%m/%d/%Y')

export const DateHistogram = ({data, width, height, setBrushExtent, xValue}) => {
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

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
  
  const brushRef = useRef()
  useEffect(() => {
    const brush = brushX().extent([[0, 0], [innerWidth, innerHeight]])
    brush(select(brushRef.current))
    brush.on("brush", (event) => {
      setBrushExtent(event.selection.map(xScale.invert))
    })
  }, [innerHeight, innerWidth])

  return (
    <svg width={width} height={height}>
      <rect  width={width} height={height} fill='white'/>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat} tickOffset={5} />
        <text className="axis-label" y={innerHeight+xAxisLabelOffset} textAnchor="middle" x={innerWidth/2}>{xAxisLabel}</text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={3} />
        <text className="axis-label" transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`} textAnchor="middle">{yAxisLabel}</text>
        <Marks binnedData={binnedData} xScale={xScale} yScale={yScale} innerHeight={innerHeight} />
        <g ref={brushRef}></g>
      </g>
    </svg>
  )
}