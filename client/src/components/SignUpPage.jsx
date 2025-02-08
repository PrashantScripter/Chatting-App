import React, { useEffect, useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUpPage = () => {

    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        gender: '',
    });

    const navigate = useNavigate();

    const signUpHandler = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, formData, { withCredentials: true });
            console.log(res);
            toast.success(res.data.message);
            navigate('/signin')
            setLoader(false);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <form onSubmit={signUpHandler} action="" className='flex flex-col gap-5 border border-slate-900 shadow-2xl shadow-black p-5 sm:p-10 rounded-md'>
                <h1 className='text-center text-2xl text-slate-400 font-mono'>Create New Account</h1>
                <div className='flex flex-col gap-4 text-slate-400'>
                    <input
                        type="text"
                        name='fullName'
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Full Name"
                        className="input input-bordered bg-slate-900 w-full max-w-xs"
                        required
                    />

                    <input
                        type="text"
                        name='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="input input-bordered bg-slate-900 w-full max-w-xs"
                        required
                    />

                    <input
                        type="text"
                        name='password'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Set Password"
                        className="input input-bordered bg-slate-900 w-full max-w-xs"
                        required
                    />

                    <div className='flex flex-row gap-5 items-center'>
                        <div className='flex flex-row gap-1 items-center'>
                            <label htmlFor="checkbox">
                                Male
                            </label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="radio radio-success radio-sm"
                                required
                            />
                        </div>

                        <div className='flex flex-row gap-1 items-center'>
                            <label htmlFor="checkbox" className=''>
                                Female
                            </label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="radio radio-success radio-sm"
                                required
                            />
                        </div>
                    </div>

                    {
                        loader
                            ?
                            (<div className='btn btn-success flex justify-center items-center'>
                                <span className="loading loading-spinner loading-sm"></span>
                            </div>)
                            :
                            (<button type='submit' className='btn btn-success text-slate-950 font-bold'>Sign Up</button>)
                    }

                    <Toaster
                        position="top-right"

                    />

                </div>
                
                <p className='text-xs text-center text-slate-400'>Already have an accout? <button onClick={() => navigate('/signin')} className='hover:text-blue-400 underline underline-offset-4'>Login</button></p>
            </form>

        </div>
    )
}

export default SignUpPage;