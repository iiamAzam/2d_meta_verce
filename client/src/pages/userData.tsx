import React, { useState } from 'react'
import Header from '../components/Header'
import Avatars from '../components/avatars'
import image1 from '../assets/6480593.jpg'
import avatar from '../assets/school/charecters/comming21.png'
import { useAuth } from '../httpconnection/Auth'
import { useSocket } from "../socket.connection/SocketContext";
const imagearr:string[]=[avatar]
function UserData() {
    const [nickname,setnickname]= useState('')
    const [animation , setanimation] = useState(false)
    const {setupnickname,token} = useAuth()
    const {socket} = useSocket()



    const onclicksave=async()=>{
            try {
                 setupnickname(nickname)
                 if (socket){
                    console.log(token);

                    socket.emit('initialdata',
                        {
                        type:'join',
                        spacId:"673cc60f106b0304b72b7ca5",
                        token:token,
                        nickname:nickname
                    }
                )
                 }
                   setanimation(true)

            }catch (error){
                console.error('Save failed:', error)
            }
    }

  return (
    <div className='mx-10 mt-5'>
        <div className='mb-10' >

        <Header size={'18px'}/>
            </div>
                <div className=''>
                    <div>
                        <img
                         src={image1}
                         className='w-[550px] float-end'

                        />

                    </div>
                    <h1 className='text-[25px] mb-2'>
                            Profile Setting
                    </h1>
                 <div className='text-[20px] mb-10'>
                 <label className=' mr-10 block mb-2'  htmlFor="name">Nickname </label>
                 <input type="text" id="name" value={nickname} onChange={(e)=>setnickname(e.target.value)}  className='border block rounded-md px-1 w-[400px] border-black' placeholder='Nickname' />

            </div>

            <div className='text-[20px] w-[450px] '>
                 <div className=''>
                    <h2 className='mb-3'>
                        Select the avatar
                    </h2>
                    <div className='bg-red-50 flex gap-5 p-5 flex-wrap  '>
                            {
                                imagearr.map((e,i)=>(
                                   <Avatars
                                   key={i}
                                   src={e}
                                   />
                                ))
                            }
                    </div>
                    <div>
                        <div onClick={onclicksave}  className='bg-blue-500 px-10 text-center cursor-pointer py-2 rounded-md mt-5 text-white'>
                          { animation ? "Saved :)": "Save" }
                        </div>
                    </div>
                 </div>
            </div>

        </div>

    </div>


  )
}

export default UserData
