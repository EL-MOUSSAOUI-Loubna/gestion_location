import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

function UpdateMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const MapAllAnn = () => {
  const annonces = useSelector(state => state.annonces);
  const user = useSelector(state => state.loggedInUser);

  const [position, setPosition] = useState([31.7917, -7.0926]); // Default: Morocco
  const [zoom, setZoom] = useState(8); 

  const fetchCityCoordinates = async (city) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setZoom(12);
      } else {
        alert('City not found!');
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
    }
  };

  useEffect(() => {
    if (user.city) {
      fetchCityCoordinates(user.city);
    }
  }, [user]);

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <UpdateMapView center={position} zoom={zoom} />
      {annonces.map(ann => (
        <Marker key={ann.id} position={[ann.lat, ann.lon]}>
          <Popup>
            <div>
              <h3>{ann.title}</h3>
              <p>{ann.description}</p>
              <Link to={`/details/${ann.id}`}>Details</Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapAllAnn; 