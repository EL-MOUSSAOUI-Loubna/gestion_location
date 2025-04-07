import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImageIcon from "../assets/image-icon.svg";
import MapAllAnn from "./MapAllAnn";

const AllAnnonces = () => {
  const annonces = useSelector((state) => state.annonces);
  const user = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();

  if (!annonces || annonces.length === 0) {
    return <p className="text-center text-gray-500 mt-5">No annonces available</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-green-700 font-bold text-center underline mb-5">
        Houses for Rent
      </h1>

      {user.type !== "admin" && (
        <div className="w-[70%] h-[50%] mb-5 mx-auto">
          <MapAllAnn />
        </div>
      )}

      <div className="grid gap-6 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {annonces.map((ann) => (
          <div
            key={ann.id}
            className="relative group bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={ann.photos?.[0] || ImageIcon}
              alt={ann.photos?.[0] ? `Image of ${ann.title}` : "No image available"}
              className="w-full h-40 object-cover bg-gray-200"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800">{ann.title}</h4>
              <p className="text-gray-500 text-sm">📍 {ann.city}</p>
              <p className="text-green-600 font-bold text-lg mt-2">{ann.price} DH / month</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => navigate(`/details/${ann.id}`)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 hover:scale-105 transition-transform"
                >
                  See Details
                </button>
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                  Available
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAnnonces;
