import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserList from './components/UserList'
import { Routes,Route } from 'react-router-dom'
import Login from './Page/Login'
import Transactions from './components/Transactions'

function App() {
  

  return (
  <>
  {/* <UserList/> */}
  <Routes>
    <Route path='/' element={<UserList/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/transactions' element={<Transactions/>}/>
  </Routes>
  </>
  )
}

export default App