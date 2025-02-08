import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setOnlineUsers, setUser } from '../store/loggedInUserSlice';
import toast from 'react-hot-toast';
import { clearSelectedUser } from '../store/selectedUserSlice';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../store/allMessagesBetweenUserSlice';


const ProfileContainer = ({ displayProfileContailer, getDataFromChildForProfileContainer }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedInUser } = useSelector((store) => store.user);
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [alert, setAlert] = useState(true);

  const hideProfileContainerHandler = () => {
    getDataFromChildForProfileContainer('hidden');
    setAlert(true);
  };

  const profilePreviewHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const profilePhotoUpdateHandler = async (e) => {
    e.preventDefault();
    if (!profile) return;
    const formData = new FormData();
    formData.append('file', profile);

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/updateprofile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      const updatedUser = response.data.user;
      dispatch(setUser(updatedUser));
      toast.success(response.data.message);

    } catch (error) {
      console.log(error)
    }
  }

  const deleteAccountHandler = async () => {
    try {

      const [deleteResponse, logoutResponse] = await Promise.all([
        axios.delete(`${import.meta.env.VITE_API_URL}/user/deleteuseraccount`, { withCredentials: true }),
        axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, { withCredentials: true }),
      ]);

      console.log(deleteResponse);
      console.log(logoutResponse);
      toast.success(deleteResponse.data.message);

      dispatch(clearUser());
      dispatch(clearSelectedUser());
      dispatch(setOnlineUsers([]));

      setTimeout(() => {
        navigate('/signin');
      });

    } catch (error) {
      console.log(error);
    }
  }

  const deleteAccountAlertHandler = (e, val) => {
    e.preventDefault();
    setAlert(val);
  }

  return (
    <div className={`absolute w-full h-full backdrop-blur-sm justify-center items-center z-50 ${displayProfileContailer}`}>
      <div className='flex flex-col h-full justify-center items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={hideProfileContainerHandler} className='relative self-end sm:self-auto sm:left-44 bottom-2  w-8 h-8 p-1 rounded-sm cursor-pointer fill-slate-400 hover:bg-red-900' height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
        <form action="" className='flex flex-col justify-between items-center bg-slate-900 rounded-md w-[95%] xl:w-3/12 xl:h-1/4 sm:w-[50%] overflow-hidden'>
          <div className='flex p-7 gap-4'>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
                {
                  profilePreview ?
                    <img src={profilePreview} />
                    :
                    <img src={loggedInUser?.profilePhoto} />
                }
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center w-full">
              <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-green-500 rounded-lg bg-slate-900 hover:bg-slate-950">
                <p className='text-green-500 px-4 py-2'>Update photo</p>
                <input
                  onChange={(e) => profilePreviewHandler(e)}
                  type="file"
                  className="hidden"
                  accept='image/*'
                />
              </label>
              <div onClick={profilePhotoUpdateHandler} className='cursor-pointer border p-2 rounded-md border-blue-700 hover:bg-slate-950'>
                <button className='text-blue-500'>Save</button>
              </div>
            </div>
          </div>

          <div onClick={(e) => deleteAccountAlertHandler(e, false)} className='bg-red-800 p-2 w-full text-center cursor-pointer hover:text-white hover:bg-red-700'>
            <button className='text-black'>Delete Account</button>
          </div>
        </form>
      </div>

      <div className={`${alert ? 'hidden' : ''} absolute flex flex-col top-2 sm:top-10 right-0 left-0 m-2 sm:right-10 sm:left-auto  `}>
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Are you sure, want to delete account permanently?</span>
          <div className='flex flex-row gap-2'>
            <button onClick={(e) => deleteAccountAlertHandler(e, true)} className="btn btn-sm">Deny</button>
            <button onClick={deleteAccountHandler} className="btn btn-sm btn-primary">Accept</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileContainer;