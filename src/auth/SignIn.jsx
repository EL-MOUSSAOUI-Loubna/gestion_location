import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
    const users = useSelector(state => state.users);
    const navigate= useNavigate();

    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [err, setErr] = useState('');

    const verifyEmail = (e) => {
        setEmail(e.target.value)
    }
    const verifyPassword = (e) => {
        setPsw(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !psw) {
            setErr('Please fill in all the fields');
            return;

        }
        setErr(''); 
        const user = users.find(user => user.email === email)
        if (user && user.password === psw) {
            alert('Valid account');
            navigate('/')
        } else {
            setErr('Password or email is incorrect');
        }
               
    }


    return (
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className='bg-white w-[600px] shadow-md rounded-md p-6'>
                <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/511053/log-out.svg" alt="sign up logo" />
                <h1 className="mt-3 text-center text-3xl font-bold text-gray-900">Sign In</h1>
                <form className='space-y-5 mt-10' onSubmit={handleSubmit}>

                    <p className='text-red-500 text-center'><small><b>{err}</b></small></p>

                    <div className=''>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input 
                            id='email'
                            type="email"
                            placeholder="Enter your email"
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            onChange={verifyEmail}
                        />
                    </div>
                    <div className=''>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                        <input 
                            id='password'
                            type="password"
                            placeholder="Enter your password"
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                            onChange={verifyPassword}
                        />

                    </div>

                    <div className='text-center mt-5'>
                        <small>First time here ? <Link to='/signUp' ><b className='text-blue-500'>Sign up !</b></Link></small>
                    </div>


                    <input
                        type="submit"
                        value="Sign In"
                        className="flex w-full justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                    />
                </form>
            </div>

        </div>
    );
};
export default SignIn;