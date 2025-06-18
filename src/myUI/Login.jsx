import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

function Login() {
    // let Emailpattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmit(data) {
        console.log(data)
    }


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6 p-8 bg-white border border-gray-200 rounded-2xl shadow-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Login to your account</h2>
                    <p className="text-sm text-gray-600 mt-1">Enter your email and password below</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                        {errors.email &&
                            <div className='text-red-500 text-sm mt-1' >
                                {errors.email.message}
                            </div>
                        }
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                        {errors.password &&
                            <div className='text-red-500 text-sm mt-1' >
                                {errors.email.password}
                            </div>
                        }
                    </div>

                    <div>
                        <Button className="w-full">Submit</Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login