import logo from "./logo.svg";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/auth";
import Password from "./pages/Password";

function App() {
  let login = (data) => {
    const { Email, UserId, Token } = data;
    if (data) {
      localStorage.setItem("token", "Bearer " + Token);
      localStorage.setItem("userId", UserId);
      localStorage.setItem("Email", Email);
    }
  };
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let localStorageId = localStorage.getItem("userId");
    setUserId(localStorageId);
  }, []);

  return (
    <AuthContext.Provider value={{ login, userId }}>
      <BrowserRouter>
        <Routes>
          {userId ? (
            <Route>
              <Route index path="/" Component={Dashboard}></Route>
            </Route>
          ) : (
            <>
              <Route path="/" Component={Login}></Route>
              <Route path="/Create" Component={Register}></Route>
              <Route path="/forgetpassword" Component={Password}></Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
