import React from 'react'
import PricingCard from './PricingCard'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function Pricing() {
    let pricings = [
        {
            name: 'Let’s Try',
            description: 'Best for a quick preview — get one auto-generated file.',
            price: 69,
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
            price: 180,
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
            price: 300,
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


    return (
        <div className='pt-5 pb-12 mx-32' >
            <div className='text-center text-4xl font-semibold'>
                <p>Plans and Pricing</p>
            </div>
            <div className='py-10 flex gap-10'>
                {pricings.map((pricing) => {
                    return (
                        <PricingCard isPopular={pricing.isPopular} key={pricing.name} planName={pricing.name} pricing={pricing.price} info={pricing.description} benefits={pricing.benefits} />
                    )
                })}
            </div>
            <div className="max-w-5xl w-full mx-auto px-4 py-8">
                <h2 className="text-center text-4xl font-semibold text-gray-800 mb-10">Payment FAQs</h2>

                <div className="space-y-4">
                    {PricingFAQs.map((FAQ, index) => (
                        <div key={index} className="w-full">
                            <Accordion type="single" collapsible className="w-full border border-gray-200 rounded-lg shadow-sm">
                                <AccordionItem value={`item-${index}`}>
                                    <AccordionTrigger className="px-4 text-lg py-3 text-left w-full font-medium text-gray-700 hover:bg-gray-100 transition-all">
                                        {FAQ.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg break-words px-4 py-3 text-gray-600 bg-gray-50">
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