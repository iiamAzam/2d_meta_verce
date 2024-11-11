import React, { useState } from 'react'
import Header from '../components/Header'
import Avatars from '../components/avatars'
// hd4hT16SnNLbJICtGGEfYGLU5upU3a5D48v7dxSsUBth33rIkyclpvbx


const imagearr:string[]=[
    "https://images.pexels.com/photos/28890345/pexels-photo-28890345/free-photo-of-casual-portrait-of-woman-with-braided-hair.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    "https://images.pexels.com/photos/29257854/pexels-photo-29257854/free-photo-of-colorful-brick-facades-of-amsterdam.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    "https://images.pexels.com/photos/28871593/pexels-photo-28871593/free-photo-of-close-up-of-horses-walking-outdoors-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    "https://images.pexels.com/photos/29319083/pexels-photo-29319083/free-photo-of-skyline-view-of-downtown-nashville-street-scene.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    "https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    "https://images.pexels.com/photos/28988215/pexels-photo-28988215/free-photo-of-surfer-at-sunset-on-ipanema-beach-rio-de-janeiro.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    "https://images.pexels.com/photos/29101851/pexels-photo-29101851/free-photo-of-scenic-autumn-road-through-a-forest.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"


]





function UserData() {
    const [image,setimages] = useState(imagearr)
  return (
    <div className='mx-10 mt-5'>           
        <div className='mb-10' >
                      
        <Header/>
            </div>
                <div className=''>
                    <h1 className='text-[25px] mb-2'>
                            Profile Setting
                    </h1>
                 <div className='text-[20px] mb-10'>
                 <label className=' mr-10 block mb-2'  htmlFor="name">Nickname </label>
                 <input type="text" id="name"  className='border block rounded-md px-1 w-[400px] border-black' placeholder='Nickname' />
                 
            </div>
            
            <div className='text-[20px] w-[500px] '>
                 <div className=''>
                    <h2 className='mb-3'>
                        Select the avatar
                    </h2>
                    <div className='bg-red-50 flex gap-5 p-5 flex-wrap  '>
                            {
                                image.map((e,i)=>(
                                   <Avatars
                                   key={i}
                                   src={e}
                                   />
                                ))
                            }
                    </div>
                    <div>
                        <button className='bg-blue-500 px-10 py-2 rounded-md mt-5 text-white'>
                            Save
                        </button>
                    </div>
                 </div>
            </div>

        </div>
                
    </div>
      
        
  )
}

export default UserData