import { Route, Routes } from "react-router-dom"
import SignIn from "../pages/SignIn/SignIn"
import Register from "../pages/SignIn/SignUp"

const LoginRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default LoginRoutes