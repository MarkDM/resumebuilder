import React, { useState } from 'react'
import ImageInput from '../ImageInput';
import EditableText from '../TextInput';
import type { ResumeDataHeader } from '../../types/ResumeData';

export default function ResumeHeader() {

    const [resumeData, setResumeData] = useState<ResumeDataHeader>({
        name: 'Your Name',
        role: 'Desired role',
        image: ''
    });

    return (

        <div className="flex flex-row items-start h-18">
            <ImageInput onChangeImage={(imageBase64: string) => {
                setResumeData(prev => ({
                    ...prev,
                    image: imageBase64
                }));
            }} />
            <div className='flex flex-col items-start justify-center ml-5 h-[100%]'>
                <EditableText onChange={(newValue) => {
                    setResumeData(prev => ({
                        ...prev,
                        name: newValue.trim().length == 0 ? 'Click to edit' : newValue
                    }))
                }} className='text-gray-600 font-bold text-[20px]'>
                    {resumeData.name}
                </EditableText>


                <EditableText onChange={(newValue) => {
                    setResumeData(prev => ({
                        ...prev,
                        role: newValue.trim().length == 0 ? 'Click to edit' : newValue
                    }))
                }} className='text-gray-600 font-bold text-[15px]'>
                    {resumeData.role}
                </EditableText>

            </div>

        </div>
    )
}