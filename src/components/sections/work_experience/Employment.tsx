import React from 'react'
import type { Employment } from '../../../types/Employment'
import EditableText from '../../EditableText'
import RichTextInlineEditor from '../../RichTextInlineEditor'
import { useResumeStore } from '../../../stores/ResumeStore';

function EmploymentComponent({ employment, className }: { employment: Employment, className?: string }) {

  const updateEmployment = useResumeStore((state) => state.updateEmployment);

  return (
    <div className={className}>

      <div className='flex flex-row items-center gap-2'>
        <EditableText className="resume_subtitle_md" onChange={(newValue) => {
          updateEmployment({
            ...employment,
            jobTitle: newValue
          });
        }}>
          {employment.jobTitle}
        </EditableText>
        <span className="text-xs text-gray-400 ">@</span>
        <EditableText className="resume_subtitle_md"
          onChange={(newValue) => {
            updateEmployment({
              ...employment,
              companyName: newValue
            });
          }}>
          {employment.companyName}
        </EditableText>
      </div>


      <div className='flex flex-row items-center gap-2 my-1'>
        <EditableText className='text-gray-400 text-[12px]'
          onChange={(newValue) => {
            updateEmployment({
              ...employment,
              startDate: new Date(newValue).toLocaleDateString()
            });
          }}>
          {employment.startDate ? new Date(employment.startDate).toLocaleDateString() : '[Set start Date]'}
        </EditableText>
        <span className='text-gray-400 text-[12px]'>-</span>
        <EditableText className='text-gray-400 text-[12px]' onChange={(newValue) => {
          updateEmployment({
            ...employment,
            endDate: new Date(newValue).toLocaleDateString()
          });
        }}>
          {employment.endDate ? new Date(employment.endDate).toLocaleDateString() : '[Set end Date]'}
        </EditableText>
      </div>


      <RichTextInlineEditor className="resume_text mt-3" onChange={(newValue) => {
        updateEmployment({
          ...employment,
          description: newValue
        });
      }}>
        {employment.description}
      </RichTextInlineEditor>

      <hr className='my-2 text-gray-300'></hr>
    </div>
  )
}

export default EmploymentComponent
