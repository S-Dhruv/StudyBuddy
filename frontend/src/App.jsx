// import Login from './auth/Login'
// import Signup from './auth/Signup'
// import Home from './ui/Home';



// import { createBrowserRouter, RouterProvider} from 'react-router-dom';



// const appRouter = createBrowserRouter([
//   {
//     path:'/',
//     element:<Signup/>
//   },
//   {
//     path:'/login',
//     element:<Login/>
//   },
  
 
// ])

// function App() {
 

//   return (
//     <div>
       
//        <RouterProvider router={appRouter}/> 

//     </div>
//   )
// }

// export default App


import { Routes , Route } from "react-router-dom"
// import NavBar from "./components/NavBar"
import Signup from "./auth/Signup"
import Home from './ui/Home'
import Login from "./auth/Login"
// import ProfilePage from "./pages/ProfilePage"
// import SettingsPage from "./pages/SettingsPage"
import {useAuthStore} from '../src/store/userAuth.js'
import { useEffect } from "react"
import {Loader} from "lucide-react"
import { Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast";

function App() {
  const {authUser , checkAuth , isCheckingAuth ,onlineUsers } = useAuthStore()
  
  console.log("Online Users: " ,onlineUsers);
  useEffect(()=>{
    checkAuth()
  } , [checkAuth])
  console.log(authUser);
  if(isCheckingAuth && !authUser ){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return(
        <div data-theme={theme}>
          <NavBar />
          <Routes>
            <Route path="/" element= { authUser ?<Home /> : <Navigate to="/signup" />  } />
            <Route path="/signup" element= { !authUser ? <Signup /> : <Navigate to="/"  />  } />
            <Route path="/login" element= { !authUser ? <Login /> :  <Navigate to="/" />  } />
            {/* <Route path="/settings" element= {<SettingsPage />} />
            <Route path="/profile" element= { authUser ? <ProfilePage /> : <Navigate to="/login"/> }/>  */}
          </Routes>
          <Toaster/>
        </div>
  )
}

export default App