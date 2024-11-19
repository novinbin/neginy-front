import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onPositionSelect }) {
  const [position, setPosition] = useState(null);



  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      onPositionSelect({ lat, lng });
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>
        موقعیت جغرافیایی شما {position.lat}, {position.lng}
      </Popup>
    </Marker>
  );
}

function MapComponent({ onPositionSelect }) {
  return (
    <MapContainer
      className="map"
      center={[30.281326943216825, 57.08341270817505]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onPositionSelect={onPositionSelect} />
    </MapContainer>
  );
}

export default MapComponent;
