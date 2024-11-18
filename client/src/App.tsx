import React, { useEffect, useState } from 'react';
import { motion, useScroll, Variants, useMotionValue, AnimatePresence } from 'framer-motion';
import Button from './components/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/button';
import image  from  './assets/6617063.jpg'
import image1  from './assets/6591922.jpg'
import image2 from './assets/6651058.jpg'
import { useNavigate } from 'react-router-dom';
interface Feature {
  title: string;
  description: string;
}

const avatarStyle:string = "w-12 h-12 rounded-full border-4 border-gray-200";

const MetaverseLandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const navigate=useNavigate() as any;
  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      lightX.set(event.clientX);
      lightY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [lightX, lightY]);

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const featureVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const lightVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const features: Feature[] = [
    { title: 'Virtual Experiences', description: 'Immerse yourself in captivating digital worlds.' },
    { title: 'Social Interactions', description: 'Connect with others in real-time.' },
    { title: 'Endless Possibilities', description: 'Unlock the limitless potential of the metaverse.' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#c33764] to-[#1d2671] backdrop-blur-xl text-white overflow-hidden"

    style={{
      backgroundImage: 'radial-gradient(circle, #c33764, #1d2671)',
    }}
    >



    <AnimatePresence
      initial={false}
      mode="sync"
      onExitComplete={() => console.log('Animation completed')}>
      <motion.div
       className=" flex items-center   text-white text-center bg-[length:200%_200%]"
       initial="hidden  scale-10 "
       whileInView="visible scale-100"


      >
        <ul className='flex gap-10 mt-5 cursor-pointer px-10'>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </motion.div>

      </AnimatePresence>
      {/* Hero Section */}
      <motion.div
        className="h-screen flex  relative items-center flex-col justify-center text-white text-center bg-[length:200%_200%]"
        initial={{y:"-100vh"}}
        animate={{y:0}}
        transition={{type:"spring",stiffness:50,damping:20}}
      >

        <motion.div className='mx-4 mt-5 text-[10px] left-6  absolute'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}

        >
          <motion.img src={image} className='w-[150px] rounded-full'
            alt='animated imag'
            initial={{x:"-100vw"}}
            animate={{x:80,y:100}}
            transition={{type:"spring",stiffness:50,damping:20}}
          />
          <motion.img src={image1} className='w-[150px] rounded-full'
            alt='animated imag'
            initial={{x:"-100vw"}}
            animate={{x:80,y:170}}
            transition={{type:"spring",stiffness:50,damping:20}}
          />
           <motion.img src={image2} className='w-[150px] h-[150px] object-cover rounded-full'
            alt='animated imag'
            initial={{x:"100vw"}}
            animate={{x:800,y:-200}}

            transition={{type:"spring",stiffness:50,damping:20}}
          />
           <motion.img src={image} className='w-[150px] h-[150px] object-cover rounded-full'
            alt='animated imag'
            initial={{x:"100vw"}}
            animate={{x:800,y:-120}}

            transition={{type:"spring",stiffness:50,damping:20}}
          />

          </motion.div>



        <h1 className="text-5xl font-bold mb-4">Welcome to Metaverse</h1>
        <p className="text-xl mb-8">Explore the boundless possibilities of the digital realm.</p>
        <Button onClick={()=>navigate('/signin')} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-md">
          Join Now
        </Button>
      </motion.div>

      {/* Features Section */}
      <div className="py-12 bg-[#0D1117]/30 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 mx-10 md:grid-cols-3 gap-8 px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#161B22]/30 backdrop-blur-xl rounded-md p-6 shadow-md"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>



      {/* Call to Action Section */}
      <div className="py-12 bg-gradient-to-b from-[#161B22]/30 to-[#0D1117]/30 backdrop-blur-xl">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Join the Metaverse Revolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Experience the future of digital interaction. Sign up now and be a part of the Metaverse community.
            </p>
            <Button onClick={()=>navigate('/signup')} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-md">
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Mouse-following Light Effect */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 w-20 h-20 rounded-full"
        style={{
          x: lightX,
          y: lightY,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 80%)',
          opacity: 1,
          translateX: '-50%',
        translateY: '-50%',
        }}
      />
    </div>
  );
};

export default MetaverseLandingPage;
