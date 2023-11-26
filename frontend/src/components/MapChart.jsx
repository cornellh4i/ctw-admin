import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const MapChart = ({ bottomLeft, topRight, markers }) => {
  const viewBox = `0 0 ${topRight[0] - bottomLeft[0]} ${topRight[1] - bottomLeft[1]}`;

  return (
    <svg width={800} height={400} viewBox={viewBox}>
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{
          scale: 100,
        }}
        fill={"grey"}
        width={topRight[0] - bottomLeft[0]}
        height={topRight[1] - bottomLeft[1]}
      >
        <ZoomableGroup center={[(bottomLeft[0] + topRight[0]) / 2, (bottomLeft[1] + topRight[1]) / 2]} zoom={0.55}
          minZoom={0.55}
          maxZoom={0.55}>
          <Geographies geography={"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {markers.map((marker, index) => (
            <Marker key={index} coordinates={marker}>
              <g fill="blue">
                <circle r="1" />
              </g>
              <text textAnchor="middle" fill="black" fontSize={5}>
                filler text
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </svg>
  );
};

export default MapChart;