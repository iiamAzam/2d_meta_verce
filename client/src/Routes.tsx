import {Routes, Route} from 'react-router-dom'
import App from './App'
import { SignUpForm,SignInForm } from './pages/Signup_Signin'
import UserData from './pages/userData'
import Space from './pages/space'
import MetaCanvas from './pages/metaCanvas'

function Routesprovider() {
  return (
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/signin' element={<SignInForm/>}/>
            <Route path='/user' element = {<UserData/>}/>
            <Route path='/space' element = {<Space/>}/>
            <Route path='/meta' element={<MetaCanvas/>}/>
          </Routes>
  )
}

export default  Routesprovider  
