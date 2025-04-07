import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

export default function App() {
    const isLoggedIn = useSelector(state => state.loggedInUser);
    const userId = isLoggedIn.id;

    return (
        <div>
            <Routes>
                <Route path="/home/:userId" element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </div>
    );
}
