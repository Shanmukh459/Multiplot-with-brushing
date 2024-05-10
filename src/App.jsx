import { useWorldAtlas } from "./useWorldAtlas"
import { Marks } from "./Marks"
import { useData } from "./useData"
import { scaleSqrt, max } from "d3"

const width = 960
const height = 500

function App() {
  const worldAtlas = useWorldAtlas()
  const data = useData()

  if (!worldAtlas && !data) {
    return <h1>Loading...</h1>
  }

  const sizeValue= d => d['Total Dead and Missing']
  const maxRadius = 10

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius])

  console.log(data)
  return (
    <svg height={height} width={width} >
      <Marks data={data} worldAtlas={worldAtlas} sizeScale={sizeScale} sizeValue={sizeValue} />
    </svg>
  )
}

export default App
