import { useSelector } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import AddRent from "./AddRent";
import Dashboard from "./Dashboard";
import AllAnnonces from "./AllAnnonces";
import ProductDetails from "./DetailsAnnonce";
import ManageAnnonces from "./ManageAnnonces";
import Statistics from "./HomeAdmin";
import MyAnnonces from "./MyAnnonces";


const Home = () => {
    //const announces = useSelector(state => state.announces);

    return (
        <div className="flex">
            <Dashboard />
            <div className="bg-gray-100 w-full flex justify-center items-center">
                <div className="bg-white w-full md:w-1/2 lg:w-[96%] px-10 pt-10 h-[100vh]  rounded-lg">
                    <Routes>
                        <Route path="/all" element={<AllAnnonces />} />
                        <Route path="/add" element={<AddRent />} />
                        <Route path="/details" element={<ProductDetails />}/>
                        <Route path="/manage" element={<ManageAnnonces />}/>
                        <Route path="/statistics" element={<Statistics/>} />
                        <Route path="/mesannonces" element={<MyAnnonces/>} />

                    </Routes>
                </div>

            </div>

        </div>
    )
}
export default Home;