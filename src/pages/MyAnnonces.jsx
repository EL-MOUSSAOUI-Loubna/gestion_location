import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageIcon from'../assets/image-icon.svg';
import { useState } from "react";

const MyAnnonces = () => {
    const annonces = useSelector(state => state.annonces);
    const user = useSelector(state => state.loggedInUser);
    const navigate = useNavigate();

    const userAnnonces = annonces.filter(annonce => user.idAnn.includes(parseInt(annonce.id)));

    return (
        <div>
            <h1 className='text-2xl text-green-700 mb-4 font-bold text-center underline'>Mes annonces</h1>
            <div className="h-[90vh] flex flex-col md:flex-row gap-5 rounded-lg">
                {userAnnonces && userAnnonces.length > 0 ? (
                    userAnnonces.map((ann, index) => (
                        <div key={index} className="relative group bg-white h-[330px] w-[260px] shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out">
                            {ann.photos && ann.photos.length > 0 && ann.photos[0] ? (
                                <img
                                    src={ann.photos[0]}
                                    alt={`Image ${index}`}
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
                                    onClick={() => { (`/details/${ann.id}`) }}>
                                        See Details
                                    </button>
                                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                                        Available
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-5">No listings available</p>
                )}

            </div>
        </div>
    )
}
export default MyAnnonces;