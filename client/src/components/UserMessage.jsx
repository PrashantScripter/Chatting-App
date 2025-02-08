import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const UserMessage = ({ profilePhotoOfReceiver }) => {

    const { messages } = useSelector((store) => store.allMessages);
    const { loggedInUser } = useSelector((store) => store.user);

    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <>
            {/* recived message */}
            {messages?.map((message, index) => {
                const isSender = message?.sender?.toString() === loggedInUser?._id?.toString();

                const isImage = message?.fileType === 'image';
                const isVideo = message?.fileType === 'video';
                const isAudio = message?.fileType === 'audio';

                return (
                    <div ref={scroll} key={index} className={`chat ${isSender ? 'chat-end' : 'chat-start'}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src={`${isSender ? loggedInUser?.profilePhoto : profilePhotoOfReceiver}`} />
                            </div>
                        </div>

                        <div className='chat-bubble p-0 bg-slate-900 overflow-hidden'>
                            <div className={`${message?.fileUrl ? 'w-[250px]' : ''}`}>
                                {isImage && <img className='w-full cursor-pointer' src={message?.fileUrl}></img>}
                                {isVideo && <video className='w-full' src={message?.fileUrl} controls></video>}
                                {isAudio && <audio className='w-full' src={message?.fileUrl} controls></audio>}
                            </div>
                            <div className="flex flex-row items-center gap-3 p-3 justify-between">
                                <div className="text-sm">{message?.text}</div>
                                <time className="text-xs text-green-400 ">{formatTime(message?.createdAt)}</time>
                            </div>
                        </div>
                    </div>
                )
            })}

        </>
    );
};

export default UserMessage;