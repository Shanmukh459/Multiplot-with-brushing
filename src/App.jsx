import { useWorldAtlas } from "./useWorldAtlas"
import { useData } from "./useData"
import { BubbleMap } from "./BubbleMap"
import { DateHistogram } from "./DateHistogram"

const width = 960
const height = 500

const dateHistogramHeight = 0.2

function App() {
  const worldAtlas = useWorldAtlas()
  const data = useData()
  
  if (!worldAtlas && !data) {
    return <h1>Loading...</h1>
  }

  return (
    <svg height={height} width={width} >
        <BubbleMap data={data} worldAtlas={worldAtlas} />
        <g transform={`translate(0, ${height - height*dateHistogramHeight})`}>
          <DateHistogram data={data} width={width} height={height*dateHistogramHeight}/>
        </g>
    </svg>
  )
}

export default App
