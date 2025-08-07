import { useResumeStore } from '../../../stores/ResumeStore';
import EditableText from '../../EditableText'
import { FaGraduationCap, FaPlusCircle } from 'react-icons/fa'
import Education from './Education';
import SortableList from '../../SortableList';
import { Trash } from 'lucide-react';
import { TbMenuOrder } from 'react-icons/tb';

function ResumeEducation({ className }: { className?: string }) {

    const education = useResumeStore((state) => state.education);
    const setEducation = useResumeStore((state) => state.setEducation);
    const addEducationInstitution = useResumeStore((state) => state.addEducationInstitution);
    const removeEducationInstitution = useResumeStore((state) => state.removeEducationInstitution);

    return (
        <div className={`group/all flex flex-col ${className}`}>
            <div className="flex flex-row items-center gap-2 mb-4">
                <FaGraduationCap className='text-center resume_subtitle' size={15} />
                <EditableText className='resume_subtitle' onChange={(newValue) => {
                    setEducation({
                        ...education,
                        title: newValue.trim().length === 0 ? 'Education' : newValue
                    });
                }}>
                    Education
                </EditableText>

                <button
                    className="text-primary flex hover:underline text-sm opacity-0 group-hover/all:opacity-100 transition-opacity duration-200"
                    onClick={() => {
                        const newInstitution = {
                            id: String(education.institutions.length + 1),
                            name: 'Institution Name',
                            degree: 'Degree title',
                            startDate: new Date(),
                            endDate: undefined,
                            description: 'Description of the degree and any relevant coursework or achievements.'
                        };
                        addEducationInstitution(newInstitution);
                    }}
                >
                    <FaPlusCircle size={16} className="text-center inline" />
                </button>
            </div>


            <div className="text-sm text-gray-500">

                {education.institutions.length === 0 ? (
                    <div className="ml-5 text-sm text-gray-500">
                        No education added yet. Click "Add" to start.
                    </div>
                ) : (

                    <SortableList>
                        {education.institutions.map((institution) => (

                            <div className='group/item relative' key={institution.id}>
                                <Education
                                    key={institution.id}
                                    className="ml-5 z-100"
                                    institution={institution}
                                />
                                <div className="absolute flex -ml-2 left-0 top-0 h-full opacity-0 group-hover/item:opacity-50 transition-opacity duration-200">

                                    <div className='flex flex-col h-full items-center justify-evenly '>
                                        <button
                                            className="text-red-500 text-sm"
                                            onClick={() => {
                                                removeEducationInstitution(institution);
                                            }}
                                        >
                                            <Trash size={16} />
                                        </button>

                                        <TbMenuOrder className='text-gray-600' size={16} />

                                    </div>


                                </div>
                            </div>
                        ))}
                    </SortableList>

                )}
            </div>

        </div >
    )
}

export default ResumeEducation
