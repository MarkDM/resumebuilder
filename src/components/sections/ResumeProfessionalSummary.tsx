import { FaUser } from "react-icons/fa";
import React from 'react'
import EditableText from "../EditableText";
import RichTextInlineEditor from "../RichTextInlineEditor";

function ResumeProfessionalSummary({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex flex-row items-center gap-2">
                <FaUser className='resume_subtitle' size={14} />
                <EditableText className='resume_subtitle'>
                    Professional summary
                </EditableText>
            </div>

            <RichTextInlineEditor className="mt-2 ml-5 resume_text" onChange={(newValue) => { console.log(`New summary: ${newValue}`) }}>
                Write a brief summary of your professional background, skills, and career goals. This section should highlight your key achievements and what you bring to potential employers.
            </RichTextInlineEditor>

        </div>
    )
}

export default ResumeProfessionalSummary
