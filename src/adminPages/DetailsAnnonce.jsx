import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Reservations from "./Reservations";

const ProductDetails = () => {
  const annonces = useSelector((state) => state.announces);
  const annonce = annonces[0];
  const [currentImage, setCurrentImage] = useState(0);
  const images = annonce.photos;
  const position = annonce.selectedPosition;

  const user = 'loubna';

  const defaultPosition = [31.7917, -7.0926]; // Default: Morocco
  const zoom = 16;

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const [unavailableOpen, setUnavailableOpen] = useState(false);
  //const closeUnavailable = () => setUnavailableOpen(false);
    //const [unavailableOpen, setIsConfirmOpen] = useState(false);
  
    const handleConfirmUn = () => {
      alert("Item marked as unavailable!");
      setUnavailableOpen(false);
      // Add your logic here (API call, Redux update, etc.)
    };

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

          {
            user == 'loubna' ? <div className="mt-10">
              <button className="h-12 px-6 mr-4 font-semibold rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow">
                MODIFIER
              </button>
              <button className="h-12 px-6 font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow" onClick={() => setIsOpen(true)}>
                Voir Reservations
              </button> 
            </div> : <button className="h-12 px-6 mt-10 font-semibold rounded-lg bg-orange-600 hover:bg-orange-500 text-white shadow">
                RESERVER
              </button>
          }
        </div>


        <div className="md:flex-1 p-6 bg-gray-50 rounded-r-lg md:min-w-[57%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{annonce.title}</h2>
            {
              user == 'loubna' && <button 
              className="h-12 px-3 font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white shadow"
              onClick={() => setUnavailableOpen(true)} >
                mark as unavailable
              </button>
            }

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
              <MapContainer center={position || defaultPosition} zoom={zoom} style={{ height: "100%", width: "100%",  zIndex: 0 }}>
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
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
          <Reservations setIsOpen={setIsOpen} closeModal={closeModal} />
          </div>
        )}

{ unavailableOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white h-[200px] rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 ">Are you sure?</h2>
            <p className="text-gray-600 mt-4">This action will mark the item as unavailable.</p>
            
            <div className="flex justify-end mt-8 gap-3">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
                onClick={() => setUnavailableOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
                onClick={handleConfirmUn}
              >
                Yes, Mark Unavailable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
