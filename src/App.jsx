import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './components/UserList'
import { Routes,Route } from 'react-router-dom'
import Login from './Page/Login'
import Transactions from './components/Transactions'
import User from './components/User'
import Acc from './components/Acc'
import UserSide from './components/UserSide'

function App() {
  

  return (
  <>
  {/* <UserList/> */}
  <Routes>
    <Route path='/' element={<UserList/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/transactions' element={<Transactions/>}/>
    <Route path='/user' element={<User/>}/>
    <Route path='/acc' element={<Acc/>}/>
    <Route path='/user-side' element={<UserSide/>}/>
  </Routes>
  </>
  )
}

export default App
