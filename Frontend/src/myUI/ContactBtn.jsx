import React from 'react'
import { Button } from '@/components/ui/button'

function ContactBtn() {
    const myEmail = import.meta.env.VITE_EMAIL 
    const handleContactClick = () => {
        const email = myEmail;
        const subject = "From codefilemaker";
        const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}`;

        window.open(gmailUrl, "_blank");
    };


  return (
        <Button onClick={handleContactClick} className={`cursor-pointer`}>
            Contact me 
        </Button>
  )
}

export default ContactBtn