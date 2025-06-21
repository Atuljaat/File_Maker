import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { set, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import useMyStore from '@/store/myStore'


function File() {
    const [userFileName, setUserFileName] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [file, setFile] = useState(null)
    const [blob, setBlob] = useState(null)
    const [loading, setLoading] = useState(false)
    const [genFileName , setGenFileName] = useState(null)
    const [codeFontSize, setCodeFontSize] = useState(16)
    const [questionFontSize, setQuestionFontSize] = useState(18)

    const onDrop = useCallback(acceptedFiles => {
        const selectedFile = acceptedFiles[0];

        if (!selectedFile || selectedFile.type !== "application/pdf") {
            toast("Enter a valid PDF file", {
                description: "Only PDF files are supported",
                style: {
                    background: "red",
                    color: "white"
                }
            }); 
            setFile(null);
            userFileName(null);
            setFileUrl(null);
            return;
        }


        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));
        let cleanedFileName = selectedFile.name.replace(/\.pdf$/i, ""); // remove .pdf (case-insensitive)
        setUserFileName(cleanedFileName);
        console.log(selectedFile);
    }, []);


    const handlePDF = async (filename,language) => {
        if (!file) {
            alert("Please upload the pdf first");
            return;
        }
        
        const formData = new FormData()
        formData.append("filename", filename)
        formData.append("file", file)
        formData.append("language",language)
        formData.append("codeFontSize", codeFontSize)
        formData.append("questionFontSize", questionFontSize)
        setGenFileName(filename)
        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    const downloadFile = async () => {
        if (!blob) return;
        console.log('download started')
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = String(genFileName) + ".docx";
        link.click();
        window.URL.revokeObjectURL(url);
    }

    let onSubmit = (data) => {
        console.log('file generation started')
        console.log(data)
        setGenFileName(data.fileName)
        setCodeFontSize(data.codeFontSize)
        setQuestionFontSize(data.questionFontSize)
        handlePDF(data.fileName,data.language)
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

    const {darkmode} = useMyStore()


    return (
        <div className={` ${darkmode ? 'dark' : ''} dark:bg-[hsl(240,10%,4%)] dark:text-white lg:py-20 py-28 px-12 md:px-32`}>
            <Toaster />

            <div className='font-medium '>
                <p className='text-3xl md:text-4xl lg:text-3xl font-medium py-2'>
                    Steps to generate Files?
                </p>
                <div className='text-xl dark:text-gray-400 text-gray-600 lg:text-lg' >
                    <p >Step 1: Copy all the questions into a file and create a PDF file</p>
                    <p >Step 2: Just drop the file, it's that simple</p>
                </div>
            </div>
                <form className='text-xl my-8  flex flex-col gap-2.5' onSubmit={handleSubmit(onSubmit)} >
                    <div className='flex gap-2  items-center' >
                        <label htmlFor="FileName">File Name : </label>
                        <Input  {...register('fileName', {
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
                                <SelectItem  value="Python" className={'hover:cursor-pointer'}  > Python </SelectItem>
                                <SelectItem value="Java" className={'hover:cursor-pointer'} > Java </SelectItem>
                                <SelectItem value="C" className={'hover:cursor-pointer'} > C </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {errors.language && <p className='text-red-500 text-md my-2' > {errors.language.message} </p>}
                    <div className='flex gap-2 items-center' >
                        <label htmlFor="FileName">Question Font size : </label>
                        <Input defaultValue={'18'} {...register('questionFontSize', {
                            required: "Question font size is Required"
                            , valueAsNumber: true,
                            min: {
                                value: 10,
                                message: "Question font size must be at least 10"
                            },
                            max: {
                                value: 99,
                                message: "Question font size must be at most 99"
                            }
                        })} type={'number'} className={'w-auto lg:min-w-sm text-xl'} />
                    </div>
                        {errors.questionFontSize && <p className='text-red-500 text-md my-2' > {errors.questionFontSize.message} </p>}
                    <div className='flex gap-2 items-center' >
                        <label htmlFor="FileName">Code Font size : </label>
                        <Input defaultValue={'16'} {...register('codeFontSize', {
                            valueAsNumber: true,
                            required: "Code font size is Required",
                            min: {
                                value: 10,
                                message: "Code font size must be at least 10"
                            },
                            max: {
                                value: 99,
                                message: "Code font size must be at most 99"
                            }
                        })} type={'number'}  className={'w-auto lg:min-w-sm text-xl'} />
                    </div>
                        {errors.codeFontSize && <p className='text-red-500 text-md my-2' > {errors.codeFontSize.message} </p>}
            {!fileUrl && (
                <>
                <div
                    {...getRootProps()}
                    className={`border-2 text-wrap dark:bg-neutral-900 border-dashed rounded-lg h-60 md:h-60 lg:h-44 my-10 flex justify-center items-center transition-all duration-300 dark:text-gray-400
                        ${isDragActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-400 bg-white text-gray-600'}`}
                >
                    <input {...getInputProps()} />
                    {
                        isDragActive
                            ? <p className="text-lg  p-2 ">📂 Drop the file here...</p>
                            : <p className="text-lg p-2">📁 Drag & drop PDF file here, or <span className="underline dark:text-blue-500 text-blue-600 cursor-pointer">click to select</span></p>
                    }
                </div>
                </>
            )}

            {fileUrl && (
                <>
                    <div className="my-5 flex items-center justify-between bg-gray-100 p-3 rounded-md mb-4">
                        <span>{userFileName}</span>
                        <Button
                            onClick={() => {
                                setUserFileName(null);
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
                <Button type={'submit'} disabled={!fileUrl} className={" hover:scale-105 transition-all duration-75 hover:cursor-pointer"} >Generate File</Button>
                <Button type={'button'} onClick={downloadFile} disabled={!blob} className={" hover:scale-105 transition-all duration-75 hover:cursor-pointer"} >Downlaod File</Button>
            </div>
            
            <div className='text-4xl mt-10' >
                {loading ? "LOADING ..." : "LOADING IS COMPLETED OR NOT STARTED YET"}
            </div>
            </form>
        </div>
    );
}

export default File;    
