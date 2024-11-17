import React from 'react'
import { Navigate } from 'react-router-dom'

import  {useAuth} from '../httpconnection/Auth'

interface Props{
    children:JSX.Element
}



const  ProtectedRoute:React.FC<Props>=({children}) =>{
            const {isauthenticated} = useAuth()
        if(!isauthenticated){
            return <Navigate to='/signin'/>
        }
        return children
        }

export default ProtectedRoute