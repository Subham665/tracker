import { useState,useEffect } from "react";
import axios from "axios";
const UserData=(props)=>{
    const {id}=props;
    const [userData, setUserData] = useState([]);


    const [discription, setDiscription]=useState([]);
    const [expenses,setExpenses]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/user/data/${id}`);
            setUserData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchData();
      }, [id]);
    
    async function handleClick(e){
        e.preventDefault();
        console.log("clicked")
        const userData={
            id:id,
            data:{
                discription:discription,
                expenses:expenses,
            }
        }
        try{
            const response=await axios.post('http://localhost:8080/user/data',userData)
            console.log("data is saved")
            console.log(response);
        }catch (error) {
            console.error('Error signing up:', error);
          }
        

    }
    return (
        <>
        <div>
      <h2>User Data</h2>
      <ul>
        {userData.map((dataEntry, index) => (
          <li key={index}>
            <p>Description: {dataEntry.discription}</p>
            <p>Expense: {dataEntry.expense}</p>
          </li>
        ))}
      </ul>
    </div>

        <div>
            <form onSubmit={handleClick}>
            <input
          type="text"
          name="discription"
          placeholder="discription"
          onChange={(e)=>setDiscription(e.target.value)}
          required
        />
        <input
          type="number"
          name="expenses"
          placeholder="expenses"
          onChange={(e)=>setExpenses(e.target.value)}
          required
        />
                
                <button type="submit">add data</button>
            </form>
        </div>
        </>
    )
}
export default UserData;