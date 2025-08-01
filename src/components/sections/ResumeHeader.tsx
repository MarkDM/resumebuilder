import React, { useState } from 'react'
import ImageInput from '../ImageInput';
import EditableText from '../EditableText';
import type { ResumeHeader } from '../../types/ResumeData';
import { useResumeStore } from '../../stores/ResumeStore';

export default function ResumeHeader({ className }: { className?: string }) {

    const resumeHeader = useResumeStore((state) => state.header);
    const setResumeHeader = useResumeStore((state) => state.setResumeHeader);

    return (

        <div className={`${className} flex flex-row items-start h-18`}>
            <ImageInput onChangeImage={(imageBase64: string) => {
                setResumeHeader({
                    ...resumeHeader,
                    image: imageBase64
                });
            }} />
            <div className='flex flex-col items-start justify-center ml-5 h-[100%]'>
                <EditableText onChange={(newValue) => {

                    setResumeHeader({
                        ...resumeHeader,
                        name: newValue.trim().length == 0 ? 'Click to edit' : newValue
                    });

                    setResumeHeader
                }} className='resume_title'>
                    {resumeHeader.name}
                </EditableText>


                <EditableText onChange={(newValue) => {
                    setResumeHeader({
                        ...resumeHeader,
                        role: newValue.trim().length == 0 ? 'Click to edit' : newValue
                    });
                }} className='resume_subtitle'>
                    {resumeHeader.role}
                </EditableText>

            </div>

        </div>
    )
}