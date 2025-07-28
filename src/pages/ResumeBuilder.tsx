import React, { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ImageSelector from '../components/ImageSelector';


interface ResumeData {
    name: string;
    lastName: string,
    role: string;
    image: string;
}

function ResumePreview({ resumeData }: { resumeData: ResumeData }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState<number>(1);

    const BASE_WIDTH = 595; // A4 width in px @72dpi
    const BASE_HEIGHT = 842;

    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                const parent = containerRef.current.parentElement;
                if (!parent) return;

                // Get the maximum size available
                const maxWidth = parent.clientWidth;
                const maxHeight = parent.clientHeight;

                // Calculate the scale factor while maintaining A4 aspect
                const widthScale = maxWidth / BASE_WIDTH;
                const heightScale = maxHeight / BASE_HEIGHT;
                const newScale = Math.min(widthScale, heightScale);

                setScale(newScale);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="aspect-[210/297] w-full max-w-[67vh]">
            <div
                style={{
                    width: `${BASE_WIDTH}px`,
                    height: `${BASE_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                <div className="bg-gray-300 w-full h-full p-5">
                    <div className="flex flex-row items-start h-18">

                        {
                            resumeData.image && <img
                                src={resumeData.image}
                                alt="Preview"
                                className="rounded-lg aspect-square h-[100%]"
                            />
                        }

                        {
                            (!resumeData.image) && <div className="bg-gray-400 rounded-lg aspect-square h-[100%] shrink-0" />
                        }


                        {/* Header fields */}
                        <div className='flex flex-col items-start justify-center ml-5 h-[100%]'>
                            <h2 className=" text-gray-600 font-bold text-[20px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                                {(resumeData.name + ' ' + resumeData.lastName) == '' ? 'Your Name' : resumeData.name + ' ' + resumeData.lastName}
                            </h2>

                            <h2 className=" text-gray-600 font-semibold text-[14px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                                {resumeData.role == '' ? 'Your Role' : resumeData.role}

                            </h2>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}



function ResumeBuilder() {

    const [resumeData, setResumeData] = useState<ResumeData>({
        name: '',
        lastName: '',
        role: '',
        image: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='w-full h-screen flex flex-col md:flex-row card p-5 bg-gray-800'>
            <div className='md:w-[50%] h-full p-10 bg-gray-700 card'>
                <h3 className='text-2xl font-bold mb-5 text-app-gradient'>Resume Builder</h3>

                <h2 className='title-sm text-center'>Profile image</h2>
                <ImageSelector className='mb-5' onChangeImage={(imageB64) => {
                    setResumeData(prev => ({
                        ...prev,
                        image: imageB64
                    }));
                }} />

                <h2 className='title-sm text-center mb-5'>Personal info</h2>

                <form className='space-y-4 gap-3 grid grid-cols-1 md:grid-cols-2'>
                    <div>
                        <label htmlFor='name' className='label-sm'>Fist Name</label>
                        <input className='input' name="name" id='name' placeholder="Name" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='name' className='label-sm'>Last Name</label>
                        <input className='input' name="lastName" id='lastName' placeholder="lastName" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='role' className='label-sm'>Desired Role</label>
                        <input className='input' name="role" id='role' placeholder="Your Role" onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor='email' className='label-sm'>Email</label>
                        <input className='input' name="email" id='email' placeholder="Your email" onChange={handleChange} />
                    </div>

                </form>
            </div>

            <div className='md:mt-0 mt-5 md:w-[50%] ml-5 flex flex-col justify-center items-center'>
                <h2 className='title-sm'>Preview</h2>
                <ResumePreview resumeData={resumeData} />
            </div>
        </div>
    )
}



export default ResumeBuilder
