import React from 'react';
import {Routes , Route} from "react-router-dom";
import SignupPage from './signup';
import UserPage from './userPage';
import LoginPage from './login';


function App() {
  return (
    <div className="App">
      <Routes >

             <Route path="/" element={<SignupPage/>}></Route>
             <Route path="/login" element={<LoginPage></LoginPage>}></Route>
             <Route  path="/user/:userId" element={<UserPage></UserPage>} />
          
        {/* Other routes */}

          




      </Routes>
    </div>
  );
}

export default App;
