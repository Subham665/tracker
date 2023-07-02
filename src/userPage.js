import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserData from './userData';

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const userData=[];

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('error is found', error);
      }
    }

    fetchUserData();
  }, [userId]);

  return (
    <>
    <div>
      <h1>User Page for User ID: {userId}</h1>
      <h1>user name: {user.name}</h1>
      <h2>user email:{user.email}</h2>
      
    </div>
    <div>
      <UserData id={userId} />
    </div>
    </>
    
  );
};

export default UserPage;
