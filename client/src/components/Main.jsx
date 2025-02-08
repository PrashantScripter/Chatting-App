import React from 'react'

const Main = () => {
    return (
        <div className='flex flex-col h-screen gap-10 py-20 px-5 md:px-10'>
            <div className=''>
                <p className='w-full xl:w-3/4 text-2xl sm:text-3xl md:text-4xl leading-snug  font-semibold text-slate-400'>Welcome to <span className='text-pink-900 text-3xl'>BaatCheet.com</span> – Where Conversations <span className='text-green-400 text-3xl'>Connect!</span> <br />
                    "Stay close to the people who matter most. Chat, share, and connect seamlessly in <span className='text-cyan-400'>real-time</span>. Dive into meaningful conversations with just a tap!"</p>
            </div>

            <div className='flex self-center md:self-end w-[95%] md:w-[70%] xl:w-[50%] z-10'>
                <img className="w-full border border-slate-900 hover:border-slate-400 rounded-md cursor-pointer hover:scale-105 transition-all ease-in-out " src="../images/website.png" alt="" />
            </div>
        </div>
    )
}

export default Main