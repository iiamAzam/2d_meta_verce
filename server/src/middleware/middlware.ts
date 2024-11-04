import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const middlewawre = (req:Request,res:Response,next:NextFunction)=>{
            const token =  req.cookies.token||req.body.token
            const secret_key="ok_this_working1234"
            if(!token){
                     return res.status(403).json({
                            status : false,
                            message: 'token not found'   
                     })  

            }
            const decode=jwt.verify(token,secret_key)
            if (!decode){
              return res.status(403).json({
                     status:false,
                     message:'unauthorized'
              })
            }

            
            req.body={...req.body,token:decode}
            next()
}

export default middlewawre