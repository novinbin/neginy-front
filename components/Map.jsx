import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function Map() {
  const position = [51.505, -0.09];

  const clickFunction = () => {

  };

  return (
    <div>
      {/* <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
       clickFunction={clickFunction}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
}

export default Map;
