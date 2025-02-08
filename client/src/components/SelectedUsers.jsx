import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../store/selectedUserSlice';
import { setMessage } from '../store/allMessagesBetweenUserSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectedUsers = ({ filteredUser, searchTerm }) => {

    const friends = useSelector((store) => store.user.friends);
    const { onlineUsers } = useSelector((store) => store.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectUser = async (friendId) => {
        try {
            // Fetch user information
            const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/user/${friendId}`, { withCredentials: true });
            const userInfo = userResponse?.data?.userInfo;

            // Fetch conversation messages
            const conversationResponse = await axios.get(`${import.meta.env.VITE_API_URL}/message/getMessage/${friendId}`, { withCredentials: true });
            const chats = conversationResponse?.data?.chats;

            // Dispatch actions to update the Redux store
            if (userInfo) dispatch(setSelectedUser(userInfo));
            if (chats) dispatch(setMessage(chats));

            if (window.innerWidth <= 640) {
                navigate('/chat-small-devices')
            }
        } catch (error) {
            console.error('Error selecting user:', error.message);
        }
    }

    return (
        <>
            {searchTerm.trim() && filteredUser.length === 0 ? (  
                <p className="text-center text-gray-400 p-4">No users found.</p>
            ) : filteredUser.length > 0 ? (
                filteredUser.map((user) => (
                    <div 
                        key={user?._id} 
                        onClick={() => selectUser(user?._id)} 
                        className='bg-slate-950 flex flex-col gap-2 p-4 rounded-sm cursor-pointer border-b border-slate-900 hover:bg-slate-900'
                    >
                        <div className='flex items-center gap-2'>
                            <div className={`avatar ${onlineUsers.includes(user?._id) ? 'online' : ''}`}>
                                <div className="w-10 rounded-full">
                                    <img src={user?.profilePhoto} alt={user?.fullName} />
                                </div>
                            </div>
                            <div className='text-slate-400'>
                                <p>{user?.fullName}</p>
                                {onlineUsers.includes(user?._id) && <p className='text-green-400 text-xs'>Online</p>}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                friends.length > 0 ? (
                    friends.map((friend) => (
                        <div 
                            key={friend?._id} 
                            onClick={() => selectUser(friend?._id)} 
                            className='bg-slate-950 flex flex-col gap-2 p-4 rounded-sm cursor-pointer border-b border-slate-900 hover:bg-slate-900'
                        >
                            <div className='flex items-center gap-2'>
                                <div className={`avatar ${onlineUsers.includes(friend?._id) ? 'online' : ''}`}>
                                    <div className="w-10 rounded-full">
                                        <img src={friend?.profilePhoto} alt={friend?.fullName} />
                                    </div>
                                </div>
                                <div className='text-slate-400'>
                                    <p>{friend?.fullName}</p>
                                    {onlineUsers.includes(friend?._id) && <p className='text-green-400 text-xs'>Online</p>}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 p-4">Select a user for chatting!</p>
                )
            )}
        </>
    );    
}

export default SelectedUsers;