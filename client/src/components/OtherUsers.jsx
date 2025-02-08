import React, { useState } from 'react'
import OtherUser from './OtherUser'
import { useSelector } from 'react-redux';

const OtherUsers = ({ displayAllUserContainer, users, getDataFromChildForOtherUserContainer }) => {

    const { loggedInUser } = useSelector((store) => store.user);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUser = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const hideOtherUserHandler = () => {
        getDataFromChildForOtherUserContainer('hidden');
    };

    return (
        <div className={`absolute flex w-full h-full backdrop-blur-sm justify-center items-center z-50 ${displayAllUserContainer}`}>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={hideOtherUserHandler} className='absolute right-4 top-4 w-8 h-8 p-1 rounded-sm cursor-pointer fill-slate-400 hover:bg-red-900' height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>

            <div className='bg-slate-  flex flex-col gap-2 w-[300px] h-[400px]'>
                <div className='flex flex-row gap-2 items-center '>
                    <input
                        className='bg-slate-900 p-2 text-slate-400 rounded-md w-full border-none outline-none'
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search'
                    />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" className='bg-slate-900 h-10 w-10 p-2 rounded-md fill-slate-400 cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T520-640q0-33-23.5-56.5T440-720q-33 0-56.5 23.5T360-640q0 33 23.5 56.5T440-560ZM884-20 756-148q-21 12-45 20t-51 8q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 27-8 51t-20 45L940-76l-56 56ZM660-200q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-540 40v-111q0-34 17-63t47-44q51-26 115-44t142-18q-12 18-20.5 38.5T407-359q-60 5-107 20.5T221-306q-10 5-15.5 14.5T200-271v31h207q5 22 13.5 42t20.5 38H120Zm320-480Zm-33 400Z" /></svg>
                    </button>
                </div>

                <div className='bg-slate-900 overflow-y-scroll scrollbar-hidden rounded-md'>
                    {searchTerm.trim() && filteredUser.length === 0 ? (
                        <p className="text-center text-gray-400 p-4">No user found!</p>
                    ) : filteredUser.length > 0 ? (
                        filteredUser
                            .filter((user) => user._id !== loggedInUser._id) // Exclude logged-in user
                            .map((user) => (
                                <OtherUser key={user._id} user={user} />
                            ))
                    ) : users.length > 0 ? (
                        users
                            .filter((user) => user._id !== loggedInUser._id) // Exclude logged-in user
                            .map((user) => (
                                <OtherUser key={user._id} user={user} />
                            ))
                    ) : (
                        <p className="text-center text-gray-400 p-4">No users available!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OtherUsers