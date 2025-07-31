import React, { useState } from 'react'
import EditableText from '../../EditableText'
import RichTextInlineEditor from '../../RichTextInlineEditor'
import { FaShoppingBag } from 'react-icons/fa'
import type { Employment } from '../../../types/Employment';
import EmploymentComponent from './Employment';
import SortableList from '../../SortableList';
import { Hamburger, ListOrdered, Trash } from 'lucide-react';
import { CgReorder } from 'react-icons/cg';
import { TbMenuOrder } from 'react-icons/tb';

function ResumeWorkExperience({ className }: { className?: string }) {

    const [employments, setEmployments] = useState<Employment[]>([
        {
            id: '1',
            companyName: 'Company Name',
            jobTitle: 'Employment Title',
            startDate: '',
            endDate: '',
            description: 'Description of the job responsibilities and achievements.'
        },
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
        <div className={`group/all flex flex-col ${className}`}>
            <div className="flex flex-row items-center gap-2 mb-4">
                <FaShoppingBag className='resume_subtitle' size={12} />
                <EditableText className='resume_subtitle'>
                    Work Experience
                </EditableText>
            </div>


            {

                employments.length === 0 ? (
                    <div className="ml-5 text-sm text-gray-500">
                        No work experience added yet. Click "Add Employment" to start.
                    </div>
                ) : (

                    <SortableList>
                        {
                            employments.map((employment) =>
                                <div className='group/item relative' key={employment.id}>
                                    <EmploymentComponent employment={employment} className='ml-5 z-100' />
                                    <div className="absolute flex -ml-2 left-0 top-0 h-full opacity-0 group-hover/item:opacity-50 transition-opacity duration-200">

                                        <div className='flex flex-col h-full items-center justify-evenly '>
                                            <button
                                                className="text-red-500 text-sm"
                                                onClick={() => {
                                                    setEmployments(employments.filter(e => e.id !== employment.id));
                                                }}
                                            >
                                                <Trash size={16} />
                                            </button>

                                            <TbMenuOrder className='text-gray-600' size={16} />

                                        </div>


                                    </div>
                                </div>
                            )
                        }
                    </SortableList>

                )


            }


            <div className="ml-5 mt-2 opacity-0 group-hover/all:opacity-100 transition-opacity duration-200">
                <button
                    className="text-primary hover:underline text-sm"
                    onClick={() => {
                        const newEmployment: Employment = {
                            id: String(employments.length + 1),
                            companyName: 'Compay Name',
                            jobTitle: 'Employment Title',
                            //startDate: new Date().toISOString().split('T')[0],
                            startDate: '',
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
