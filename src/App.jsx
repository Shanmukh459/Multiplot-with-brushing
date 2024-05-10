import { useWorldAtlas } from "./useWorldAtlas"
import { useData } from "./useData"
import { BubbleMap } from "./BubbleMap"

const width = 960
const height = 500

function App() {
  const worldAtlas = useWorldAtlas()
  const data = useData()

  if (!worldAtlas && !data) {
    return <h1>Loading...</h1>
  }

  return (
    <svg height={height} width={width} >
        <BubbleMap data={data} worldAtlas={worldAtlas} />
    </svg>
  )
}

export default App
