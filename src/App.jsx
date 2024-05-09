import { useWorldAtlas } from "./useWorldAtlas"
import { Marks } from "./Marks"

const width = 960
const height = 500

function App() {
  const worldAtlas = useWorldAtlas()

  if (!worldAtlas) {
    return <h1>Loading...</h1>
  }

  console.log(worldAtlas)
  return (
    <svg height={height} width={width} >
      <Marks worldAtlas={worldAtlas} />
    </svg>
  )
}

export default App
