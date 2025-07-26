import React, { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


interface ResumeData {
    name: string;
    email: string;
    message: string;
}

function ResumePreview({ resumeData }: { resumeData: ResumeData }) {
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!previewRef.current) return;

    }, [resumeData]);

    return (

        <div className="aspect-[210/297] w-full max-w-[67vh]">
            <div
                ref={previewRef}
                className="rounded-sm bg-gray-200 w-full h-full p-5"
            >
                <h2 className='text-gray-700'>{resumeData.name}</h2>
                <p>{resumeData.email}</p>
                <p>{resumeData.message}</p>
            </div>
        </div>

    );
}


function ResumeBuilder() {
    const formRef = useRef<HTMLDivElement>(null);

    const [resumeData, setResumeData] = useState<ResumeData>({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='w-full h-screen flex flex-col md:flex-row card p-5 bg-gray-800'>
            <div className='md:w-[50%] h-full p-10 bg-gray-700 card'>
                <h3 className='text-2xl font-bold mb-5 text-app-gradient'>Resume Builder</h3>
                <form className='space-y-4'>
                    <input className='input' name="name" placeholder="Name" onChange={handleChange} />
                    <input className='input' name="email" placeholder="Email" onChange={handleChange} />
                </form>
            </div>

            <div className='md:mt-0 mt-5 md:w-[50%] ml-5 flex justify-center items-center'>
                <ResumePreview resumeData={resumeData} />
            </div>
        </div>
    )
}


function HeaderFields() {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="fullName"
                    type="text"
                    className="w-full px-3 py-2 input"
                    placeholder="Your fullname"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="role">
                    Cargo ou área de atuação <span className="text-red-500">*</span>
                </label>
                <input
                    id="role"
                    type="text"
                    className="w-full px-3 py-2 input"
                    placeholder="Ex: Desenvolvedor Full Stack"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="phone">
                    Telefone (com DDD) <span className="text-red-500">*</span>
                </label>
                <input
                    id="phone"
                    type="tel"
                    className="w-full px-3 py-2 input"
                    placeholder="(11) 91234-5678"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="email">
                    E-mail profissional <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 input"
                    placeholder="seu@email.com"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="links">
                    LinkedIn/GitHub/Portfólio
                </label>
                <input
                    id="links"
                    type="text"
                    className="w-full px-3 py-2 input"
                    placeholder="URL do LinkedIn, GitHub ou Portfólio"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="location">
                    Cidade/Estado
                </label>
                <input
                    id="location"
                    type="text"
                    className="w-full px-3 py-2 input"
                    placeholder="Ex: São Paulo/SP"
                />
            </div>
        </div>
    )
}



export default ResumeBuilder
