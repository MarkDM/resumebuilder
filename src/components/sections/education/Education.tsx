import React from 'react'
import type { EducationInstitution } from '../../../types/EducationInstitution'
import EditableText from '../../EditableText';
import { useResumeStore } from '../../../stores/ResumeStore';
import RichTextInlineEditor from '../../RichTextInlineEditor';

function Education({ className, institution }: { className?: string, institution: EducationInstitution }) {

    const updateEducationInstitution = useResumeStore((state) => state.updateEducationInstitution);
    const removeEducationInstitution = useResumeStore((state) => state.removeEducationInstitution);
    return (
        <div className={`group/all flex flex-col ${className}`}>
            <div key={institution.id} className="">

                <EditableText className="resume_subtitle_md" onChange={(newValue) => {
                    updateEducationInstitution({
                        ...institution,
                        degree: newValue
                    });
                }}>
                    {institution.degree}
                </EditableText>
                <span className="text-xs text-gray-400"> @ </span>

                <EditableText className="resume_subtitle_md" onChange={(newValue) => {
                    updateEducationInstitution({
                        ...institution,
                        name: newValue
                    });
                }}>
                    {institution.name}
                </EditableText>


                <div className='flex flex-row items-center gap-2 my-1'>
                    <EditableText className='text-gray-400 text-[12px]'
                        onChange={(newValue) => {
                            updateEducationInstitution({
                                ...institution,
                                startDate: new Date(newValue).toLocaleDateString()
                            });
                        }}>
                        {institution.startDate ? new Date(institution.startDate).toLocaleDateString() : '[Set start Date]'}
                    </EditableText>
                    <span className='text-gray-400 text-[12px]'>-</span>
                    <EditableText className='text-gray-400 text-[12px]' onChange={(newValue) => {
                        updateEducationInstitution({
                            ...institution,
                            endDate: new Date(newValue).toLocaleDateString()
                        });
                    }}>
                        {institution.endDate ? new Date(institution.endDate).toLocaleDateString() : '[Set end Date]'}
                    </EditableText>
                </div>

                <RichTextInlineEditor className="resume_text mt-3" onChange={(newValue) => {
                    updateEducationInstitution({
                        ...institution,
                        description: newValue
                    });
                }}>
                    {institution.description}
                </RichTextInlineEditor>

                <hr className='my-2 text-gray-300'></hr>


            </div>
        </div>
    )
}

export default Education
