import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const MapChart = ({ bottomLeft, topRight, markers }) => {
  console.log(markers);
  return (
    <div style={{ flex: 1, margin: 20 }}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
      />
      <MapContainer
        center={[
          topRight[0] - bottomLeft[0] / 2,
          topRight[1] - bottomLeft[1] / 2,
        ]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker id={marker.id} position={marker.location}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapChart;
