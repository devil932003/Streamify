import React from 'react'
import {Navigate, Route, Routes} from 'react-router'
import HomePage from './pages/HomePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import CallPage from './pages/CallPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import toast,{Toaster} from 'react-hot-toast'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { axiosInstance } from './lib/axios.js'

const App = () => {

const {data:authData,isLoading,error} = useQuery({
  queryKey:['authUser'], 
  queryFn: async () => {
  const response = await axiosInstance.get('/auth/me')
  return response.data},
});
const authuser = authData?.user

  return (
    <div className=' h-screen' data-theme="coffee">
      <Routes>
        <Route path="/" element={authuser ? <HomePage /> : <Navigate to="/login" /> } />
        <Route path="/signup" element={!authuser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authuser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={authuser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authuser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authuser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authuser ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App