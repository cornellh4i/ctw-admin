import React from "react"
import { ComposableMap } from "react-simple-maps"

interface Props {
  bottom_left: Array<number>
  top_right: Array<number>
  clusters: Array<Array<number>>
}

const map = ({ bottom_left, top_right, clusters }: Props) => {
  return (<ComposableMap
    projection="geoEqualEarth"
    projectionConfig={{
      center: [(bottom_left[0] + top_right[0]) / 2, (bottom_left[1] + top_right[1])],
      scale: 1200,
    }}
  >
    ...
  </ComposableMap>)
}

export default map;
