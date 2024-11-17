import {Routes, Route} from 'react-router-dom'
import App from './App'
import { SignUpForm,SignInForm } from './pages/Signup_Signin'
import UserData from './pages/userData'
import Space from './pages/space'
import MetaCanvas from './pages/metaCanvas'
import ProtectedRoute from './components/ProtectedRoute'

function Routesprovider() {
  return (
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/signup' element={<SignUpForm/>}/>
            <Route path='/signin' element={<SignInForm/>}/>
            <Route path='/user' element = {<ProtectedRoute><UserData/></ProtectedRoute>}/>
            <Route path='/space' element = {<ProtectedRoute><Space/></ProtectedRoute>}/>
            <Route path='/meta' element={<ProtectedRoute><MetaCanvas/></ProtectedRoute>}/>
          </Routes>
  )
}

export default  Routesprovider  
