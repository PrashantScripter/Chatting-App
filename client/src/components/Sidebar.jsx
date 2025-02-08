import React, { useState } from 'react'
import SelectedUsers from './SelectedUsers'
import ProfileContainer from './ProfileContainer'
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setOnlineUsers } from '../store/loggedInUserSlice';
import { clearSelectedUser } from '../store/selectedUserSlice';

const Sidebar = () => {

    const [displayProfileContailer, setDisplayProfileContailer] = useState('hidden');
    const [displayAllUserContainer, setDisplayAllUserContainer] = useState('hidden');
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedInUser = useSelector((store) => store.user.loggedInUser);
    const { friends } = useSelector((store) => store.user);

    const filteredUser = friends.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const GetAllUserHandler = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/allusers`, { withCredentials: true });
            setUsers(res.data.users);
            console.log(users);

        } catch (error) {
            console.log(error);
        }
    };

    const showProfileHandler = () => {
        setDisplayProfileContailer("");
    };

    const showOtherUserHandler = () => {
        setDisplayAllUserContainer("");
        GetAllUserHandler();
    };

    const getDataFromChildForProfileContainer = (profiledata) => {
        setDisplayProfileContailer(profiledata);
    };

    const getDataFromChildForOtherUserContainer = (otherUserdata) => {
        setDisplayAllUserContainer(otherUserdata);
    };

    const LoggedOutHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, { withCredentials: true });
            console.log(res);
            toast.success(res.data.message);
            dispatch(clearUser());
            dispatch(clearSelectedUser());
            dispatch(setOnlineUsers([]));

            setTimeout(() => {
                navigate('/signin');
            });

        } catch (error) {
            console.log(error);
            toast.error('Logout failed. Please try again.');
        }
    }

    return (

        <div className='flex flex-col h-full w-full sm:w-[400px] border-r border-slate-900'>

            <Toaster
                position="top-right"
            />

            <div className='p-4 h-[4rem]'>
                <h1 className='text-slate-400 text-2xl font-mono'>Baat<span className='text-pink-400'>cheet.com</span></h1>
            </div>

            <div className='flex flex-row h-[calc(100%-4rem)] gap-2 p-1'>

                <div className='bg-slate-900 rounded-md flex flex-col items-center gap-10 p-3 md:p-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={showOtherUserHandler} className='cursor-pointer hover:fill-green-400' height="24px" viewBox="0 -960 960 960" width="24px" fill="#94a3b8"><path d="M360-240ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q32 0 64.5 3.5T489-425q-13 17-22.5 35.5T451-351q-23-5-45.5-7t-45.5-2q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32h323q4 22 11 42t18 38H40Zm320-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113Zm-400 80q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm320 440q34 0 56.5-20t23.5-60q1-34-22.5-57T680-360q-34 0-57 23t-23 57q0 34 23 57t57 23Zm0 80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 43.5T818-198L920-96l-56 56-102-102q-18 11-38.5 16.5T680-120Z" /></svg>
                    <div className="avatar cursor-pointer" onClick={showProfileHandler}>
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-1">
                            <img src={loggedInUser?.profilePhoto} />
                        </div>
                    </div>
                    <svg onClick={LoggedOutHandler} xmlns="http://www.w3.org/2000/svg" className='cursor-pointer hover:fill-green-400' height="24px" viewBox="0 -960 960 960" width="24px" fill="#94a3b8"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex items-center gap-2'>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered w-full  h-10 bg-slate-900 text-slate-50"
                        />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className='cursor-pointer rounded-md bg-slate-900 btn btn-sm h-10 w-10  border-none hover:bg-slate-950' viewBox="0 -960 960 960" fill="#94a3b8"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg> */}
                    </div>
                    <div className='flex flex-col rounded-md overflow-y-scroll scrollbar-hidden border border-slate-900'>
                        <SelectedUsers filteredUser={filteredUser} searchTerm={searchTerm} />
                    </div>
                </div>

            </div>

            <ProfileContainer displayProfileContailer={displayProfileContailer} getDataFromChildForProfileContainer={getDataFromChildForProfileContainer} />
            <OtherUsers displayAllUserContainer={displayAllUserContainer} users={users} getDataFromChildForOtherUserContainer={getDataFromChildForOtherUserContainer} />
        </div>
    )
}

export default Sidebar;