import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { MdOutlineClear } from "react-icons/md";
const UserMessage = lazy(() => import('./UserMessage'));

const ChatContainer = ({fullWidth = false}) => {

    const [hide, setHide] = useState(true);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [hidePreview, setHidePreview] = useState(true);
    const [priviewData, setPreviewData] = useState(null);
    const [fileType, setFileType] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const menuRef = useRef(null); // Ref to track the menu div


    useEffect(() => {
        const handleClickOutside = (event) => {
            // If menu is open and the click is outside, close it
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setHide(true);
            }
        };

        if (!hide) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hide]);


    const handleMedia = useCallback((e, setMedia) => {
        const file = e.target.files[0];
        if (!file) return;
        setMedia(file);
        setHide(true);

        const fileType = file.type.split('/')[0]
        setFileType(fileType);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewData(reader.result);
                setHidePreview(false);
            };
            reader.readAsDataURL(file);
        };

    }, []);

    const imagePreviewHandler = useCallback(() => {
        setPreviewData(null);
        setHidePreview(true);
        setImage(null);
        setVideo(null);
        setAudio(null);
    }, []);

    const selectedUser = useSelector((store) => store.selectedUser.selectedUser);
    const { onlineUsers } = useSelector((store) => store.user);

    const sendMessage = useCallback(async (e) => {
        e.preventDefault();

        if (!message.trim() && !image && !video && !audio) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('text', message);

        if (image) formData.append('file', image);
        if (video) formData.append('file', video);
        if (audio) formData.append('file', audio);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/message/send/${selectedUser?._id}`,
                formData,
                {

                    headers: {
                        "Content-Type": "multipart/form-data",
                    },

                    withCredentials: true,

                }
            );

            console.log(res);
            setHidePreview(true);
            setMessage('');
            inputRef.current?.focus();
            setImage(null);
            setVideo(null);
            setAudio(null);

        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false); // Hide loader
        }
    }, [message, image, video, audio, selectedUser]);

    return (
        <>
            <div className={`${fullWidth ? 'w-[100vw]' : 'w-[78%] hidden'} sm:block h-screen`}>
                {/* selected user name and photo */}
                <div className='border-b border-slate-900 p-4 h-[4rem]'>
                    <div className='flex items-center gap-2'>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={selectedUser?.profilePhoto} />
                            </div>
                        </div>
                        <div className='text-slate-400'>
                            <p>{selectedUser?.fullName}</p>
                            {/* online status */}
                            <div className=''>
                                {
                                    onlineUsers?.includes(selectedUser?._id) ?
                                        <p className='text-green-400 font-extralight text-xs'>online</p>
                                        : ""

                                }

                            </div>
                        </div>
                    </div>

                </div>

                {/* all messages between users */}
                <div className='p-4 overflow-y-scroll scrollbar-hidden h-[calc(100%-8rem)]'>
                    <Suspense>
                        <UserMessage profilePhotoOfReceiver={selectedUser?.profilePhoto} />
                    </Suspense>
                </div>

                {/* input for sending messages */}
                <form onSubmit={sendMessage} className='p-2 h-[4rem]'>
                    {!hide && (
                        <div ref={menuRef} className="flex flex-col rounded-md w-min items-center absolute bottom-16 overflow-hidden">
                            <label className="cursor-pointer flex flex-col items-center justify-center w-40 h-10 border-b border-slate-950 bg-slate-900 hover:bg-slate-950">
                                <p className='text-green-400'>Photo</p>
                                <input
                                    onChange={(e) => handleMedia(e, setImage)}
                                    name='image'
                                    type="file"
                                    className="hidden"
                                    accept='image/*'
                                />
                            </label>
                            <label className="cursor-pointer flex flex-col items-center justify-center w-40 h-10 border-b border-slate-950 bg-slate-900 hover:bg-slate-950">
                                <p className='text-green-400'>Video</p>
                                <input
                                    onChange={(e) => handleMedia(e, setVideo)}
                                    name='video'
                                    type="file"
                                    className="hidden"
                                    accept="video/*"
                                />
                            </label>
                            <label className="cursor-pointer flex flex-col items-center justify-center w-40 h-10 border-b border-slate-950 bg-slate-900 hover:bg-slate-950">
                                <p className='text-green-400'>Audio</p>
                                <input
                                    onChange={(e) => handleMedia(e, setAudio)}
                                    name='audio'
                                    type="file"
                                    className="hidden"
                                    accept='audio/*'
                                />
                            </label>
                        </div>
                    )}

                    <div className='flex flex-row items-center relative'>
                        {/* file preview div start */}
                        <div className={`absolute right-0 bottom-14 w-20 flex flex-col ${hidePreview ? 'hidden' : ''}`}>
                            <MdOutlineClear onClick={imagePreviewHandler} className='cursor-pointer text-slate-100 hover:text-red-400' />
                            <div className='overflow-hidden w-full rounded-md shadow-md shadow-black'>
                                {fileType === 'image' && <img className='w-full object-contain' src={priviewData} alt="" />}
                                {fileType === 'video' && <video className='w-full object-contain' src={priviewData} alt="" />}
                                {fileType === 'audio' && <audio controls className='w-full' src={priviewData} alt="" />}
                            </div>
                        </div>
                        {/* //file priview div ends */}

                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setHide((prev) => !prev)} className='hover:scale-110 hover:fill-green-400 cursor-pointer' height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z" /></svg>
                        <input
                            ref={inputRef}
                            name='text'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className='p-3 input validator rounded-md w-full text-slate-400 outline-none bg-slate-900'
                            type="text"
                            placeholder='Type messages here...'
                            autoComplete='off'
                        />
                        <button className='absolute right-3' type='submit'>
                            {
                                loading ?
                                    (<span className="loading loading-spinner loading-md text-green-500 flex self-center"></span>)
                                    :
                                    (<svg xmlns="http://www.w3.org/2000/svg" type='' className=' cursor-pointer hover:fill-green-400' height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg>)
                            }
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default ChatContainer;