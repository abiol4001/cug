"use client"
import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/axiosConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

type Props = {}

const ResetPage = (props: Props) => {

    const [isLoading, setIsLoading] = useState(false)

    const FormSchema = z.object({
        email: z.string().email({ message: "Please use a valid email" }),
    })


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(FormSchema) });


    const submitForm = async (data: z.infer<typeof FormSchema>) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/api/v1/User/Reset', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('API response:', response);
        } catch (error:any) {
            console.error("Reset error:", error);
            toast.error("Unable to process your request")
        } finally {
            setIsLoading(false)
        }
    }
  return (
      <div className='h-screen flex flex-col justify-center px-4'>
          <div className='relative w-full mb-10 flex items-center justify-center'>
              <Image src="/bluelogo.png" alt="blue logo" width={70} height={72} className='object-fill' />
          </div>

          <h2 className='text-[29px] font-bold text-bgGreen text-center'>Reset Password</h2>


          <form
              className="flex flex-col gap-5 mt-8"
              onSubmit={handleSubmit(submitForm)}
              noValidate
          >


              <div className="flex flex-col w-full">
                  <input
                      type="email"
                      className="border-[1px] border-[#979797] h-[43px] rounded-[5px] w-full outline-none px-3"
                      name="email"
                      placeholder='Enter your email'
                      {...register("email", {
                          pattern: {
                              value:
                                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                              message: "Invalid email format",
                          },
                      })}
                  />
                  <p className="text-xs text-red-600 mt-1">
                      {errors.email?.message}
                  </p>
              </div>

              <div className='flex justify-between text-sm'>
                  {/* <Link href="/reset">
                      Forgot Password?
                  </Link> */}
                  <Link href="/login">
                      {`Have an account`}?
                  </Link>
              </div>

              <Button className='bg-bgGreen h-12 mb-6 disabled:bg-laGrey disabled:cursor-not-allowed' disabled={isLoading}>Reset</Button>
          </form>

      </div>
  )
}

export default ResetPage