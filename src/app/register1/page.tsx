"use client"

import LoginWithSocials from '@/components/LoginWithSocials'
import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/axiosConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
type Props = {}

const RegisterPage = (props: Props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const schema = z.object({
        fname: z
            .string()
            .min(3, { message: "First name must be at least 3 characters long" }),
        lname: z
            .string()
            .min(3, { message: "Last name must be at least 3 characters long" }),
        mname: z
            .string()
            .min(3, { message: "Middle name must be at least 3 characters long" }),
        email: z.string().email({ message: "Please use a valid email" }),
        phone_number: z
            .string()
            .min(10, { message: "Phone number must be atleast 10 digits long" })
            .refine((value) => /^\d{10,15}$/.test(value), {
                message: "Please enter a valid phone number",
            }),
    });

    const {
        register,
        handleSubmit,
        formState,
        watch,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });


    const submitForm = async (data: any) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/api/v1/User/Register1', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('API response:', response);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false)
        }
    }
  return (
      <div className='h-screen flex flex-col justify-center'>
          <div className='relative w-full mb-10 flex items-center justify-center'>
              <Image src="/bluelogo.png" alt="blue logo" width={70} height={72} className='object-fill' />
          </div>

          <h2 className='text-[29px] font-bold text-bgGreen text-center'>Register</h2>


          <form
              className="flex flex-col gap-5 mt-8"
              onSubmit={handleSubmit(submitForm)}
              noValidate
          >

              <div className="flex flex-col w-full">
                  <input
                      type="text"
                      className="border-[1px] border-gray-300 h-[43px] w-full rounded-[5px] outline-none px-3 placeholder:text-sm"
                      name="fname"
                      // value={userDetails.fname}
                      // onChange={handleInputChange}
                      {...register("fname")}
                      placeholder="First Name"
                  // defaultValue={"Abdullah Oyewale"}
                  />
                  <p className="text-xs text-red-600 mt-1">
                      {errors.fname?.message}
                  </p>
              </div>

              <div className="flex flex-col w-full">
                  <input
                      type="text"
                      className="border-[1px] border-gray-300 h-[43px] w-full rounded-[5px] outline-none px-3 placeholder:text-sm"
                      name="lname"
                      // value={userDetails.fname}
                      // onChange={handleInputChange}
                      {...register("lname")}
                      placeholder="Last Name"
                  // defaultValue={"Abdullah Oyewale"}
                  />
                  <p className="text-xs text-red-600 mt-1">
                      {errors.lname?.message}
                  </p>
              </div>

              <div className="flex flex-col w-full">
                  <input
                      type="text"
                      className="border-[1px] border-gray-300 h-[43px] w-full rounded-[5px] outline-none px-3 placeholder:text-sm"
                      name="mname"
                      // value={userDetails.fname}
                      // onChange={handleInputChange}
                      {...register("mname")}
                      placeholder="Middle Name"
                  // defaultValue={"Abdullah Oyewale"}
                  />
                  <p className="text-xs text-red-600 mt-1">
                      {errors.mname?.message}
                  </p>
              </div>


              <div className="flex flex-col w-full">
                  <input
                      type="email"
                      className="border-[1px] border-[#979797] h-[43px] rounded-[5px] w-full outline-none px-3 placeholder:text-sm"
                      name="email"
                      placeholder='Email'
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
                  <Link href="/reset">
                      Forgot Password?
                  </Link>
                  <Link href="/login">
                      Have an account?
                  </Link>
              </div>

              <Button className='bg-bgGreen h-12 mb-6 disabled:bg-laGrey disabled:cursor-not-allowed"'>Next</Button>
          </form>


          <LoginWithSocials text="Sign up" />

      </div>
  )
}

export default RegisterPage