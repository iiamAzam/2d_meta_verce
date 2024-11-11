import {Routes, Route} from 'react-router-dom'
import App from './App'
import { SignUpForm } from './pages/Signup_Signin'

function Routesprovider() {
  return (
          <Routes>
            <Route path='/' element={<App/>}>
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/signin' element={<SignUpForm/>}/>
            </Route>
          </Routes>
  )
}

export default  Routesprovider  
