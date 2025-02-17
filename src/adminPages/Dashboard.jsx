import { useState } from "react";
import {Link} from 'react-router-dom';

const Dashboard = () => {
    const [sidenav, setSidenav] = useState(true);

    const handleMenu = () => {
        setSidenav((prev) => !prev);

    };

    return (
        <div className="font-poppins antialiased ">
            <div className="h-full flex flex-row">
                <button
                    onClick={handleMenu}
                    className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 md:hidden"
                >
                    <svg
                        className="w-5 h-5 fill-current"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                {sidenav && (
                    <div
                        className="bg-white h-screen shadow-xl px-3 w-[190px] overflow-x-hidden transition-transform duration-300 ease-in-out"
                    >
                        <div className="space-y-6 md:space-y-10 mt-10">
                            <h1 className="hidden md:block font-bold text-xl text-center">
                                Dashwind<span className="text-teal-600">.</span>
                            </h1>


                            <nav className="flex flex-col justify-between h-[600px]">
                                <div className="flex flex-col space-y-2">
                                    <Link
                                        to="/all"
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-400 hover:text-white rounded-md transition duration-150"
                                    >
                                        All Annouces
                                    </Link>
                                    <Link
                                        to="/add"
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-400 hover:text-white rounded-md transition duration-150"
                                    >
                                        Add Annouce
                                    </Link>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-400 hover:text-white rounded-md transition duration-150"
                                    >
                                        My Annouces
                                    </a>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-orange-400 hover:text-white rounded-md transition duration-150"
                                    >
                                        Log out
                                    </a>
                                </div>

                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
