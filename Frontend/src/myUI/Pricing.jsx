import React from 'react'
import PricingCard from './PricingCard'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import useMyStore from '@/store/myStore'

function Pricing() {
    let pricings = [
        {
            name: "Let's Try",
            description: 'Best for a quick preview — get one auto-generated file.',
            price: "FREE",
            benefits: [
                'One automatically generated file',
                'Basic support',
                'Clean formatting',
                'Delivered within 24 hours'
            ],
            isPopular: false
        },
        {
            name: 'Get Serious',
            description: 'Get three files generated from your selected questions.',
            price: "FREE",
            benefits: [
                'Three auto-generated files',
                'Standard support via Email',
                'Includes front page & index',
                'Delivered within 12 hours'
            ],
            isPopular: true
        },
        {
            name: 'Do Everything',
            description: 'Need multiple files? This gives you 5 full files with everything included.',
            price: "FREE",
            benefits: [
                'Five auto-generated files',
                'Priority support',
                'Formatted with cover, index, and question references',
                'Delivered within 6 hours'
            ],
            isPopular: false
        }
    ];

    let PricingFAQs = [
        {
            question: "Is this a one-time payment or a subscription ?",
            answer: "Its a completely free service. You can use it as many times as you want without any charges."
        },
        {
            question: "What payment methods do you accept ?",
            answer: "We accept your feedback and suggestions as payment."
        },
        {
            question: "Can I download the file again later ?",
            answer: "You will be able to download the file once. If you face any issues, you can contact us for help."
        },
        {
            question : "If its free then why you have pricing page ?",
            answer : " I just wanted to create a pricing page to make it look good. "
        }
    ]

    const {darkmode} = useMyStore()

    return (
        <div className={`${darkmode ? 'dark' : ''} bg-background dark:bg-background pt-20 pb-12 px-10 lg:px-32`} >
            <div className='text-center text-4xl font-semibold dark:text-white text-black py-3 '>
                <p>Plans and Pricing</p>
            </div>
            
            <div className='py-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-4 lg:grid-cols-3 justify-items-center '>
                
                {pricings.map((pricing) => {
                    return (
                        
                        <PricingCard isPopular={pricing.isPopular} key={pricing.name} planName={pricing.name} pricing={pricing.price} info={pricing.description} benefits={pricing.benefits} />
                    )
                })}
            </div>
            <div className="max-w-5xl w-full mx-auto px-4 py-8">
                <h2 className="text-center text-4xl font-semibold text-gray-800 mb-10 dark:text-white ">Payment FAQs</h2>

                <div className="space-y-4">
                    {PricingFAQs.map((FAQ, index) => (
                        <div key={index} className="w-full">
                            <Accordion type="single" collapsible className="w-full border border-gray-200 rounded-lg shadow-sm">
                                <AccordionItem value={`item-${index}`}>
                                    <AccordionTrigger className="px-4 lg:text-lg text-md  py-3 text-left w-full font-medium dark:text-gray-400 text-gray-700 hover:bg-gray-100 dark:hover:text-gray-200 transition-all dark:hover:bg-background">
                                        {FAQ.question}
                                    </AccordionTrigger>
                                    <AccordionContent className=" lg:text-lg text-md break-words px-4 py-3 text-gray-600 dark:text-gray-400 dark:bg-background bg-gray-50">
                                        {FAQ.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pricing