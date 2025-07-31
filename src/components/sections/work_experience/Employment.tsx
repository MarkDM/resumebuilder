import React from 'react'
import type { Employment } from '../../../types/Employment'
import EditableText from '../../EditableText'
import RichTextInlineEditor from '../../RichTextInlineEditor'

function EmploymentComponent({ employment, className }: { employment: Employment, className?: string }) {
  return (
    <div className={className}>

      <div className='flex flex-row items-center gap-2'>
        <EditableText className="resume_subtitle_md">{employment.jobTitle}</EditableText>
        <span className="text-xs text-gray-400 ">@</span>
        <EditableText className="resume_subtitle_md">{employment.companyName}</EditableText>
      </div>


      <div className='flex flex-row items-center gap-2'>
        <EditableText className='text-gray-400 text-sm'>{new Date(employment.startDate).toLocaleDateString()}</EditableText>
        <span className='text-gray-400 text-sm'>-</span>
        <EditableText className='text-gray-400 text-sm'>{employment.endDate ? new Date(employment.endDate).toLocaleDateString() : 'Present'}</EditableText>
      </div>


      <RichTextInlineEditor className="resume_text mt-3">{employment.description}</RichTextInlineEditor>
    </div>
  )
}

export default EmploymentComponent
