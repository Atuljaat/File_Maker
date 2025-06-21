import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link, NavLink } from 'react-router-dom'
import useMyStore from '@/store/myStore'


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
        {
            name : "Create",
            location : "/create"
        },
        {
            name : "About",
            location : "/about"
        } , 
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

    let [isOpen, setisOpen] = useState(false)

    let toggleOpen = () => {
        console.log(isOpen)
        setisOpen(!isOpen)
    }

    const {darkmode , changeMode  } = useMyStore()

    return (
        <>
            <div className={` ${darkmode ? 'dark' : ''} dark:bg-background px-32 fixed w-full bg-background bg-opacity-50  py-3 top-0    flex justify-around items-center`} >
                <Link to={'/'} >
                <div className={` text-black dark:text-white text-xl font-semibold `} >
                    FileWriter
                </div>
                </Link>

                <div className='lg:hidden z-20' onClick={toggleOpen} >
                    {
                        isOpen && <img src="\close.svg" className='h-8 z-50' alt="" />
                    }
                    {
                        !isOpen && <img src="\menu.svg" className='h-8 z-50' alt="" />
                    }
                    
                </div>

                <div className='lg:flex gap-5 hidden ' >
                    {
                        navbarItems.map((item) => {
                            return (
                                <NavLink to={item.location} key={item.name} className={({isActive})=>` ${isActive ? 'text-black dark:text-white dark:hover:text-gray-500 ' : 'dark:text-gray-400 text-gray-700 dark:hover:text-gray-200'} text-lg font-medium hover:text-black  `} >
                                    {item.name}
                                </NavLink>
                            )
                        })
                    }
                </div>
                <div className='lg:flex gap-3 hidden' >
                    <Button onClick={changeMode} > {darkmode ? 'light' : 'dark'} </Button>
                    {
                        loginItems.map((item) => {
                            return (
                                <Link to={item.location} key={item.name}  >
                                    <Button className={'cursor-pointer'} >
                                        {item.name}
                                    </Button>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            {
                isOpen && (
                    <div className="fixed inset-0 z-10 bg-white flex flex-col justify-center items-center p-6 opacity-100">
                        <div className="flex flex-col gap-6 text-center">
                            {navbarItems.map((item) => (
                                <NavLink
                                    to={item.location}
                                    key={item.name}
                                    onClick={toggleOpen}
                                    className=" text-2xl font-semibold "
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>

                        <div className="mt-12 flex gap-6">
                            {loginItems.map((item) => (
                                <Link to={item.location} key={item.name}>
                                    <Button onClick={toggleOpen} className="px-5 py-2  rounded-lg shadow-md ">
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }

        </>
    )
}
