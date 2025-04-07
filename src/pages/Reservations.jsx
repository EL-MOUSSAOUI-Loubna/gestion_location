import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptRes, rejectRes } from "../actions/actions";

const Reservations = ({ closeModal }) => {
  //const [isOpen, setIsOpen] = useState(false);
  //const closeModal = () => setIsOpen(false);


  const dispatch = useDispatch();
  const penReservations = useSelector(state => state.pendingRes || []);

  const handleAccept = (idRes, idAnn, idUser) => {
    const resDone = {idRes, idAnn, idUser};
    dispatch(acceptRes(resDone))
    console.log(resDone);
    
    alert(`Reservation accepted!`);
  };

  const handleReject = (id) => {
    dispatch(rejectRes(id))
    alert(`Reservation rejected!`);
  };

  return (




    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 px-6 py-8 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700 underline">
          Reservations
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 text-2xl mr-2"
        >
          X
        </button>
      </div>

      <div className="mt-6">
        {penReservations.length > 0 ? (
          <ul className="space-y-4">
            {penReservations.map((reservation) => (
              <li
                key={reservation.id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {reservation.firstName} {reservation.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {reservation.city}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAccept(reservation.id, reservation.idAnn, reservation.idUser)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(reservation.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-5">
            No reservations available
          </p>
        )}
      </div>

    </div>


  )
};

export default Reservations;