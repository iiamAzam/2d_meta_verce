import React, { useState } from 'react';

interface AvatarProps {
  src: string;
}

const Avatars: React.FC<AvatarProps> = ({ src }) => {
   const [br,setbr]=useState('')
  const clickes=()=>{
        setbr('outline outline-1')
   }

  return (
    <div onClick={clickes} className={`hover:outline ${br} outline-1 rounded-full`}>
      <img className='w-20 h-20  object-cover rounded-full' src={src} alt="Avatar" />
    </div>
  );
};

export default Avatars;
