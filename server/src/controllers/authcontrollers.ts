import {Request,Response} from 'express'
import userDb from '../schema/userschema'
import bcrypt from 'bcrypt'
import jwt , {SignOptions} from 'jsonwebtoken'

class Auth {

    async signUp(req:Request,res:Response){
        const {username,password,role}=req.body
        try{
        const exist:string|null = await userDb.findOne({username})
        if(exist){
            return res.status(400).json({
                    message:'user already exist'
            })
        }
        const haspassword=await bcrypt.hash(password , 12)
        const new_user = new userDb({
                username,
                password:haspassword,
                role
        })
        const userId= await new_user.save()
        return res.status(200).json({
            status:true,
            userId:userId
        })
    }catch(error){
            return res.status(400).json({
                    status : false,
                    message : error
            })
    }

    }

    async signIn(req:Request,res:Response){
        const {username, password} = req.body
            const check = await userDb.findOne({username})
            if(!check){
                return res.status(400).json({
                    status: false,
                    message: "user not exist"
                })
            }
        const  ispasswordvalid = await bcrypt.compare(password,check.password)
           if (!ispasswordvalid){
            return res.status(400).json({
                status : false ,
                message : 'username or password invalid '
            })
        }
        const secreat_key="ok_this_working1234"
        const option:SignOptions={expiresIn:'24h'}
        const token = jwt.sign({...check},secreat_key,option)
        return res.status(200).json({
                status:true,
                message:'userloged in successfully',
                token
        })
    }       
}


export const userAuthentication = new Auth()


























// import {Response,Request} from "express"
// import authDB from '../schema/userschema'
// import bcrypt from 'bcrypt'



// class Auth {
   
//    async authRegister(req:Request,res:Response){
//             console.log(req.body)
//             const {name,email,password} = req.body
//             const check= await authDB.findOne({$or:[{email}]})
//             if (check){
//                 return  res.status(400).json({
//                     status:false,
//                     message:'user already have account'
//                 })
//             }
//             const hash = await bcrypt.hash(password,12)
//             const newuser = new authDB ({
//                 name:name,
//                 email:email,
//                 password:hash
//             }
//             )
//             await newuser.save()
//             res.status(201).json({
//                 status:true,
//                 message:'newe user created '
//             })

//     }

//     async Login(req:Request,res:Response){
//                 const {email,password}=req.body
     
//            try { const check = await authDB.findOne({email})
//                 if(!check) {
//                         return res.status(401).json(
//                                 {status : false,
//                                 message :'user doesnt exist'
//                                   }  )
//                 }
//                 const ispassword = await bcrypt.compare(password, check.password)
//                 if(!ispassword){
//                     return res.status(400).json({
//                             status : false,
//                             message : 'email or password doesnt match '
//                     })
//                 }
//                 res.status(200).json({
//                     status : true,
//                     message:'login successfully'
//                 })}
//             catch (eror){
//                 res.status(400).json({
//                         status:true,
//                         message:'lgin error',
//                         error:eror
//                 })
//             }
        
                
//     }


// }


// export default  new Auth()