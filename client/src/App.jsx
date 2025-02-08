import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React, { lazy, Suspense, useEffect } from 'react'
const HomeLandingPage = lazy(() => import('./components/HomeLandingPage'))
const HomePage = lazy(() => import('./components/HomePage'));
const SigninPage = lazy(() => import('./components/SigninPage'));
const SignUpPage = lazy(() => import('./components/SignUpPage'));
const ErrorPage = lazy(() => import('./components/Error'));
const ChatContainerForSmallDevices = lazy(() => import('./components/ChatContainerForMobile'));
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlineUsers } from './store/loggedInUserSlice'
import { addMessage } from './store/allMessagesBetweenUserSlice'
import ProtectedRoute from './components/Protected';

const App = () => {

  const { loggedInUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {

    let socket;

    if (loggedInUser) {
      socket = io(`${import.meta.env.VITE_API_URL}`, {
        query: {
          id: loggedInUser?._id,
        }
      });

      socket.on('activeUsers', (activeUsers) => {
        dispatch(setOnlineUsers(activeUsers));
      });

      socket.on('newMessage', (newMessage) => {
        dispatch(addMessage(newMessage));
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [loggedInUser, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense fallback={<span className="text-green-400 flex w-[100vw] h-[100vh] justify-center items-center">Please wait, page is loading.....</span>}><HomeLandingPage /></Suspense>} />
        <Route element={<ProtectedRoute />}>
          <Route path='/chat' element={<Suspense fallback={<span className="text-green-400 flex w-[100vw] h-[100vh] justify-center items-center">Please wait, page is loading.....</span>}><HomePage /></Suspense>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/chat-small-devices' element={<Suspense><ChatContainerForSmallDevices /></Suspense>} />
        </Route>
        <Route path='/signin' element={<Suspense fallback={<span className="text-green-400 flex w-[100vw] h-[100vh] justify-center items-center">Please wait, page is loading.....</span>}><SigninPage /></Suspense>} />
        <Route path='/signup' element={<Suspense fallback={<span className="text-green-400 flex w-[100vw] h-[100vh] justify-center items-center">Please wait, page is loading.....</span>}><SignUpPage /></Suspense>} />
        <Route path='/*' element={<Suspense fallback={<span className="text-green-400 flex w-[100vw] h-[100vh] justify-center items-center">Please wait, page is loading.....</span>}><ErrorPage /></Suspense>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;