import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage=()=>{
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [userId, setuserId]=useState('');
    const navigate=useNavigate();
    // useEffect(() => {
    //     if (userId !== null) {
    //       navigate(`/user/${userId}`);
    //     }
    //   }, [userId, navigate]);

    async function handleLogin(e){
        e.preventDefault();
        const LoginData={
            name,
            email,
        }
        const response=await axios.post('http://localhost:8080/login',LoginData);
        const newuserId=response.data.userId;
        console.log(newuserId);
        setuserId(newuserId);
        navigate(`/user/${newuserId}`);





    }
    return(
        <>
            <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
            </form>
        </>
    )
}
export default LoginPage;