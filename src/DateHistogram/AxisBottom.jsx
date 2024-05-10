export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset=3}) => (
  xScale.ticks().map(tickValue => (
    <g className="ticks" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line y2={innerHeight} />
      <text
        y={innerHeight+tickOffset}
        textAnchor="middle"
        dy="0.71em"

      >{tickFormat(tickValue)}</text>
    </g>
  ))
)