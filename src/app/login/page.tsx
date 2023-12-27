"use client"

import LoginWithSocials from '@/components/LoginWithSocials'
import { Button } from '@/components/ui/button'
import { axiosInstance } from '@/lib/axiosConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from "zod"

type Props = {}

const LoginPage = (props: Props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const base = process.env.NEXT_PUBLIC_BASE_URL

    // console.log(base)

    const FormSchema = z.object({
        email: z.string().email({ message: "Please use a valid email" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .max(20),
    })


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(FormSchema) });


    const submitForm = async (data: z.infer<typeof FormSchema>) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/api/v1/User/Login', {
            headers: {
                'Content-Type': 'application/json',
        }
            });
            // const response = await fetch(`${base}/api/v1/User/Login`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Accept: "application/json",
            //     },
            //     body: JSON.stringify(data),
            // });
            console.log('API response:', response);
            router.push("/homepage")
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Unable to login")
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className='h-screen flex flex-col justify-center px-4'>
            <div className='relative w-full mb-10 flex items-center justify-center'>
                <Image src="/bluelogo.png" alt="blue logo" width={70} height={72} className='object-fill' />
            </div>

            <h2 className='text-[29px] font-bold text-bgGreen text-center'>Welcome Back</h2>


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

                <div className="flex flex-col w-full relative">
                    <div className="relative flex justify-end items-center h-fit">
                        <input
                            type={isVisible ? "text" : "password"}
                            className="border-[1px] border-[#979797] h-[43px] rounded-[5px] w-full outline-none px-3"
                            name="password"
                            placeholder='Enter your password'
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

                <div className='flex justify-between text-sm'>
                    <Link href="/reset">
                                Forgot Password?
                    </Link>
                    <Link href="/register1">
                                {`Don't have an account`}?
                    </Link>
                </div>

                <Button className='bg-bgGreen h-12 mb-6 disabled:bg-laGrey disabled:cursor-not-allowed' disabled={isLoading}>Login</Button>
            </form>


            <LoginWithSocials text="Login" />

        </div>
    )
}

export default LoginPage