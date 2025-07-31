import React, { useEffect, useRef, useState } from 'react'

import type { ResumeData } from '../types/ResumeData';
import ResumeHeader from '../components/sections/ResumeHeader';
import ResumeProfessionalSummary from '../components/sections/ResumeProfessionalSummary';
import ResumeWorkExperience from '../components/sections/work_experience/ResumeWorkExperience';
import SortableList from '../components/SortableList';
import ResumePersonalData from '../components/sections/ResumePersonalData';



export default function ResumeBuilder() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState<number>(1);

    const BASE_WIDTH = 595; // A4 width in px @72dpi
    const BASE_HEIGHT = 842;

    const [resumeData, setResumeData] = useState<ResumeData>({
        header: {
            name: '',
            role: '',
            image: ''
        }
    });

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
        <div ref={containerRef} className="aspect-[210/297] w-full max-w-[60vh]">
            <div
                style={{
                    width: `${BASE_WIDTH}px`,
                    height: `${BASE_HEIGHT}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                <div className="bg-gray-100 w-full h-full p-5 rounded-sm">
                    <ResumeHeader className='mb-5' />

                    <div className='flex item'>
                        <div className='flex-3'>
                            <ResumeProfessionalSummary className='mb-5 mr-2' />
                            <ResumeWorkExperience className='mr-2'/>
                        </div>

                        <div className='w-[1px] bg-gray-300'></div>

                        <div className='flex-1 ml-5'>

                            <ResumePersonalData>

                            </ResumePersonalData>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}


