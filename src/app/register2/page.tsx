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
    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const schema = z.object({
        phone_number: z
            .string()
            .min(10, { message: "Phone number must be atleast 10 digits long" })
            .refine((value) => /^\d{10,15}$/.test(value), {
                message: "Please enter a valid phone number",
            }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(20),
        password_confirmation: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(20),
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
                      type="number"
                      className="border-[1px] border-gray-300 h-[43px] w-full rounded-[5px] outline-none px-3 placeholder:text-sm"
                      name="phone_number"
                      {...register("phone_number")}
                      placeholder="Enter your Phone Number"
                  />
                  <p className="text-xs text-red-600 mt-1">
                      {errors.phone_number?.message}
                  </p>
              </div>

              <div className="flex flex-col w-full relative">
                  <div className="relative flex justify-end items-center h-fit">
                      <input
                          type={isVisible ? "text" : "password"}
                          className="border-[1px] border-[#979797] h-[43px] rounded-[5px] w-full outline-none px-3 placeholder:text-sm"
                          name="password"
                          placeholder='Enter your Password'
                          {...register("password")}
                      />
                      <div
                          className="absolute right-3"
                          onClick={() => setIsVisible(!isVisible)}
                      >
                          {isVisible ? (
                              <EyeIcon />
                          ) : (
                              <EyeOffIcon />
                          )}
                      </div>
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                      {errors.password?.message}
                  </p>
              </div>

              <div className="flex flex-col w-full">
                  <div className="relative flex justify-end items-center h-fit">
                      <input
                          type={isVisibleConfirm ? "text" : "password"}
                          className="border-[1px] border-[#979797] h-[43px] rounded-[5px] w-full outline-none px-3 placeholder:text-sm"
                          name="password_confirmation"
                          placeholder='Confirm Password'
                          {...register("password_confirmation")}
                      />
                      <div
                          className="absolute right-3"
                          onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}
                      >
                          {isVisibleConfirm ? (
                              <EyeIcon />
                          ) : (
                                  <EyeOffIcon />
                          )}
                      </div>
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                      {errors.password_confirmation?.message}
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

      </div>
  )
}

export default RegisterPage