import { useSelector } from "react-redux";
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import AddRent from "./AddRent";
import Dashboard from "./Dashboard";
import AllAnnonces from "./AllAnnonces";
import ProductDetails from "./DetailsAnnonce";
import ManageAnnonces from "./ManageAnnonces";
import Statistics from "./HomeAdmin";
import MyAnnonces from "./MyAnnonces";
import UpdateAnn from "./UpdateAnn";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";


const Home = () => {
    const isLoggedIn = useSelector(state => state.loggedInUser);
    const userId = isLoggedIn.id;    //const users = useSelector(state => state.users);
    
    return (
        <div>


            <Routes>
                {/* SignIn and SignUp routes without Dashboard */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* All protected routes inside a layout with Dashboard */}
                <Route
                    path="/*"
                    element={
                        isLoggedIn ? (
                            <div className="flex">
                                <Dashboard />
                                <div className="bg-gray-100 w-full flex justify-center items-center">
                                    <div className="bg-white w-full md:w-1/2 lg:w-[96%] px-10 pt-10 h-[100vh] rounded-lg">
                                        <Routes>
                                            <Route path={`all/${userId}`} element={<AllAnnonces />} />
                                            <Route path={`add/${userId}`} element={<AddRent />} />
                                            <Route path="details/:idAnn" element={<ProductDetails />} />
                                            <Route path="manage" element={<ManageAnnonces />} />
                                            <Route path="statistics" element={<Statistics />} />
                                            <Route path={`mesannonces/${userId}`} element={<MyAnnonces />} />
                                            <Route path="update/:idAnn" element={<UpdateAnn />} />
                                        </Routes>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Navigate to="/signin" replace />
                        )
                    }
                />
            </Routes>
            
        </div >

    )
}
export default Home;