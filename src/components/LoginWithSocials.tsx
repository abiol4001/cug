import { Apple, Facebook } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
  text: string
}

const LoginWithSocials = ({text}: Props) => {
  return (
    <div className=''>

          <div className="flex items-center w-full gap-2 my-[22px]">
              <hr className="w-full h-[1px]" />
              <p className="flex-shrink-0 text-xs text-[#6A707C]">
                  Or {text} with
              </p>
              <hr className="w-full h-[1px]" />
          </div>

          <div className='flex justify-between gap-4'>
                <div className='border border-[#E8ECF4] rounded-md w-full h-[55px] relative flex justify-center items-center cursor-pointer group' >
          <Image src="/fb.svg" width={12} height={12} alt="" className='object-contain group-hover:scale-110 transition' />
                </div>
                <div className='border border-[#E8ECF4] rounded-md w-full h-[55px] relative flex justify-center items-center cursor-pointer group'>
          <Image src="/google.svg" width={25} height={25} alt="" className='group-hover:scale-110 transition' />
                </div>
                <div className='border border-[#E8ECF4] rounded-md w-full h-[55px] relative flex transition justify-center items-center cursor-pointer group'>
          <Image src="/apple.svg" width={25} height={25} alt="" className='group-hover:scale-110 transition' />
                </div>
          </div>

    </div>
  )
}

export default LoginWithSocials