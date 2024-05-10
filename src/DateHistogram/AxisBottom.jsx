export const AxisBottom = ({ xScale, innerHeight, tickFormat}) => (
  xScale.ticks().map(tickValue => (
    <g className="ticks" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line y2={innerHeight} />
      <text
        y={innerHeight+3}
        textAnchor="middle"
        dy="0.71em"

      >{tickFormat(tickValue)}</text>
    </g>
  ))
)