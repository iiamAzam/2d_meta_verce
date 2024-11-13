import {Routes, Route} from 'react-router-dom'
import App from './App'
import { SignUpForm,SignInForm } from './pages/Signup_Signin'
import UserData from './pages/userData'
import Space from './pages/space'

function Routesprovider() {
  return (
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/signin' element={<SignInForm/>}/>
            <Route path='/user' element = {<UserData/>}/>
            <Route path='/space' element = {<Space/>}/>
          
          </Routes>
  )
}

export default  Routesprovider  
