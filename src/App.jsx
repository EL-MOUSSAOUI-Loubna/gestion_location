import { useSelector } from "react-redux";
import Home from "./pages/Home";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
    const isLoggedIn = useSelector(state => state.loggedInUser);
    const navigate = useNavigate();

    const signupFirst = ()=>{
        alert('you should sign in first')
        navigate('/signin');
    }

    return (
        <div>
            <Routes>
                {isLoggedIn && isLoggedIn.lenght > 0 ?
                    <Route path="/home/:userId" element={<Home />} />
                    : signupFirst
                }
                <Route path="/" element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
            </Routes>
        </div>
    );
}
