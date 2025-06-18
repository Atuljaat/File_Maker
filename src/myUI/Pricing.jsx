import React from 'react'
import PricingCard from './PricingCard'

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
            ]
        },
        {
            name: 'Get Serious',
            description: 'Get three files generated from your selected questions.',
            price: 180,
            benefits: [
                'Three auto-generated files',
                'Standard support via WhatsApp/email',
                'Includes front page & index',
                'Delivered within 12 hours'
            ]
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
            ]
        }
    ];





    return (
        <div className='pt-5 pb-12 mx-32' >
            <div className='text-center text-4xl font-semibold'>
                <p>Plans and Pricing</p>
            </div>
            <div className='py-10 flex gap-10'>
                {pricings.map((pricing) => {
                    return (
                        <PricingCard key={pricing.name} planName={pricing.name} pricing={pricing.price} info={pricing.description} benefits={pricing.benefits} />
                    )
                })}
            </div>
        </div>
    )
}

export default Pricing