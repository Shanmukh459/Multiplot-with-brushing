import React, { useState, useEffect } from "react";
import { feature, mesh } from "topojson";
import { json } from "d3";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useWorldAtlas = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then((topology) => {
      const { countries, land } = topology.objects;
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      });
    });
  }, []);
  return data;
};
