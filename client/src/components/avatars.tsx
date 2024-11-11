import React from 'react';

interface AvatarProps {
  src: string;
}

const Avatars: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div className='hover:outline outline-1 rounded-full'>
      <img className='w-20 h-20  object-cover rounded-full' src={src} alt="Avatar" />
    </div>
  );
};

export default Avatars;
