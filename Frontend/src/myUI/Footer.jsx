import React from 'react'
import useMyStore from '@/store/myStore'

function Footer() {
    let date = new Date().getFullYear()
    const {darkmode} = useMyStore()

    return (
        <div className={` ${darkmode ? 'dark' : ''} dark:text-white dark:bg-background py-12 px-32  flex text-grey-700`}>
            <footer className="w-full text-center py-6 text-md border-t">
                <div className="max-w-screen-lg mx-auto px-4">
                    <p className="mb-2">&copy; {date} FileMaker All rights reserved.</p>

                    <div className="flex flex-wrap justify-center gap-4 mb-2">
                        <a href="/privacy" >Privacy Policy</a>
                        <a href="/terms" >Terms of Use</a>
                        <a href="/contact" >Contact</a>
                    </div>

                    <p className="text-sm ">Made with ❤️ for college students</p>
                </div>
            </footer>

        </div>
    )
}

export default Footer