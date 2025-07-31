import React, { useState } from 'react'
import EditableText from '../../EditableText'
import RichTextInlineEditor from '../../RichTextInlineEditor'
import { FaShoppingBag } from 'react-icons/fa'
import type { Employment } from '../../../types/Employment';
import EmploymentComponent from './Employment';

function ResumeWorkExperience({ className }: { className?: string }) {

    const [employments, setEmployments] = useState<Employment[]>([
        // {
        //     id: '1',
        //     companyName: 'Tech Solutions Inc.',
        //     jobTitle: 'Software Engineer',
        //     startDate: '2020-01-15',
        //     endDate: '2022-06-30',
        //     description: 'Developed and maintained web applications using React and Node.js.'
        // },
        // {
        //     id: '2',
        //     companyName: 'Creative Agency Ltd.',
        //     jobTitle: 'Frontend Developer',
        //     startDate: '2018-03-01',
        //     endDate: '2019-12-31',
        //     description: 'Worked on UI/UX design and implementation for various client projects.'
        // }
    ]);

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex flex-row items-center gap-2 mb-4">
                <FaShoppingBag className='resume_subtitle' size={14} />
                <EditableText className='resume_subtitle'>
                    Work Experience
                </EditableText>
            </div>

            {/* <RichTextInlineEditor className="mt-2 resume_text" onChange={(newValue) => { console.log(`New summary: ${newValue}`) }}>
                Write a brief summary of your professional background, skills, and career goals. This section should highlight your key achievements and what you bring to potential employers.
            </RichTextInlineEditor> */}

            {
                employments.map((employment) => (
                    <div>
                        <EmploymentComponent key={employment.id} employment={employment} className='ml-5' />
                        <hr className='mx-5 text-gray-400  my-4' />

                    </div>
                ))
            }

            <div className="ml-5 mt-2">
                <button
                    className="text-blue-500 hover:underline text-sm"
                    onClick={() => {
                        const newEmployment: Employment = {
                            id: String(employments.length + 1),
                            companyName: 'Compay Name',
                            jobTitle: 'Job Title',
                            startDate: new Date().toISOString().split('T')[0],
                            endDate: '',
                            description: 'Description of the job responsibilities and achievements.'
                        };
                        setEmployments([...employments, newEmployment]);
                    }}
                >
                    Add Employment
                </button>

            </div>

        </div>
    )
}

export default ResumeWorkExperience
