import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Navbar() {

    const navigate = useNavigate()
    const handleLogout = () =>{
    localStorage.removeItem("accessToken");

    alert("You have been logged out successfully.");
        navigate("/login");  
      };
    

  return (
    <nav>
      
        <Link to='/'>user-list</Link>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;

        <Link to='/login'>Login</Link>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <Link to='/transactions'>Transactions</Link>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <Link to='/user'>User</Link>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <Link to='/acc'>Account</Link>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <Link to='/user-side'>UserSide</Link>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <button onClick={handleLogout}>logout</button>
    </nav>
  )
}

export default Navbar