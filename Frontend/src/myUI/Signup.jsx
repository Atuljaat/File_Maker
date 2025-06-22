import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { SignUp } from '@clerk/clerk-react'
import useMyStore from '@/store/myStore'
import { dark } from '@clerk/themes'

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onSubmit(data) {
        if (data.password != data.confirmPassword) {
            toast("Check your password", {
                description: "both password doesnt match",
                descriptionClassName : "text-white",
                style: {
                    background: "red",
                    color: "white"
                }
            });
            return;
        }
        console.log(data)
    }

    const { darkmode } = useMyStore()


    return (
        <div className={`${darkmode ? 'dark' : ''} dark:bg-background  min-h-screen flex justify-center items-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8`}>
            {/* <div className="w-full max-w-md space-y-6 p-8 bg-white border border-gray-200 rounded-2xl shadow-md">
                <div className="text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Sign up</h2>
                    <p className="text-sm text-gray-600 mt-1">Enter email and password below</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="Username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="Username"
                            type="text"
                            {...register("username", {
                                required: "Username is required"
                            })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Tyler Durlin"
                        />
                        {errors.username && (
  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
)}

                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
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
                        {errors.password && (
  <p className="text-sm text-red-500 mt-1">{errors.username.password}</p>
)}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required"
                            })}
                            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && (
  <p className="text-sm text-red-500 mt-1">{errors.username.confirmPassword}</p>
)}
                    </div>

                    <div>
                        <Button className="w-full">Submit</Button>
                    </div>
                </form>
            </div> */}
            <SignUp  appearance={{baseTheme : darkmode ? dark : ''}} />
        </div>
    )
}

export default Signup