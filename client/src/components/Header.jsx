import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";

const Header = () => {

    const navigate = useNavigate();

    return (
        <div className='flex h-[4rem] w-full items-center justify-between px-5 md:px-10'>
            <div className=''>
                <h1 className='text-slate-400 text-xl sm:text-2xl md:text-3xl font-bold'>Baat<span className='text-pink-900 brightness-150'>Cheet.com</span></h1>
            </div>
            <div>
                <ul className='text-slate-400 flex gap-5 items-center'>
                    <a href="https://github.com/PrashantScripter/Chatting-App" target='_blank'>
                        <FaGithub className='text-xl cursor-pointer hover:scale-110 transition-all ease-in-out hover:text-green-400' />
                    </a>
                    <li onClick={() => navigate('/signin')} className='border border-green-900 rounded-md text-green-400 text-sm md:text-lg cursor-pointer hover:bg-green-400 hover:text-slate-950 px-2 md:py-1 py-0.5 '>Signin</li>
                </ul>
            </div>
        </div>
    )
}

export default Header