import React from 'react'
import EditableText from '../EditableText'

function ResumePersonalData({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <EditableText className='resume_subtitle_md text-start'>Personal Data</EditableText>

            <EditableText className='resume_text font-semibold mt-1 text-start'>
                +00 (00) 123 4567
            </EditableText>

            <EditableText className='resume_text font-semibold mt-1 text-start'>
                email@email.com
            </EditableText>


            <EditableText className='resume_text font-semibold mt-5 text-start'>
                Born on
            </EditableText>

            <EditableText className='resume_text font-semibold mt-1 text-start'>
                01 January 1990
            </EditableText>

        </div>
    )
}

export default ResumePersonalData
