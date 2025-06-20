import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


function File() {
    // const [fileName, setFileName] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [file, setFile] = useState(null)
    const [blob, setBlob] = useState(null)
    const [loading, setLoading] = useState(false)

    const onDrop = useCallback(acceptedFiles => {
        const selectedFile = acceptedFiles[0];

        // ✅ Check directly against selectedFile
        if (!selectedFile || selectedFile.type !== "application/pdf") {
            toast("Enter a valid PDF file", {
                description: "Only PDF files are supported",
                style: {
                    background: "red",
                    color: "white"
                }
            });
            setFile(null);
            setFileName(null);
            setFileUrl(null);
            return;
        }

        // ✅ Now safe to use
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
        let cleanedFileName = selectedFile.name.replace(/\.pdf$/i, ""); // remove .pdf (case-insensitive)
        setFileName(cleanedFileName);
        console.log(selectedFile);
    }, []);


    const handlePDF = async () => {
        if (!file) {
            alert("Please upload the pdf first");
            return;
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("filename", fileName)
        formData.append("file", file)

        try {
            console.log('generating')
            const res = await fetch('http://localhost:8000/processFile', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error("Failed to process File");
            }
            console.log('backend is working')
            const blob = await res.blob()
            setBlob(blob)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    const downloadFile = async () => {
        if (!blob) return;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "GeneratedFile" + ".docx";
        link.click();
        window.URL.revokeObjectURL(url);
    }

    let onSubmit = (data) => {
        console.log(data)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': [] },
        multiple: false,
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        register("language", { required: "language is required" })
    }, [register])



    return (
        <div className='lg:py-20 py-28 mx-12 md:mx-32'>
            <Toaster />

            <div className='font-medium'>
                <p className='text-3xl md:text-4xl lg:text-3xl font-medium py-2'>
                    Steps to generate Files?
                </p>
                <div className='text-xl text-gray-600 lg:text-lg' >
                    <p >Step 1: Copy all the questions into a file and create a PDF file</p>
                    <p >Step 2: Just drop the file, it's that simple</p>
                </div>
            </div>
                <form className='text-xl my-8  flex flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)} >
                    <div className='flex gap-2  items-center' >
                        <label htmlFor="FileName">File Name : </label>
                        <Input {...register('fileName', {
                            required: "Filename is Required"
                        })} type={'text'} className={'w-auto lg:min-w-sm text-xl'} />
                    </div>
                    {errors.fileName && <p className='text-red-500 text-md my-2' > {errors.fileName.message } </p>}
                    <div className='flex gap-2  items-center'  >
                        <label htmlFor="language" > Choose Language : </label>
                        <Select onValueChange={(value) => setValue("language", value)} >
                            <SelectTrigger className={'w-[180px]'}>
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent  >
                                <SelectItem value="Python" className={'hover:cursor-pointer'}  > Python </SelectItem>
                                <SelectItem value="Java" className={'hover:cursor-pointer'} > Java </SelectItem>
                                <SelectItem value="C" className={'hover:cursor-pointer'} > C </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {errors.language && <p className='text-red-500 text-md my-2' > {errors.language.message} </p>}
                           
            {!fileUrl && (
                <div
                    {...getRootProps()}
                    className={`border-2 text-wrap border-dashed rounded-lg h-60 md:h-60 lg:h-44 my-10 flex justify-center items-center transition-all duration-300 
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

            <div className='flex gap-2'>
                <Button onClick={handlePDF} disabled={!fileUrl} className={" hover:scale-105 transition-all duration-75 hover:cursor-pointer"} >Generate File</Button>
                <Button onClick={downloadFile} disabled={!blob} className={" hover:scale-105 transition-all duration-75 hover:cursor-pointer"} >Downlaod File</Button>
            </div>
            
            <div className='text-4xl mt-10' >
                {loading ? "LOADING ..." : "LOADING IS COMPLETED OR NOT STARTED YET"}
            </div>
             </form>
        </div>
    );
}

export default File;    
