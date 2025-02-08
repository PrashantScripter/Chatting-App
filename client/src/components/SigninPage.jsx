import React, { useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { setUser } from '../store/loggedInUserSlice';
import { setFriends } from '../store/loggedInUserSlice';
import { useDispatch } from 'react-redux';


const SigninPage = () => {

    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signInHandler = async (e) => {
        e.preventDefault();

        setLoader(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, formData, { withCredentials: true });
            console.log(res);
            toast.success(res.data.message);
            dispatch(setUser(res.data.user));
            dispatch(setFriends(res.data.friends))

            setTimeout(() => {
                navigate('/chat');
                setLoader(false);
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <form onSubmit={signInHandler} className='flex flex-col gap-5 border border-slate-900 shadow-2xl shadow-black p-5 sm:p-10 rounded-md'>
                <h1 className='text-center text-2xl text-slate-400 font-mono'>Welcome Back!</h1>
                <div className='flex flex-col gap-4 text-slate-400'>

                    <input
                        type="text"
                        name='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="input input-bordered bg-slate-900 w-full max-w-xs"
                    />

                    <input
                        type="text"
                        name='password'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Password"
                        className="input input-bordered bg-slate-900 w-full max-w-xs"
                    />

                    {
                        loader
                            ?
                            (<div className='btn btn-success flex justify-center items-center'>
                                <span className="loading loading-spinner loading-sm"></span>
                            </div>)
                            :
                            (<button type='submit' className='btn btn-success text-slate-950 font-bold'>Log in</button>)
                    }


                    <Toaster
                        position="top-right"
                    />

                </div>

                <p className='text-xs text-center text-slate-400'>New User? <button onClick={() => navigate('/signup')} className='hover:text-blue-400 underline underline-offset-4'>Sign Up</button></p>
            </form>
        </div>
    )
}

export default SigninPage;