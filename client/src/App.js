import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes,Navigate } from "react-router-dom"; 
  
import HomePage from './container/Page/HomePage/HomePage';
import UserPage from './container/Page/UserPage/UserPage'; 
import Login from 'container/Page/LoginPage/LoginPage';
import ChatBoxPage from 'container/Page/ChatBoxPage/ChatBoxPage'; 
import Setting from 'container/Page/Setting/Setting';

function App() {    
  const data = JSON.parse(localStorage.getItem("token")); 
  const isAuth = Boolean(useSelector((state) => state.auth.authData));
    return (
    <> 
      <Data.Provider value={data}>
        { 
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to = "home" /> : <Login />}/>
            <Route path="/home"  element={data ? <HomePage /> : <Navigate to = "/" />}/>  
            <Route path="/user/setting"  exact  element={<Setting />}/>
            <Route path="/user/:id" exact element={<UserPage />}/>
            <Route path="/chatBox" exact element={<ChatBoxPage />}/> 
            <Route path="*" exact element={<Navigate to="/"/>} />
          </Routes> 
        } 
      </Data.Provider>
    </>
  );
}

export default App;
export const Data = createContext();