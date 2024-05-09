import { geoNaturalEarth1, geoPath, json } from "d3"
import React, { useState, useEffect } from "react"
import { feature } from "topojson"

const width = 960
const height = 500

const projection = geoNaturalEarth1()
const path = geoPath(projection)
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const {countries} = topology.objects 
      setData(feature(topology, countries))
    })
  }, [])

  if (!data) {
    return <h1>Loading...</h1>
  }
  return (
    <svg height={height} width={width} >
      {data.features.map((feature, i) => (
        <path key={i} d={path(feature)} />
      ))}

    </svg>
  )
}

export default App
