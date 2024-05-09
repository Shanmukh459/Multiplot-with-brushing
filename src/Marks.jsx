import { geoNaturalEarth1, geoPath } from "d3"

const projection = geoNaturalEarth1()
const path = geoPath(projection)

export const Marks = ({ worldAtlas }) => {
  return (
    <g className="marks">
      {worldAtlas.features.map((feature, i) => (
          <path key={i} d={path(feature)} />
        ))}
    </g>
  )
}