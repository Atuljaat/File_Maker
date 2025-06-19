import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    let navbarItems = [
        {
            name: "Home",
            location: "/"
        },
        {
            name: "Pricing",
            location: "/pricing"
        },
    ]

    let loginItems = [
        {
            name: "Login",
            location: "/login"
        },
        {
            name: "Sign up",
            location: "/signup"
        }
    ]


    return (
        <div className='p-5 flex justify-around items-center'>

            <div className='font-bold text-xl'>
                <Link to={"/"}>
                    File Maker
                </Link>
            </div>
            <div className='flex gap-5 justify-center items-center'>
                {
                    navbarItems.map((item) => (
                        <NavLink
                            to={item.location}
                            key={item.name}
                            className={({ isActive }) =>
                                `${isActive ? 'text-black ' : 'text-gray-700'} font-semibold  transition-all duration-100 hover:text-black hover:cursor-pointer`
                            }>
                            {item.name}
                        </NavLink>
                    ))
                }
            </div>
            <div className='flex gap-2 justify-end items-center'>
                {
                    loginItems.map((item) => (
                        <Button key={item.name}>
                            <Link to={item.location}>
                                {item.name}
                            </Link>
                        </Button>
                    ))
                }
            </div>

        </div>

    )
}
