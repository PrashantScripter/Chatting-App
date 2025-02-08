import React, { lazy, Suspense } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import { useSelector } from 'react-redux';
const UserWelcomePage = lazy(() => import('./UserWelcomePage'));

const HomePage = () => {

  const { selectedUser } = useSelector((store) => store.selectedUser);

  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      {selectedUser
        ?
        <Suspense>
          <ChatContainer />
        </Suspense>
        :
        <Suspense>
          <UserWelcomePage />
        </Suspense>
      }
    </div>
  )
}

export default HomePage