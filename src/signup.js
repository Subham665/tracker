import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



import axios from 'axios';

function SignupPage(){
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userId !== null) {
  //     navigate(`/login`);
  //   }
  // }, [userId, navigate]);



    async function handleSubmit(e) {
      e.preventDefault();
        const signupData = {
            name,
            email,
            password,
          };
          
          try {
            const response = await axios.post('http://localhost:8080/', signupData);
             console.log(response);
             const newUserid=response.data.id;
             setUserId(newUserid);
             navigate("/login")


          } catch (error) {
            console.error('Error signing up:', error);
          }
      
          console.log("submitted");
        }
  

  return (
    <div>
      <h1>Signup Page</h1>
      <form  onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" >Signup</button>
        <h1>{userId}</h1>
      </form>
    </div>
  );
}

export default SignupPage;
