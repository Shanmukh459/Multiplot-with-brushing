import { geoGraticule, geoNaturalEarth1, geoPath } from "d3";
import { useMemo } from "react";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticules = geoGraticule();

export const Marks = ({
  worldAtlas: { land, interiors },
  data,
  sizeScale,
  sizeValue,
}) => {
  return (
    <g className="marks">
      {useMemo(
        () => (
          <>
            <path className="sphere" d={path({ type: "Sphere" })} />
            <path className="graticules" d={path(graticules())} />
            {land.features.map((feature, i) => (
              <path className="land" key={i} d={path(feature)} />
            ))}
            <path className="interiors" d={path(interiors)} />
          </>
        ),
        [path, land, graticules, interiors]
      )}
      {data.map((d, i) => {
        const [x, y] = projection(d.coords);
        return <circle key={i} cx={x} cy={y} r={sizeScale(sizeValue(d))} />;
      })}
    </g>
  );
};
