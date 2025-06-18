import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Navbar() {
    let navbarItems = [
        // {
        //     name: "Home",
        //     location: "/"
        // },
        {
            name: "Pricing",
            location: "/pricing"
        },  
        // {
        //     name : "Support"
        // }
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
            <div className='font-bold text-xl' >
                <Link to={"/"} >
                                    File Maker
                </Link>
            </div>
            <div className='flex gap-2' >
                {
                    navbarItems.map(
                        (item) => {
                            return (
                                <Button key={item.name} >
                                    <Link to={item.location}>
                                        {item.name}
                                    </Link>
                                </Button>
                            )
                        }
                    )
                }
                {
                    loginItems.map(
                        (item) => {
                            return (
                                <Button key={item.name}>
                                    <Link to={item.location}>
                                        {item.name}
                                    </Link>
                                </Button>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}
