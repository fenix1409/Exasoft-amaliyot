import { Route, Routes } from "react-router-dom"
import SignIn from "../pages/SignIn/SignIn"
import Register from "../pages/SignIn/SignUp"
import Dashboard from "../pages/Dashboard/Dashboard"

const LoginRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default LoginRoutes