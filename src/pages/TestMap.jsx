import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TestMap = ({ cityName, setSelectedPosition }) => {
  const [position, setPosition] = useState([31.7917, -7.0926]); // Default: Morocco
  const [marker, setMarker] = useState(null);
  const [zoom, setZoom] = useState(6); // Default zoom

  const fetchCityCoordinates = async (city) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setMarker([parseFloat(lat), parseFloat(lon)]);
        setZoom(10); 
      } else {
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
    }
  };

  useEffect(() => {
    if (cityName) {
      fetchCityCoordinates(cityName);
    }
  }, [cityName]);

  function LocationMarker() {
    const map = useMap();

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setMarker([lat, lng]);
        setZoom(20); 
        map.setView([lat, lng], 20);
        setSelectedPosition([lat, lng]); 
      },
    });

    return marker ? (
      <Marker position={marker}>
        <Popup>Selected location: {marker[0]}, {marker[1]}</Popup>
      </Marker>
    ) : null;
  }

  function UpdateMapView() {
    const map = useMap();
    useEffect(() => {
      map.setView(position, zoom);
    }, [position, zoom, map]);
    return null;
  }

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <UpdateMapView />
      <LocationMarker />
    </MapContainer>
  );
};

export default TestMap;