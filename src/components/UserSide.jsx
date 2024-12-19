import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './UserProfile.css';  // Assuming you have a separate CSS file for styling

function UserProfile() {
  const [users, setUsers] = useState([]);  // Store multiple users
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);  // Store multiple user data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // If data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      {users.length === 0 ? (
        <p>No users found.</p>  // Display message if no users are available
      ) : (
        users.map((user) => (
          <div key={user.id} className="user-section">
            {/* Left Section for Not Verified Users */}
            {!user.is_verified && (
              <div className="section left-section">
                <h2>Your account is not verified yet!</h2>
                <p>Please check your email for the verification link.</p>
                <p>Email: {user.email}</p>
              </div>
            )}

            {/* Right Section for Verified Users */}
            {user.is_verified && (
              <div className="section right-section">
                <h2>Welcome, {user.first_name} {user.last_name}</h2>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
                <p>Your account is verified!</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserProfile;
