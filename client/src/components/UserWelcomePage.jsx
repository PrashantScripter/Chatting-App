import React from 'react'
import { useSelector } from 'react-redux';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const UserWelcomePage = () => {
    const { loggedInUser } = useSelector((store) => store.user);
    return (
        <div className='w-[78%] hidden sm:block h-screen'>
            <div className='h-[100vh] flex justify-center items-center flex-col'>
                <DotLottieReact
                className='md:w-3/4 xl:w-1/2'
                    src="https://lottie.host/d6550a34-8a76-4b24-a3c9-b5899fea0b33/JqmAKVVqWd.lottie"
                    loop
                    autoplay
                />
                <p className='text-teal-600 text-xl text-center font-thin'>{`Welcome, ${loggedInUser?.fullName}!`}<br /> Start Chatting.</p>
            </div>
        </div>
    )
}

export default UserWelcomePage