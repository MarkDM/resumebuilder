import { create } from 'zustand';
import type { ResumeData } from '../types/ResumeData';

type Actions = {
    setResumeHeader: (header: ResumeData['header']) => void;
    setResumeProfessionalSummary: (summary: ResumeData['professionalSummary']) => void;
    setResumeWorkExperience: (workExperience: ResumeData['workExperience']) => void;
    setResumePersonalData: (personalData: ResumeData['personalData']) => void;
    resetResumeData: () => void;
}

export const useResumeStore = create<ResumeData & Actions>((set) => ({
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
        employments: []
    },
    personalData: {
        title: 'Personal Data',
        phone: '',
        email: '',
        birthTitle: '',
        birthDate: '' // ISO date string
    },

    setResumeHeader: (header) => set({ header }),
    setResumeProfessionalSummary: (summary) => set({ professionalSummary: summary }),
    setResumeWorkExperience: (workExperience) => set({ workExperience }),
    setResumePersonalData: (personalData) => set({ personalData }),

    resetResumeData: () => set({
        header: { name: '', role: '', image: '' },
        professionalSummary: undefined,
        workExperience: undefined,
        personalData: undefined
    })
}));