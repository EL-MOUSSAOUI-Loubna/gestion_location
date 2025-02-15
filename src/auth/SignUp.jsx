import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchCities } from '../actions/actions';

const SignUp = () => {
 
    const countries = useSelector(state => state.countries || []);
    const dispatch = useDispatch();

    const [Firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const cities = useSelector(state => state.cities || []);

    useEffect(() => {
        dispatch (fetchCountries) 
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCities);
      }, [dispatch]);
   

    const handleSubmit = (e) => {
        e.preventDefault();
    }
        


    return (
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className='bg-white w-[600px] shadow-md rounded-md p-6'>
                <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/511053/log-out.svg" alt="sign up logo" />
                <h1 className="mt-3 text-center text-3xl font-bold text-gray-900">Sign Up</h1>
                <form className='space-y-5 mt-10' onSubmit={handleSubmit}>

                    <div className='mb-4 md:flex md:justify-between gap-3'>
                        <div className='w-1/2'>
                            <label htmlFor='firstname' className='block text-sm font-medium text-gray-700'>First Name</label>
                            <input required
                                id='firstname'
                                type="text" 
                                placeholder="Enter your first name"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={(e)=>{setFirstname(e.target.value)}}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label htmlFor='lastname' className='block text-sm font-medium text-gray-700'>Last Name</label>
                            <input required
                                id='lastname'
                                type="text" 
                                placeholder="Enter your last name"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={(e)=>{setLastname(e.target.value)}}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='country' className='block text-sm font-medium text-gray-700'>City</label>
                        <select 
                            onChange={(e)=>{setCity(e.target.value)}}
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
                        <input required
                            id='email'
                            type="email" 
                            placeholder="Enter your email"
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                        <p className='text-red-500'><small>please enter a valid email</small></p>
                    </div>
                    

                    <div className='mb-4 md:flex md:justify-between gap-3'>
                        <div className='w-1/2'>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                            <input required
                                id='password'
                                type="password"
                                placeholder="Enter your password"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>
                        <div className='w-1/2'>
                            <label htmlFor='confpassword' className='block text-sm font-medium text-gray-700'>Confirm password</label>
                            <input required
                                id='confpassword'
                                type="password" 
                                placeholder="Confirm your password"
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                            />
                            <p className='text-red-500'><small>password does not match</small></p>
                        </div>
                       
                    </div>

                    <div className='text-center mt-5'>
                        <small>Already have an account ? <a href='' className='text-blue-500'><b>Sign in !</b></a></small>
                    </div>
                
                    <input 
                    type="submit" 
                    value="Sign Up"
                    className="flex w-full justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                    />
                </form>
            </div>
            
        </div>
    );
};
export default SignUp;