import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../store/selectedUserSlice';
import { setMessage } from '../store/allMessagesBetweenUserSlice';

const OtherUser = ({ user }) => {

    const dispatch = useDispatch();

    const selectUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user?._id}`, { withCredentials: true });
            const userInfo = res.data.userInfo;

            const conversation = await axios.get(`${import.meta.env.VITE_API_URL}/message/getMessage/${user?._id}`, { withCredentials: true });
            const allMessages = conversation.data.chats

            console.log(allMessages);
            console.log(userInfo);


            dispatch(setMessage(allMessages));
            dispatch(setSelectedUser(userInfo));

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            key={user?._id}
            onClick={() => selectUser(user?._id)}
            className="bg-slate-900 flex flex-col gap-2 p-4 rounded-sm cursor-pointer border-b border-slate-950 hover:bg-slate-950"
        >
            <div className="flex items-center gap-2">
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.profilePhoto} alt={user?.fullName} />
                    </div>
                </div>
                <div className="text-slate-400">
                    <p>{user?.fullName}</p>
                </div>
            </div>
        </div>
    )
}

export default OtherUser