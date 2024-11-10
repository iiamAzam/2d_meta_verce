import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

interface typejwt extends jwt.JwtPayload{
    _doc:{
           role: string
    }
}

const adminmiddleware = (req:Request,res:Response,next:NextFunction)=>{
            const token =  req.headers["authorization"]?.split(' ')[1]
       
            const secret_key="ok_this_working1234"
            if(!token){
                     return res.status(403).json({
                            status : false,
                            message: 'token not found'   
                     })  

            }
            const decode=jwt.verify(token,secret_key) as typejwt|null
            if (!decode){
              return res.status(403).json({
                     status:false,
                     message:'unauthorized'
              })
            }
            
            if (decode._doc.role!=='Admin'){
                return res.status(403).json({
                        message:"unauthorised"
                })
            }

            
            req.body={...req.body,decode}
            next()
}
export default adminmiddleware