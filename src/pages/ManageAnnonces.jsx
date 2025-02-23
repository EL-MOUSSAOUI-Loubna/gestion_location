import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Reservations from "./Reservations";
import { Link, useNavigate } from 'react-router-dom';
import { acceptAnn, rejectAnn } from "../actions/actions";
import ImageIcon from '../assets/image-icon.svg';



const ManageAnnonces = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const annonces = useSelector((state) => state.annonces);
  //const user = useSelector(state=> state.loggedInUser)
  //const idUser = user.id;
  const [confRejectAnnOpen, setConfRejectAnnOpen] = useState(false);
  const [idAnnToRej, setIdAnnToRej] = useState();

  const handleConfirmRej = (e) => {
    setConfRejectAnnOpen(false);
    dispatch(rejectAnn(idAnnToRej))
    alert("the annonce you rejected has been deleted");
  }






  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className='text-2xl text-green-700 mb-4 font-bold text-center underline'>Manage my annonces</h1>
      <div className="flex flex-col md:flex-row gap-5 rounded-lg">
        {annonces && annonces.length > 0 ? (
          annonces.map((ann, index) => (
            <div key={index} className="relative group bg-white h-[350px] w-[260px] shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out">
              {ann.photos && ann.photos.length > 0 && ann.photos[0] ? (
                <img
                  src={ann.photos[0]}
                  alt={`Image ${index+1}`}
                  className="w-full h-[40%] object-cover"
                />) : (
                <img
                  src={ImageIcon}
                  alt="no image"
                  className="w-full h-[40%] opacity-60 bg-gray-500"
                />
              )}
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800">{ann.title}</h4>
                <p className="text-gray-500 text-sm">📍 {ann.city}</p>
                <p className="text-green-600 font-bold text-lg mt-2">{ann.price} DH / month</p>

                <div className="flex flex-row-md items-center mt-8 justify-between">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 hover:scale-105 transition-transform"
                    onClick={() => { navigate(`/details/${ann.id}`) }}>

                    See Details

                  </button>
                  <div className="flex justify-center gap-4">
                    <button
                      className="w-12 h-12 flex items-center justify-center border-2 border-green-600 hover:bg-green-600 rounded-full shadow"
                      onClick={() => { setConfRejectAnnOpen(true); setIdAnnToRej(ann.id) }}>
                      <svg className="w-6 h-6 text-green-600 hover:bg-green-600 bg-transparent hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                      </svg>
                    </button>

                    <button
                      className="w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-white hover:border-2 hover:border-red-600 rounded-full shadow"
                      onClick={() => { dispatch(acceptAnn(ann.id)); alert("Annonce accepted") }}>
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
      {confRejectAnnOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white h-[200px] rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 ">Are you sure ?</h2>
            <p className="text-gray-600 mt-4">This action will reject the annonce.</p>

            <div className="flex justify-end mt-8 gap-3">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
                onClick={() => setConfRejectAnnOpen(false)}
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
