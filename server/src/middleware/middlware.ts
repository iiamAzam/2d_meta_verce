import {Request,Response,NextFunction} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface typejwt extends JwtPayload{
       _doc:{
              role: string
       }


}
const middlewawre = (req:Request,res:Response,next:NextFunction)=>{
            const token =  req.headers['authorization']?.split(' ')[1]
            console.log(token)
            const secret_key="ok_this_working1234"
            if(!token){
                     return res.status(403).json({
                            status : false,
                            message: 'token not found'   
                     })  

            }
            const decode=jwt.verify(token,secret_key) as typejwt | null
            if (!decode){
              return res.status(401).json({
                     status:false,
                     message:'unauthorized'
              })
            }
            console.log(decode._doc.role)
            if (decode._doc.role!=='User'){
              return res.status(401).json({
                     message:'unauthorised'
              })
            }
            req.body={...req.body,token:decode}
            next()
}

export default middlewawre