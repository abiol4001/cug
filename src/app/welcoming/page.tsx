import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const WelcomePage = (props: Props) => {
    return (
        <div className='w-full h-screen p-4'>



            <div className='w-full h-[50%] flex flex-col relative'>
                <Image src="" alt='' fill />
            </div>
            <div>
                <div className='relative w-full mb-10 flex items-center justify-center'>
                    <Image src="/bluelogo.png" alt="blue logo" width={70} height={72} className='object-fill' />
                </div>


                {/* Login and Register button */}
                <div className='flex flex-col gap-y-5'>
                    <Link href="/login">
                        <Button className='w-full bg-bgGreen h-12'>
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="outline" className='w-full bg-white h-12 text-black'>
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage