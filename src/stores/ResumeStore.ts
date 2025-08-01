import { create } from 'zustand';
import type { ResumeData } from '../types/ResumeData';

type Actions = {
    setResumeHeader: (header: ResumeData['header']) => void;
    setResumeProfessionalSummary: (summary: ResumeData['professionalSummary']) => void;
    setResumeWorkExperience: (workExperience: ResumeData['workExperience']) => void;
    addEmployment: (employment: ResumeData['workExperience']['employments'][number]) => void;
    removeEmployment: (employmentId: string) => void;
    updateEmployment: (employment: ResumeData['workExperience']['employments'][number]) => void;
    setResumePersonalData: (personalData: ResumeData['personalData']) => void;
    resetResumeData: () => void;
    saveResumeToJSON: () => void;
    loadResumeFromJSON: (json: string) => void;
}


const initialState: ResumeData = {
    id: 'default',
    header: {
        name: 'Your Name',
        role: 'Desired role',
        image: ''
    },
    professionalSummary: {
        title: 'Professional summary',
        summary: 'Write a brief summary of your professional background, skills, and career goals. This section should highlight your key achievements and what you bring to potential employers.'
    },
    workExperience: {
        title: 'Work Experience',
        employments: [
            {
                id: '1',
                companyName: 'Company Name',
                jobTitle: 'Employment Title',
                startDate: '',
                endDate: '',
                description: 'Description of the job responsibilities and achievements.'
            }
        ]
    },
    personalData: {
        title: 'Personal Data',
        phone: '+00 (00) 123 4567',
        email: 'email@provider.com',
        birthTitle: 'Born on',
        birthDate: '01/01/1990' // ISO date string
    },
}

export const useResumeStore = create<ResumeData & Actions>((set) => ({
    ...initialState,
    setResumeHeader: (header) => set({ header }),
    setResumeProfessionalSummary: (summary) => set({ professionalSummary: summary }),
    setResumeWorkExperience: (workExperience) => set({ workExperience }),
    setResumePersonalData: (personalData) => set({ personalData }),
    addEmployment: (employment) => set((state) => ({
        workExperience: {
            ...state.workExperience,
            employments: [...state.workExperience.employments, employment]
        }
    })),
    removeEmployment: (employmentId) => set((state) => ({
        workExperience: {
            ...state.workExperience,
            employments: state.workExperience.employments.filter(e => e.id !== employmentId)
        }
    })),
    updateEmployment: (employment) => {
        //console.log('Updating employment:', employment);
        set((state) => ({

            workExperience: {
                ...state.workExperience,
                employments: state.workExperience.employments.map(e =>
                    e.id === employment.id ? employment : e
                )
            }
        }))

    },
    resetResumeData: () => set(initialState),
    saveResumeToJSON: () => {

        const state = useResumeStore.getState();
        const resumeData = JSON.stringify(state, null, 2);
        //localStorage.setItem('resumeData', resumeData);
        //Save json as file
        const blob = new Blob([resumeData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resume_${state.id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    loadResumeFromJSON: (json) => {
        try {
            const resumeData = JSON.parse(json);
            set(resumeData);
        } catch (error) {
            console.error('Failed to load resume data from JSON:', error);
        }
    }
}));