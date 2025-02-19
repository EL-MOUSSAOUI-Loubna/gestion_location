import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Reservations from "./Reservations";
import {Link, useNavigate} from 'react-router-dom';



const ManageAnnonces = () => {
  const navigate = useNavigate();
  const announces = useSelector((state) => state.announces);
  const [refuseAnnOpen, setRefuseAnnOpen] = useState(false);

  const handleConfirmRej = (e) => {
    alert("the annonce you rejected is has been deleted");
    setRefuseAnnOpen(false);
  }

  const navigateToDetails =()=> {
    navigate('/details')
  }


  return (
    <div className="py-8 px-4 max-w-7xl mx-auto ">
      <div className="h-[90vh] flex flex-col md:flex-row gap-5 bg-gray-100 rounded-lg shadow-md">
        {announces?.length > 0 ? (
          announces.map((ann, index) => (
            <div key={index} className="relative group bg-white h-[350px] w-[260px] shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out">
              <img key={index} src={ann.photos[0]} alt={`Image ${index}`} className="w-full h-[40%] object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800">{ann.title}</h4>
                <p className="text-gray-500 text-sm">📍 {ann.city}</p>
                <p className="text-green-600 font-bold text-lg mt-2">{ann.price} DH / month</p>

                <div className="flex flex-row-md items-center mt-8 justify-between">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 hover:scale-105 transition-transform"
                  onClick={navigateToDetails}>
                    
                      See Details
                    
                  </button>
                  <div className="flex justify-center gap-4">
                    <button
                      className="w-12 h-12 flex items-center justify-center border-2 border-green-600 hover:bg-green-600 rounded-full shadow"
                      onClick={() => setRefuseAnnOpen(true)}>
                      <svg className="w-6 h-6 text-green-600 hover:bg-green-600 bg-transparent hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                      </svg>
                    </button>

                    <button
                      className="w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-white hover:border-2 hover:border-red-600 rounded-full shadow">
                      <svg className="w-6 h-6 text-white hover:text-red-600 hover:bg-transparent" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">No listings available</p>
        )}


      </div>
      {refuseAnnOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white h-[200px] rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 ">Are you sure ?</h2>
            <p className="text-gray-600 mt-4">This action will reject the annonce.</p>

            <div className="flex justify-end mt-8 gap-3">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
                onClick={() => setRefuseAnnOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
                onClick={handleConfirmRej}
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAnnonces;
