export const Marks = ({ binnedData, innerHeight, xScale, yScale }) => {
  return (
    binnedData.map((d,i) => (
      <rect 
        key={i}
        x={xScale(d.x0)}
        y={yScale(d.totalDeadAndMissing)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.totalDeadAndMissing)}
      />
    ))
  )
}