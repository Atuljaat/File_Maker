import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link, NavLink } from 'react-router-dom'
import useMyStore from '@/store/myStore'
import { SignOutButton, useUser, UserButton } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";


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
            name: "Create",
            location: "/create" 
        },
        {
            name: "Guide",
            location: "/guide"
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

    let [isOpen, setisOpen] = useState(false)

    let toggleOpen = () => {
        console.log(isOpen)
        setisOpen(!isOpen)
    }

    const { darkmode, changeMode } = useMyStore()
    const { isSignedIn, user } = useUser()


    return (
        <>
            <div className={` ${darkmode ? 'dark' : ''} dark:bg-background z-50 lg:px-32 px-16 fixed w-full bg-background bg-opacity-50  py-3 top-0  lg:justify-around  flex justify-between items-center`} >
                <Link to={'/'} >
                    <div className={` text-black dark:text-white text-xl font-semibold `} >
                        FileWriter
                    </div>
                </Link>

                <div className='lg:hidden z-20 flex gap-5 items-center justify-center'>
                    {
                        isOpen && <MdClose onClick={toggleOpen} color={darkmode ? 'white' : 'black'} />
                    }
                    {
                        !isOpen && <GiHamburgerMenu onClick={toggleOpen} color={darkmode ? 'white' : 'black'} />
                    }
                </div>

                <div className='lg:flex gap-5 hidden ' >
                    {
                        navbarItems.map((item) => {
                            return (
                                <NavLink to={item.location} key={item.name} className={({ isActive }) => ` ${isActive ? 'text-black dark:text-white dark:hover:text-gray-500 ' : 'dark:text-gray-400 text-gray-700 dark:hover:text-gray-200'} text-lg font-medium hover:text-black  `} >
                                    {item.name}
                                </NavLink>
                            )
                        })
                    }
                </div>
                <div className='lg:flex gap-3 hidden items-center justify-center' >
                    {/* <Button onClick={changeMode} className={'cursor-pointer'} > {darkmode ? 'light' : 'dark'} </Button> */}
                    {
                        darkmode ? 
                        <CiLight onClick={changeMode} size={24} color={darkmode ? 'white' : ''} strokeWidth={1} /> :
                        <CiDark onClick={changeMode} size={24} color={darkmode ? 'white' : ''} strokeWidth={1} />  
                    }
                    {!isSignedIn &&
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
                    {

                        isSignedIn &&
                        <div className='px-2' >
                            <UserButton appearance={{
                                baseTheme: darkmode ? dark : ''
                            }} userProfileProps={{
                                appearance: {
                                    baseTheme: darkmode ? dark : undefined,
                                },
                            }} />
                        </div>
                    }
                </div>
            </div>
            {
                isOpen && (
                    <div className={`fixed ${darkmode ? 'dark' : ''} inset-0 z-40 dark:bg-background dark:text-white  flex flex-col justify-center items-center bg-white p-6 opacity-100`}>
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

                        <div className="mt-6 flex gap-6">
                            <Button onClick={changeMode} >
                                {darkmode ? 'dark' : 'light'}
                            </Button>
                            {
                            !isSignedIn ? 
                            loginItems.map((item) => (
                                <Link to={item.location} key={item.name}>
                                    <Button onClick={toggleOpen} className="px-5 py-2  rounded-lg shadow-md ">
                                        {item.name}
                                    </Button>
                                </Link>
                            )) :
                            <Button>
                                <SignOutButton/>    
                            </Button>
                        }


                        </div>

                    </div>
                )
            }

        </>
    )
}
