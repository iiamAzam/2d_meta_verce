import React from 'react'


type maps={
        pic:string,
        name:string
}


const imagearr:maps[]=[
   { pic:"https://images.pexels.com/photos/28890345/pexels-photo-28890345/free-photo-of-casual-portrait-of-woman-with-braided-hair.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name:'village'
   },

   { pic:"https://images.pexels.com/photos/29257854/pexels-photo-29257854/free-photo-of-colorful-brick-facades-of-amsterdam.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name:'classroom'
   },
    {pic:"https://images.pexels.com/photos/28871593/pexels-photo-28871593/free-photo-of-close-up-of-horses-walking-outdoors-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name:'party'
    },
  {  pic:"https://images.pexels.com/photos/29319083/pexels-photo-29319083/free-photo-of-skyline-view-of-downtown-nashville-street-scene.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name:'office meeting room'
  },
  { pic: "https://images.pexels.com/photos/29139391/pexels-photo-29139391/free-photo-of-dome-of-palacio-de-bellas-artes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name :'bookhall'
  },
   { pic: "https://images.pexels.com/photos/28988215/pexels-photo-28988215/free-photo-of-surfer-at-sunset-on-ipanema-beach-rio-de-janeiro.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name :"interviewroom"
   },
   { pic:"https://images.pexels.com/photos/29101851/pexels-photo-29101851/free-photo-of-scenic-autumn-road-through-a-forest.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name : "party1"
   },
   { pic:"https://images.pexels.com/photos/29101851/pexels-photo-29101851/free-photo-of-scenic-autumn-road-through-a-forest.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
    name : "party1"
   }


]

const Space:React.FC=()=> {

  return (
    <div className='bg-gradient-to-b from-[#c33764]  p-10 to-[#1d2671]'>
      <div className='mb-2 mt-2 flex justify-between text-white mx-2'>
        <h2 className='bg-green-500 p-1  cursor-pointer rounded-md px-1'>Select Map</h2>
        <h2 className='bg-green-500 p-1 cursor-pointer rounded-md px-1' >Start With an Empty Map</h2>
     </div>
             
        <div className=' grid grid-cols-4 text-white w-full '>
        {
            

            imagearr.map((e,i)=>(
                <div key={i} className='m-2  ' >
                    <img className='w-[400px] h-[200px] rounded-md object-cover' src={e.pic} alt={e.name} />
                    <p className='text-center'>
                        {e.name}
                    </p>
                </div>
            ))


        }
        </div>

    </div>
  )
}

export default Space