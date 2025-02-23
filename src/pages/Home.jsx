import { useSelector } from "react-redux";
import { Routes, Route, useParams } from 'react-router-dom';
import AddRent from "./AddRent";
import Dashboard from "./Dashboard";
import AllAnnonces from "./AllAnnonces";
import ProductDetails from "./DetailsAnnonce";
import ManageAnnonces from "./ManageAnnonces";
import Statistics from "./HomeAdmin";
import MyAnnonces from "./MyAnnonces";
import UpdateAnn from "./UpdateAnn";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";


const Home = () => {
    //const announces = useSelector(state => state.announces);
    //const isLoggedIn = useSelector(state => state.loggedInUser);
    const users = useSelector(state => state.users);
    const userId = useParams();
    const user = users.find(user => user.id == userId)
    const id = user.id;

    return (
        <div>
            <div className="flex">
                <Dashboard />
                <div className="bg-gray-100 w-full flex justify-center items-center">
                    <div className="bg-white w-full md:w-1/2 lg:w-[96%] px-10 pt-10 h-[100vh]  rounded-lg">
                        <Routes>
                            <Route path="/all" element={<AllAnnonces id={id} />} />
                            <Route path="/add" element={<AddRent />} />
                            <Route path="/details/:idAnn" element={<ProductDetails />} />
                            <Route path="/manage" element={<ManageAnnonces />} />
                            <Route path="/statistics" element={<Statistics />} />
                            <Route path="/mesannonces" element={<MyAnnonces />} />
                            <Route path="/update/:indexAnn" element={<UpdateAnn />} />

                        </Routes>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home;