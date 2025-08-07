import React from 'react'
import type { Employment } from '../../../types/Employment'
import EditableText from '../../EditableText'
import RichTextInlineEditor from '../../RichTextInlineEditor'
import { useResumeStore } from '../../../stores/ResumeStore';
import DateLabelPicker from '../../DateLabelPicker';

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

        <DateLabelPicker className='text-gray-400 text-[12px]' date={employment.startDate} onChange={(newDate) => {
          updateEmployment({
            ...employment,
            startDate: newDate
          });
        }} showMonthYearPicker={true} />
        <span className='text-gray-400 text-[12px]'>-</span>

        <DateLabelPicker className='text-gray-400 text-[12px]' date={employment.endDate || new Date()} onChange={(newDate) => {
          updateEmployment({
            ...employment,
            endDate: newDate
          });
        }} showMonthYearPicker={true} />

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
