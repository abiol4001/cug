"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push("/welcoming");
    }, 2000);
  })

  return (
    <div className='w-full h-[100vh] flex justify-center items-center bg-bgGreen'>
      <div className='w-[190px] h-[130px] relative '>
        <Image src="/suglogo.png" alt="" className='transition-all animate-pulse' fill />
      </div>
    </div>
  )
}
