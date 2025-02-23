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














{/*===============================================================================================================================*/}

{/* 

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

const TestMap = ({city}) => {
  const cityPos = useSelector(state => state.position);
  
  // Store position and zoom in state
  const [position, setPosition] = useState([cityPos[0], cityPos[1]]);
  const [marker, setMarker] = useState(null);
  const [zoom, setZoom] = useState(10); // Default zoom level

  console.log("Current Position:", position);
  console.log("City from Redux:", cityPos);

  function LocationMarker() {
    const map = useMap();

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);  // Update position
        setMarker([lat, lng]);    // Place marker
        setZoom(20);              // Zoom in on selected location
        map.setView([lat, lng], 20); // Apply zoom change to map
      },
    });

    return marker ? (
      <Marker position={marker}>
        <Popup>Selected location: {marker[0]}, {marker[1]}</Popup>
      </Marker>
    ) : null;
  }

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default TestMap;
*/}





{/*import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const TestMap = () => {
  // Default coordinates (Morocco)
  const [position, setPosition] = useState([31.7917, -7.0926]);
  const [address, setAddress] = useState('');
  const [marker, setMarker] = useState(null);

  // Function to geocode the address
  const geocodeAddress = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setMarker([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert('Address not found!');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  };

  return (
    <div>
      {/* Address Input 
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={geocodeAddress} style={{ padding: '10px' }}>
          Search
        </button>
      </div>

      {/* Map 
      <MapContainer center={position} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Marker for the searched location 
        {marker && (
          <Marker position={marker}>
            <Popup>
              Your searched location. <br /> Coordinates: {marker[0]}, {marker[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default TestMap;*/}