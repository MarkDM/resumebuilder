import { useResumeStore } from '../../stores/ResumeStore';
import DateLabelPicker from '../DateLabelPicker';
import EditableText from '../EditableText'

function ResumePersonalData({ className }: { className?: string }) {

    const personalData = useResumeStore((state) => state.personalData);
    const setPersonalData = useResumeStore((state) => state.setResumePersonalData);

    return (
        <div className={`flex flex-col ${className}`}>
            <EditableText className='resume_subtitle_md text-start' onChange={(newValue) => {
                setPersonalData({
                    ...personalData,
                    title: newValue.trim().length == 0 ? 'Personal Data' : newValue
                });
            }}>
                {personalData.title}
            </EditableText>

            <EditableText className='font-semibold  text-gray-500 text-[12px] mt-1' onChange={(newValue) => {
                setPersonalData({
                    ...personalData,
                    phone: newValue.trim().length == 0 ? '+00 (00) 123 4567' : newValue
                });
            }}>
                {personalData.phone}
            </EditableText>

            <EditableText className='font-semibold  text-gray-500 text-[12px] mt-1' onChange={(newValue) => {
                setPersonalData({
                    ...personalData,
                    email: newValue.trim().length == 0 ? 'email@email.com' : newValue
                });
            }}>
                {personalData.email}
            </EditableText>

            <EditableText className='resume_text font-semibold mt-5 text-start' onChange={(newValue) => {
                setPersonalData({
                    ...personalData,
                    birthTitle: newValue.trim().length == 0 ? 'Born on' : newValue
                });
            }}>
                {personalData.birthTitle ?? 'Born on'}
            </EditableText>

            <DateLabelPicker
                className='font-semibold  text-gray-500 text-[12px] mt-1'
                date={personalData.birthDate ?? new Date()}
                onChange={(newDate) => {
                    setPersonalData({
                        ...personalData,
                        birthDate: newDate ?? new Date()
                    });
                }}
                showMonthYearPicker={false}
            />


            <EditableText className='resume_text font-semibold mt-5 text-start' onChange={(newValue) => {
                setPersonalData({
                    ...personalData,
                    nationalityTitle: newValue.trim().length == 0 ? 'Nationality' : newValue
                });
            }}>
                {personalData.nationalityTitle ?? 'Nationality'}
            </EditableText>

            <EditableText className='font-semibold  text-gray-500 text-[12px] mt-1' onChange={(newValue) => {
                setPersonalData({
                    ...personalData,
                    nationality: newValue.trim().length == 0 ? 'Nationality' : newValue
                });
            }}>
                {personalData.nationality ?? '[Your Nationality]'}
            </EditableText>
        </div>
    )
}

export default ResumePersonalData
