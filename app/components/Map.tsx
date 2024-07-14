"use client";
import React, { useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple } from "leaflet"; // Import LatLngTuple for type safety

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for marker icon URLs
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapProps {
  center?: LatLngTuple; // Use LatLngTuple for proper type
}

const Map: React.FC<MapProps> = ({ center }) => {

  return (
    <MapContainer
      center={center || ([51, -0.09] as LatLngTuple)} // Provide a default LatLngTuple if center is undefined
      zoom={35} // Adjusted zoom level for initial view
      scrollWheelZoom={false}
      style={{ height: "35vh", borderRadius: "8px" }} // Applied style directly
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center} />}
    </MapContainer>
  );
};

export default Map;
