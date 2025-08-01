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
}


const initialState: ResumeData = {
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
    resetResumeData: () => set(initialState)
}));