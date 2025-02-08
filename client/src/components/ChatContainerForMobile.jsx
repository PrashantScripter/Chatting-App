import React, { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ChatContainer = lazy(() => import('./ChatContainer'));

const ChatContainerForSmallDevices = () => {

    const { selectedUser } = useSelector((store) => store.selectedUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.innerWidth > 640) {
            navigate('/chat');
        }
        if (selectedUser === null) {
            navigate('/chat');
        }
    },[]);

    return (
        <div>
            <ChatContainer fullWidth />
        </div>
    )
}

export default ChatContainerForSmallDevices;