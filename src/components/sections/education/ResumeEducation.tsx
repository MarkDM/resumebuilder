import { useResumeStore } from '../../../stores/ResumeStore';
import EditableText from '../../EditableText'
import { FaGraduationCap, FaPlusCircle } from 'react-icons/fa'

function ResumeEducation({ className }: { className?: string }) {

    const education = useResumeStore((state) => state.education);
    const addEducationInstitution = useResumeStore((state) => state.addEducationInstitution);
    const removeEducationInstitution = useResumeStore((state) => state.removeEducationInstitution);

    return (
        <div className={`group/all flex flex-col ${className}`}>
            <div className="flex flex-row items-center gap-2 mb-4">
                <FaGraduationCap className='text-center resume_subtitle' size={15} />
                <EditableText className='resume_subtitle' onChange={(newValue) => {
                    // Placeholder for setting education title
                    // setEducationTitle(newValue.trim().length == 0 ? 'Education' : newValue);
                }}>
                    Education
                </EditableText>

                <button
                    className="text-primary flex hover:underline text-sm opacity-0 group-hover/all:opacity-100 transition-opacity duration-200"
                    onClick={() => {

                    }}
                >
                    <FaPlusCircle size={16} className="text-center inline" />
                </button>
            </div>


            <div className="ml-5 text-sm text-gray-500">
                No education details added yet. Click "Add" to start.
            </div>

            {/* Placeholder for future education entries */}
            {/* You can add a button here to add new education entries */}
        </div>
    )
}

export default ResumeEducation
