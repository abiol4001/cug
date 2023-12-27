import { Apple, Facebook } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const LoginWithSocials = (props: Props) => {
  return (
    <div>

          <div className="flex items-center w-full gap-2 my-[22px]">
              <hr className="w-full h-[1px]" />
              <p className="flex-shrink-0 text-xs text-[#6A707C]">
                  Or Login with
              </p>
              <hr className="w-full h-[1px]" />
          </div>

          <div className='flex justify-between gap-4'>
                <div className='border border-[#E8ECF4] rounded-md w-full h-[55px] relative flex justify-center items-center' >
                  <Image src="/fb.svg" width={12} height={12} alt="" className='object-contain' />
                </div>
                <div className='border border-[#E8ECF4] rounded-md w-full h-[55px] relative flex justify-center items-center'>
                 <Image src="/google.svg" width={25} height={25} alt="" />
                </div>
                <div className='border border-[#E8ECF4] rounded-md w-full h-[55px] relative flex justify-center items-center'>
                  <Image src="/apple.svg" width={25} height={25} alt="" />
                </div>
          </div>

    </div>
  )
}

export default LoginWithSocials