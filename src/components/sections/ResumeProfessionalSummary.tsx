import { FaUser } from "react-icons/fa";
import EditableText from "../EditableText";
import RichTextInlineEditor from "../RichTextInlineEditor";
import { useResumeStore } from "../../stores/ResumeStore";

function ResumeProfessionalSummary({ className }: { className?: string }) {

    const professionalSumary = useResumeStore((state) => state.professionalSummary);
    const setProfessionalSummary = useResumeStore((state) => state.setResumeProfessionalSummary);

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex flex-row items-center gap-2">
                <FaUser className='resume_subtitle' size={12} />
                <EditableText className='resume_subtitle' onChange={(newValue) => {
                    setProfessionalSummary(
                        {
                            ...professionalSumary,
                            title: newValue.trim().length == 0 ? 'Professional summary' : newValue
                        }
                    )
                }}>
                    {professionalSumary.title}
                </EditableText>
            </div>

            <RichTextInlineEditor className="mt-2 ml-5 resume_text" onChange={(newValue) => {
                setProfessionalSummary(
                    {
                        ...professionalSumary,
                        summary: newValue
                    }
                )
            }}>
                {professionalSumary.summary}

            </RichTextInlineEditor>

        </div>
    )
}

export default ResumeProfessionalSummary
