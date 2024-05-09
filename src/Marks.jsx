import { geoNaturalEarth1, geoPath } from "d3"

const projection = geoNaturalEarth1()
const path = geoPath(projection)

export const Marks = ({ worldAtlas: {countries, interiors} }) => {
  return (
    <g className="marks">
      <path className="sphere" d={path({type: 'Sphere'})} />
      {countries.features.map((feature, i) => (
          <path className="countries" key={i} d={path(feature)} />
      ))}
      <path className="interiors" d={path(interiors)} />
    </g>
  )
}