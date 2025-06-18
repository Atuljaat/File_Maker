import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'

function File() {
    const [fileName, setFileName] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        if (!file || file.type !== "application/pdf") {
            toast("Enter a valid PDF file", {
                description: "Only PDF files are supported",
                style: {
                    background: "red",
                    color: "white"
                }
            });
            setFileName(null);
            setFileUrl(null);
            return;
        }

        setFileName(file.name);
        setFileUrl(URL.createObjectURL(file));
        console.log(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': [] },
        multiple: false,
    });

    return (
        <div className='py-12 mx-32'>
            <Toaster />
            <div className='font-medium'>
                <p className='text-2xl font-medium py-2'>
                    Steps to generate Files?
                </p>
                <p>Step 1: Copy all the questions into a file and create a PDF file</p>
                <p>Step 2: Just drop the file, it's that simple</p>
            </div>

            {!fileUrl && (
                <div
                    {...getRootProps()}
                    className={`border-2 text-wrap border-dashed rounded-lg h-44 my-10 flex justify-center items-center transition-all duration-300 
                        ${isDragActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-400 bg-white text-gray-600'}`}
                >
                    <input {...getInputProps()} />
                    {
                        isDragActive
                            ? <p className="text-lg font-semibold p-2">📂 Drop the file here...</p>
                            : <p className="text-lg p-2">📁 Drag & drop PDF file here, or <span className="underline text-blue-600 cursor-pointer">click to select</span></p>
                    }
                </div>
            )}

            {fileUrl && (
                <>
                    <div className="my-5 flex items-center justify-between bg-gray-100 p-3 rounded-md mb-4">
                        <span>{fileName}</span>
                        <Button
                            onClick={() => {
                                setFileName(null);
                                setFileUrl(null);
                            }}
                            className="text-white hover:text-white bg-red-600 hover:cursor-pointer hover:bg-red-600 font-semibold hover:scale-105 transition-all duration-75"
                        >
                            ❌ Remove
                        </Button>
                    </div>

                    <div className="w-full h-[500px] border rounded mb-6">
                        <iframe
                            src={fileUrl}
                            title="PDF Preview"
                            className="w-full h-full"
                        />
                    </div>
                </>
            )}

            <Button disabled={!fileUrl} className={"hover:scale-105 transition-all duration-75 hover:cursor-pointer"} >Generate File</Button>
        </div>
    );
}

export default File;
