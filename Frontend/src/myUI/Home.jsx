import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import useMyStore from '@/store/myStore'

function Home() {
    let FAQs = [
        {
            question: "What kind of files do I get ?",
            answer: "You will get a DOCX file which you can edit on your own and submit it"
        },
        {
            question: "Will this match my college format ?",
            answer: "We use a generic, widely-accepted format that works most of the time. "
        },
        {
            question: "What if I don't find my subject ?",
            answer: "You can mail me and I will try to add it as soon as possible. "
        },
        {
            question: "Do you offer refunds?",
            answer: "Its free to use so no refunds are needed."
        },
        {
            question: "Will other students in my class get the same file ?",
            answer: "Possibly — since the files are generated from the same input. If you want to avoid this, consider making a few small edits in the DOCX version."
        }
    ]

    const {darkmode} = useMyStore()

    return (
        <>
            <div className={` ${darkmode ? 'dark' : ''} dark:text-white bg-background lg:py-24 px-12 py-20 lg:px-32 flex flex-col justify-center items-center pt-14 `}>
                <div className=' flex justify-center lg:justify-around items-center gap-20 flex-col lg:flex-row ' >
                    <div className=' mx-5 order-2 justify-center items-center flex flex-col'> 
                        <p className='  w-full lg:max-w-60 text-center lg:text-balance lg:leading-11 leading-14 font-semibold text-5xl lg:text-4xl my-5'>
                            Generate boring college files in 2 minutes.
                        </p>
                        <Button>
                            <Link to="./create">    
                                Create Now {`>`}
                            </Link>
                        </Button>
                    </div>
                    <div className='px-5 lg:order-2 hidden lg:flex  '>
                        <img className='h-96' src="\Student stress-rafiki.svg" alt="" />
                    </div>
                </div>
                {/* <div className='flex justify-around items-center gap-20 py-24'>
                    <div className='mx-5'>
                        <img className='h-80' src="src\media\svgs\undraw_team-up_qeem.svg" alt="" />
                    </div>
                    <div className='max-w-60 text-balance font-semibold text-4xl mx-5'>
                        Use your time in more precious places
                    </div>
                </div> */}
                <div className='pb-16 pt-5 lg:py-12' >
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 p-6 md:p-12">
                        <div className="h-96 flex-shrink-0  lg:order-2 ">
                            <img src="/Attached files-cuate.svg" alt="How it works illustration" className="w-full h-full object-contain" />
                        </div>

                        <div className="flex flex-col lg:order-1  gap-6 max-w-md">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">How It Works</h2>
                                <p className="dark:text-gray-400  text-gray-600">Get your college file in 3 easy steps.</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg">📝 Step 1: Choose Subject or Question</h3>
                                    <p className="dark:text-gray-400 text-gray-500"> upload your own questions in PDF format.</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">⚙️ Step 2: We Generate the File</h3>
                                    <p className="dark:text-gray-400 text-gray-500">Our system auto-creates a formatted, ready-to-submit file instantly.</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg">⬇️ Step 3: Download and Submit</h3>
                                    <p className="dark:text-gray-400 text-gray-500">Get your file in DOCX format, print it, and you're done!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="max-w-5xl w-full mx-auto px-4 py-8">
                    <h2 className="text-center text-4xl font-semibold dark:text-white text-gray-800 mb-10">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {FAQs.map((FAQ, index) => (
                            <div key={index}>
                                <Accordion type="single" collapsible className=" w-full border border-gray-200 dark:border-gray-100 rounded-lg shadow-sm">
                                    <AccordionItem value={`item-${index}`}>
                                        <AccordionTrigger className="px-4 dark:hover:text-gray-200 text-md py-3 text-left w-full font-medium dark:text-gray-400 lg:text-lg dark:hover:bg-background text-gray-700 hover:bg-gray-100 transition-all ">
                                            {FAQ.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="lg:text-lg dark:text-gray-400 dark:bg-neutral-950 text-md break-words px-4 py-3 text-gray-600 bg-gray-50">
                                            {FAQ.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}

export default Home