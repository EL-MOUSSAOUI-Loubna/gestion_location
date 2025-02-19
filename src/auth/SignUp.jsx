import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../actions/actions';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {

    //const countries = useSelector(state => state.countries || []);
    const cities = useSelector(state => state.cities || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [errPsw, setErrPsw] = useState('');
    const [errEmail, setErrEmail] = useState('');
    const [disableBtn, setDisableBtn] = useState(false);

    useEffect(() => {
        dispatch(fetchCities);
    }, [dispatch]);

    const handleEmail = (e) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(e.target.value)) {
            setEmail(e.target.value);
            setErrEmail('')
            setDisableBtn(true);
        } else {
            setErrEmail('Incorrect format')
            setDisableBtn(false);
            setErrMsg('')
        }
    }
    const handleConfirmPsw = (e) => {
        if (password !== e.target.value) {
            setErrPsw('Password does not match')
            setDisableBtn(true);
        } else {
            setConfirmPassword(e.target.value);
            setErrPsw('');
            setDisableBtn(false);
            setErrMsg('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nom || !prenom || !email || !ville || !password || !confirmPassword) {
            setErrMsg('Please fill in all the fields')
            return;
        }

        setErrMsg('')
        alert('signed up')
        const newUser = { firstname, lastname, email, city, password };
        dispatch(signUp_user(newUser));
        navigate('/');
    }



    return (
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className='bg-white w-[600px] shadow-md rounded-md p-6'>
                <svg className="mx-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                </svg>                <h1 className="mt-3 text-center text-3xl font-bold text-gray-900">Sign Up</h1>
                <p className='text-red-500 mt-2 text-center'><b>{errMsg}</b></p>
                <form className='space-y-5 mt-10' onSubmit={handleSubmit}>

                    <div className='mb-4 md:flex md:justify-between gap-3'>
                        <div className='w-1/2'>
                            <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>First Name</label>
                            <input
                                id='firstname'
                                type="text"
                                placeholder="Enter your first name"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={(e) => { setFirstname(e.target.value); setErrMsg('') }}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>LastName</label>
                            <input
                                id='lastname'
                                type="text"
                                placeholder="Enter your last name"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={(e) => { setLastname(e.target.value); setErrMsg('') }}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='country' className='block text-sm font-medium text-gray-700'>City</label>
                        <select value={city}
                            onChange={(e) => { setCity(e.target.value); setErrMsg('') }}
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm">
                            <option>-- Select a city --</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input
                            id='email'
                            type="email"
                            placeholder="Enter your email"
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            onChange={handleEmail}
                        />
                        <p className='text-red-500'><small>{errEmail}</small></p>
                    </div>


                    <div className='mb-4 md:flex md:justify-between gap-3'>
                        <div className='w-1/2'>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                            <input
                                id='password'
                                type="password"
                                placeholder="Enter your password"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={(e) => { setPassword(e.target.value); setErrMsg('') }}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label htmlFor='confpassword' className='block text-sm font-medium text-gray-700'>Confirm password</label>
                            <input required
                                id='confpassword'
                                type="password"
                                placeholder="Confirm your password"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={handleConfirmPsw}
                            />
                            <p className='text-red-500'><small>{errPsw}</small></p>
                        </div>

                    </div>

                    <div className='text-center mt-5'>
                        <small>Already have an account ? <Link to='/signIn'><b className='text-blue-500'>Sign in !</b></Link></small>
                    </div>

                    <input
                        type="submit"
                        value="Sign Up"
                        disabled={disableBtn}
                        className="flex w-full justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                    />
                </form>
            </div>

        </div>
    );
};
export default SignUp;