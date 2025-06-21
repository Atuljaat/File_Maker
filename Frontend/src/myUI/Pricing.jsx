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
            name: 'Let’s Try',
            description: 'Best for a quick preview — get one auto-generated file.',
            price: "0",
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
            price: "0",
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
            price: "0",
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
            answer: "This is a one-time payment. You only pay once for the selected plan."
        },
        {
            question: "What payment methods do you accept ?",
            answer: "We accept UPI, Paytm, Google Pay, PhonePe, and most other payment methods ."
        },
        {
            question: "Can I download the file again later ?",
            answer: "You will be able to download the file once. If you face any issues, you can contact us for help."
        },
        {
            question: "What if the payment is successful but I don’t get the file?",
            answer: "Don't worry — just reach out to us with your payment ID, and we’ll make sure you get your file."
        },
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
                                    <AccordionTrigger className="px-4 text-lg py-3 text-left w-full font-medium dark:text-gray-400 text-gray-700 hover:bg-gray-100 dark:hover:text-gray-200 transition-all dark:hover:bg-background">
                                        {FAQ.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg break-words px-4 py-3 text-gray-600 dark:text-gray-400 dark:bg-background bg-gray-50">
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