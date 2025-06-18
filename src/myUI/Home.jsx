import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <div className='py-24 mx-32 flex flex-col justify-center items-center  '>
                <div className=' flex justify-around items-center gap-20' >
                    <div className=' mx-5'>
                        <p className='max-w-60 text-balance font-semibold text-4xl my-5'>
                            Build complex college Files in seconds
                        </p>
                        <Button>    
                            <Link to="./create">
                                Create Now {`>`}
                            </Link>
                        </Button>
                    </div>
                    <div className='mx-5'>
                        <img className='h-80' src=".\src\media\svgs\undraw_resume-folder_hf4p.svg" alt="" />
                    </div>   
                </div>
                <div className='flex justify-around items-center gap-20 py-24'>
                    <div className='mx-5'>
                        <img className='h-80' src="src\media\svgs\undraw_team-up_qeem.svg" alt="" />
                    </div>
                    <div className='max-w-60 text-balance font-semibold text-4xl mx-5'>
                        Use your time in more precious places
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home