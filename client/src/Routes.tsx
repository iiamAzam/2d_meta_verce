import {Routes, Route} from 'react-router-dom'
import App from './App'
import { SignUpForm,SignInForm } from './pages/Signup_Signin'
import UserData from './pages/userData'


function Routesprovider() {
  return (
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/signin' element={<SignInForm/>}/>
            <Route path='/user' element = {<UserData/>}/>
          
          </Routes>
  )
}

export default  Routesprovider  
