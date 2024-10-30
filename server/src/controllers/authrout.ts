import {Response,Request} from "express"
import authDB from '../schema/userschema'
import bcrypt from 'bcrypt'



class Auth {
   
   async authRegister(req:Request,res:Response){
            console.log(req.body)
            const {name,email,password} = req.body
            const check= await authDB.findOne({$or:[{email}]})
            if (check){
                return  res.status(400).json({
                    status:false,
                    message:'user already have account'
                })
            }
            const hash = await bcrypt.hash(password,12)
            const newuser = new authDB ({
                name:name,
                email:email,
                password:hash
            }
            )
            await newuser.save()
            res.status(201).json({
                status:true,
                message:'newe user created '
            })

    }

    async Login(req:Request,res:Response){
                const {email,password}=req.body
     
           try { const check = await authDB.findOne({email})
                if(!check) {
                        return res.status(401).json(
                                {status : false,
                                message :'user doesnt exist'
                                  }  )
                }
                const ispassword = await bcrypt.compare(password, check.password)
                if(!ispassword){
                    return res.status(400).json({
                            status : false,
                            message : 'email or password doesnt match '
                    })
                }
                res.status(200).json({
                    status : true,
                    message:'login successfully'
                })}
            catch (eror){
                res.status(500).json({
                        status:true,
                        message:'lgin error',
                        error:eror
                })
            }
        
                
    }


}


export default  new Auth()