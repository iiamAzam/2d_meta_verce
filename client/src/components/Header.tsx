import React from 'react'
interface textSize{
    size:string
}

const Header:React.FC<textSize> = ({size:textSize})=> {
  return (
    <div className={`flex  text-[${textSize}]  gap-5`}>
                <h1>
                    Metaverce
                </h1>
                <ul className='flex gap-5  cursor-pointer'>
                    <li className=''>
                        Home
                    </li>
                    <li>
                        About
                    </li>
                    <li>
                        Contact
                    </li>
                </ul>
                <div className=' ml-auto bg-blue-500 px-2 py-1 text-white rounded-lg'>
                    <button >
                        Creat space
                    </button>
                </div>

    </div>
  )
}

export default Header