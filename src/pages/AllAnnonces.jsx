import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ImageIcon from '../assets/image-icon.svg';


const AllAnnonces = () => {
    const annonces = useSelector(state => state.annonces);
    const user = useSelector(state => state.loggedInUser);
    const navigate = useNavigate();
    //const userId = useParams();
    //console.log(loadState().announces);

    if (!annonces || annonces.length === 0) {
        return <p>No annonces available</p>;
    }


    return (
        <div>
            <h1 className='text-2xl text-green-700 font-bold text-center underline'>Houses for rent</h1>
            <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {annonces?.length > 0 ? (
                    annonces.map((ann, index) => (
                        <div key={index} className="relative group bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out">
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
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        onClick={() => navigate(`/details/${index}`)}
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 hover:scale-105 transition-transform">
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
export default AllAnnonces;