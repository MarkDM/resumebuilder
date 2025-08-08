import { useEffect, useRef, useState } from 'react'
import ResumeHeader from '../components/sections/ResumeHeader';
import ResumeProfessionalSummary from '../components/sections/ResumeProfessionalSummary';
import ResumeWorkExperience from '../components/sections/work_experience/ResumeWorkExperience';
import ResumePersonalData from '../components/sections/ResumePersonalData';
import { useResumeStore } from '../stores/ResumeStore';
import FileSelector from '../components/FileSelector';
import EditableText from '../components/EditableText';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import ResumeEducation from '../components/sections/education/ResumeEducation';
import ResumeLinks from '../components/sections/links/ResumeLinks';
import SkillSet from '../components/sections/skills/SkillSet';



export default function ResumeBuilder() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState<number>(1);

    const BASE_WIDTH = 595; // A4 width in px @72dpi
    const BASE_HEIGHT = 842;

    const saveResumeToJSON = useResumeStore((state) => state.saveResumeToJSON);
    const loadResumeFromJSON = useResumeStore((state) => state.loadResumeFromJSON);
    const setResumeId = useResumeStore((state) => state.setResumeId);
    const resumeData = useResumeStore((state) => state);

    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                const parent = containerRef.current.parentElement;
                if (!parent) return;

                // Get the maximum size available
                const maxWidth = parent.clientWidth;
                const maxHeight = parent.clientHeight;

                // Calculate the scale factor while maintaining A4 aspect
                const widthScale = maxWidth / BASE_WIDTH;
                const heightScale = maxHeight / BASE_HEIGHT;
                const newScale = Math.min(widthScale, heightScale);

                setScale(newScale);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (


        <div className='flex flex-col md:flex-row max-w-[1360px] w-full h-full justify-center items-stretch gap-5 md:gap-8 '>

            {/* SideBar */}
            <div
                className={`
                    flex
                    flex-col 
                    gap-4 
                    md:flex-col 
                    bg-gray-600 
                    p-5 
                    rounded-lg 
                    m-2 md:m-0 
                    transition-all 
                    duration-300 
                    overflow-hidden 
                    ${sidebarOpen ? 'h-auto' : 'h-[60px]'} 
                    md:h-auto md:flex-1
                `}
            >
                {/* Small screen toggle */}
                <div className='flex justify-between items-center md:block'>
                    <h2 className='text-app-gradient font-bold text-xl'>Resume Builder</h2>
                    <button
                        className='md:hidden text-sm text-white bg-gray-700 px-2 py-1 rounded'
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <ChevronUp /> : <ChevronDown />}
                    </button>
                </div>

                {/* Hide rest of sidebar on small screen if collapsed */}
                <div className={`${sidebarOpen ? 'flex' : 'hidden'} md:flex flex-col gap-3`}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            saveResumeToJSON();
                        }}
                    >
                        <div className='flex items-center gap-2 mt-5'>
                            <label htmlFor='resumeId' className='text-sm text-gray-300 ml-1'>
                                Resume Name:
                            </label>

                            <EditableText
                                className='text-sm font-bold text-gray-300'
                                onChange={(newValue) => {
                                    setResumeId(newValue.trim().length > 0 ? newValue : 'My Resume');
                                }}
                            >
                                {resumeData.id}
                            </EditableText>
                        </div>

                        <button
                            type='submit'
                            className='bg-primary mt-3 w-full text-sm shadow-hover px-4 py-2 rounded-lg mb-4'
                        >
                            Save as json <Download className='inline ml-2' size={18} />
                        </button>
                    </form>

                    <div className='flex-1 flex flex-col gap-2'>
                        <h3 className='text-gray-300 text-sm'>Load Resume from JSON</h3>
                        <p className='text-xs text-gray-400'>
                            You can load a previously saved resume in JSON format.
                        </p>

                        <FileSelector
                            className='p-10'
                            onChangeFile={(fileBase64, fileName) => {
                                if (fileBase64 && fileName) {
                                    loadResumeFromJSON(fileBase64);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Resume Preview */}
            <div className='flex-3 flex justify-center items-center w-full h-full'>
                <div ref={containerRef}
                    // style={{
                    //     transformOrigin: 'top left',
                    // }}
                    className="scale-[0.95] md:scale-100 overflow-hidden">

                    <div
                        style={{
                            width: `${BASE_WIDTH}px`,
                            height: `${BASE_HEIGHT}px`,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                        }}
                    >
                        <div className="bg-gray-300 w-full h-full p-5 rounded-sm">
                            <ResumeHeader className='mb-5' />

                            <div className='flex'>
                                <div className='flex-2'>
                                    <ResumeProfessionalSummary className='mb-5 mr-2' />
                                    <ResumeWorkExperience className='mb-5 mr-2' />
                                    <ResumeEducation className='mb-5 mr-2' />
                                </div>

                                <div className='w-[1px] bg-gray-300'></div>

                                <div className='flex-1 ml-5'>
                                    <ResumePersonalData />
                                    <ResumeLinks className='mt-5' />
                                    <SkillSet className='mt-5' />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>


    );
}


