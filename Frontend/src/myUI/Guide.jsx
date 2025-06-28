import React from 'react'
import useMyStore from '@/store/myStore'
import { Button } from '@/components/ui/button'
import ContactBtn from './ContactBtn'

function Guide() {
    const {darkmode} = useMyStore()
    const Steps = [
        {
            no : 1,
            message : " Copy all your questions "
        } , 
        {
            no : 2,
            message : "Paste all those inside google docx or ms word"
        } ,
        {
            no : 3 ,
            message : "Create a pdf file from it like this : ",
            file : "/PROGRAMS.pdf"
        } , 
        {
            no : 4 ,
            message : "You have to wait for your file to generate and once it generated we will send it to your registered email address"
        }
    ]

    const dowloadFile = (file) => {
        const link = document.createElement('a');
        link.href = file;
        link.download = 'Example.pdf';
        link.click();
    }

  return (
    <div className={` ${darkmode ? 'dark' : ''} dark:text-white bg-background lg:py-24 px-12 py-20 lg:px-32 pt-14 min-h-fit `}>
        <div className='text-left text-4xl font-medium pt-2 pb-6 ' >
            GUIDE TO CREATE FILE
        </div>
        <ul className={`dark:text-gray-400 tracking-wide space-y-1 ${darkmode ? 'dark' : ''} text-gray-600`} >
            {
                Steps.map(( step , index ) => {
                    return (
                        <li key={step.no} >
                            <p>
                                <span className='text-lg   font-semibold' >{step.no}.</span> {step.message}
                                {
                                    step.file && 
                                    <div className='my-2' >
                                    <Button className={`cursor-pointer`} onClick={() => dowloadFile(step.file)} >
                                        Download Example
                                    </Button>
                                    </div>
                                }
                            </p>
                        </li>
                    )
                })
            }
        </ul>
        <div className='my-10' >
            <p className='text-lg font-medium my-2' >
                If you have any doubts , questions or any feedback feel free to contact me.
            </p>
            <ContactBtn />
        </div>
        <div className='py-12' >
            Note : We are using free API to generate the file so it may take some time to generate the file and sometimes it may not work as intended.
        </div>
    </div>
  )
}

export default Guide    