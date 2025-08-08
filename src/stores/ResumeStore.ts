import { create } from 'zustand';
import type { ResumeData } from '../types/ResumeData';

type Actions = {
    setResumeId: (id: string) => void;
    setResumeHeader: (header: ResumeData['header']) => void;
    setResumeProfessionalSummary: (summary: ResumeData['professionalSummary']) => void;
    setResumeWorkExperience: (workExperience: ResumeData['workExperience']) => void;
    addEducationInstitution: (institution: ResumeData['education']['institutions'][number]) => void;
    setEducation: (education: ResumeData['education']) => void;
    removeEducationInstitution: (education: ResumeData['education']['institutions'][number]) => void;
    updateEducationInstitution: (institution: ResumeData['education']['institutions'][number]) => void;
    addEmployment: (employment: ResumeData['workExperience']['employments'][number]) => void;
    removeEmployment: (employmentId: string) => void;
    updateEmployment: (employment: ResumeData['workExperience']['employments'][number]) => void;
    setResumePersonalData: (personalData: ResumeData['personalData']) => void;
    setResumeLinks: (links: ResumeData['links']) => void;
    updateResumeLink: (link: ResumeData['links']['links'][number]) => void;
    addResumeLink: (link: ResumeData['links']['links'][number]) => void;
    removeResumeLink: (linkId: string) => void;
    setSkillSet: (skillSet: ResumeData['skillSet']) => void;
    updateSkill: (skill: ResumeData['skillSet']['skills'][number]) => void;
    addSkill: (skill: ResumeData['skillSet']['skills'][number]) => void;
    removeSkill: (skillId: string) => void;
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
                startDate: new Date(), // Current date as default
                description: 'Description of the job responsibilities and achievements.'
            }
        ]
    },
    personalData: {
        title: 'Personal Data',
        phone: '+00 (00) 123 4567',
        email: 'email@provider.com',
        birthTitle: 'Born on',
        birthDate: new Date() // ISO date string
    },
    education: {
        title: 'Education',
        institutions: [
            {
                id: '1',
                name: 'Institution Name',
                degree: 'Degree Title',
                startDate: new Date(), // Current date as default
                endDate: undefined, // Optional end date
                description: 'Description of the degree and any relevant coursework or achievements.'
            }
        ]
    }
    ,
    links: {
        title: 'Links',
        links: []
    },
    skillSet: {
        title: 'Skills',
        skills: []
    }
}

export const useResumeStore = create<ResumeData & Actions>((set) => ({
    ...initialState,
    setResumeId: (id) => set({ id }),
    setResumeHeader: (header) => set({ header }),
    setResumeProfessionalSummary: (summary) => set({ professionalSummary: summary }),
    setResumeWorkExperience: (workExperience) => set({ workExperience }),
    setResumePersonalData: (personalData) => set({ personalData }),
    setEducation: (education) => set({ education }),
    addEducationInstitution: (institution) => set((state) => ({
        education: {
            ...state.education,
            institutions: [...state.education.institutions, institution]
        }
    })),
    updateEducationInstitution: (institution) => set((state) => ({
        education: {
            ...state.education,
            institutions: state.education.institutions.map(i =>
                i.id === institution.id ? institution : i
            )
        }
    })),
    removeEducationInstitution: (institution) => set((state) => ({
        education: {
            ...state.education,
            institutions: state.education.institutions.filter(i => i.id !== institution.id)
        }
    })),
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
    setResumeLinks: (links) => set({ links }),
    addResumeLink: (link) => set((state) => ({
        links: {
            ...state.links,
            links: [...state.links.links, link]
        }
    })),
    updateResumeLink: (link) => set((state) => ({
        links: {
            ...state.links,
            links: state.links.links.map(l =>
                l.id === link.id ? link : l
            )
        }
    })),
    removeResumeLink: (linkId) => set((state) => ({
        links: {
            ...state.links,
            links: state.links.links.filter(l => l.id !== linkId)
        }
    })),
    setSkillSet: (skillSet) => set({ skillSet }),
    updateSkill: (skill) => set((state) => ({
        skillSet: {
            ...state.skillSet,
            skills: state.skillSet.skills.map(s =>
                s.id === skill.id ? skill : s
            )
        }
    })),
    addSkill: (skill) => set((state) => ({
        skillSet: {
            ...state.skillSet,
            skills: [...state.skillSet.skills, skill]
        }
    })),
    removeSkill: (skillId) => set((state) => ({
        skillSet: {
            ...state.skillSet,
            skills: state.skillSet.skills.filter(s => s.id !== skillId)
        }
    })),
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
        a.download = `resume_${state.id.replaceAll(" ", "")}.json`;
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