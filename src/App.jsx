import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(state => state.loggedInUser);
    return isLoggedIn ? children : <Navigate to="/signin" replace />;
};
export default function App() {
    const isLoggedIn = useSelector(state => state.loggedInUser);
    const userId = isLoggedIn.id;
    const navigate = useNavigate();

    /*const signupFirst = ()=>{
        alert('you should sign in first')
        navigate('/signin');
    }*/

    return (
        <div>
            <Routes>
                <Route path="/home/:userId" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="*" element={<Navigate to={isLoggedIn ? `/home/${userId}` : "/signin"} replace />} />
                <Route path="/" element={<Navigate to={isLoggedIn ? `/home/${userId}` : "/signin"} replace />} />
                <Route path='/signin' element={<SignIn />} />
            </Routes>
        </div>
    );
}
