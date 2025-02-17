import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ProductDetails = () => {
  const annonces = useSelector((state) => state.announces);
  const annonce = annonces[0];
  const [currentImage, setCurrentImage] = useState(0);
  const images = annonce.photos;
  const position = annonce.selectedPosition;

  const defaultPosition = [31.7917, -7.0926]; // Default: Morocco
  const zoom = 16;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto ">
      <div className="h-[90vh] flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-md">

        <div className="md:flex-1 p-6 bg-white rounded-l-lg">
          <div className="h-64 md:h-96 w-full rounded-md bg-neutral-500 flex items-center justify-center">
            <img
              src={images[currentImage]}
              alt={`Product ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>


          {images.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">Photos :</h3>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide w-full p-2 rounded-lg">
                {images.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-20 h-16 md:w-24 md:h-20 rounded-lg overflow-hidden shadow-sm border-2 transition-all duration-300 ease-in-out ${currentImage === index ? "border-orange-400" : "border-gray-300"
                      }`}
                  >
                    <img
                      src={photo}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg hover:opacity-75"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>


        <div className="md:flex-1 p-6 bg-gray-50 rounded-r-lg md:min-w-[57%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{annonce.title}</h2>
            <button className="h-12 px-6 font-semibold rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow">
              RESERVER
            </button>
          </div>


          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-gray-100 flex items-center py-2 px-4 rounded-lg shadow-sm">
              <span className="text-green-600 font-bold text-3xl">{annonce.price}</span>
              <span className="text-green-500 ml-1">DH / mois</span>
            </div>
          </div>


          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-h-[120px] overflow-y-auto">
            {annonce.description}
          </p>


          <div className="mt-6">
            <p className="text-gray-500 text-sm mb-2">  In &nbsp;<b className="underline">{annonce.city}</b></p>
            <div className="h-60 md:h-80 w-full rounded-lg overflow-hidden shadow-md">
              <MapContainer center={position || defaultPosition} zoom={zoom} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {position && (
                  <Marker position={position}>
                    <Popup>House Location</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
