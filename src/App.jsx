import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { BubbleMap } from "./BubbleMap";
import { DateHistogram } from "./DateHistogram";
import { useState } from "react";

const width = 960;
const height = 500;

const dateHistogramHeight = 0.2;
const xValue = (d) => d["Reported Date"];

function App() {
  const worldAtlas = useWorldAtlas();
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();

  if (!worldAtlas && !data) {
    return <h1>Loading...</h1>;
  }

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <svg height={height} width={width}>
      <BubbleMap
        data={data}
        filteredData={filteredData}
        worldAtlas={worldAtlas}
      />
      <g transform={`translate(0, ${height - height * dateHistogramHeight})`}>
        <DateHistogram
          data={data}
          width={width}
          height={height * dateHistogramHeight}
          setBrushExtent={setBrushExtent}
          xValue={xValue}
        />
      </g>
    </svg>
  );
}

export default App;
