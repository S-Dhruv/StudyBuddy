import { Routes , Route } from "react-router-dom"
import {useAuthStore} from "../src/store/userAuthStore.js"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import SignUp from "../src/pages/SignUp.jsx"
import HomePage from "../src/pages/HomePage.jsx"
import Login from "../src/pages/Login.jsx"
import NavBar from "../src/shared/Navbar.jsx"
function App() {
  const {authUser , checkAuth  } = useAuthStore()
  useEffect(()=>{
    checkAuth()
  } , [checkAuth])
  console.log(authUser);
  return(
        <div>
          <NavBar/>
          <Routes>
            <Route path="/" element= { authUser ?<HomePage /> : <Navigate to="/login" />  } />
            <Route path="/home" element= { authUser ?<HomePage /> : <Navigate to="/login" />  } />
            <Route path="/signup" element= { !authUser ? <SignUp /> : <Navigate to="/"  />  } />
            <Route path="/login" element= { !authUser ? <Login /> :  <Navigate to="/" />  } />
          </Routes>
          <Toaster/>
        </div>
  )
}

export default App