import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'


function PricingCard({planName='nothing',info='no info',pricing=0,benefits=[] , isPopular = false , classes=""}) {
    return (
        <>
        <Card className={`${classes} dark:bg-neutral-900 w-full max-w-sm rounded-2xl ${isPopular ? 'border-yellow-400 dark:bg-neutral-700 dark:border-white bg-yellow-100 ':'border-gray-200 bg-white'} shadow-lg border  `}>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold py-1 text-gray-900 dark:text-white">{planName}</CardTitle>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400  ">
                    {info}
                </CardDescription>
            </CardHeader>

            <CardContent className="text-center space-y-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-white "> {pricing} </p>
            </CardContent>

            <div className="flex justify-center items-center">
                <Button className="w-4/5 mt-4 hover:cursor-pointer  text-sm font-semibold rounded-lg">
                    Get Started
                </Button>
            </div>

            <CardFooter className="pt-6 pb-2">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">What's included:</p>
            </CardFooter>

            <ul className="px-6 pb-6 space-y-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> {benefit}
                    </li>
                ))}
            </ul>
        </Card>
</>
    )
}

export default PricingCard