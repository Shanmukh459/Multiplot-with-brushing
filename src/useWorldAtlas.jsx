import React, { useState, useEffect } from "react"
import { feature } from "topojson"
import { json } from "d3"

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

export const useWorldAtlas = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const {countries} = topology.objects 
      setData(feature(topology, countries))
    })
  }, [])
  return data
}