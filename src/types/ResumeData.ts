import type { Employment } from "./Employment";

export interface ResumeHeader {
    name: string;
    role: string;
    image: string;
}

export interface ResumeProfessionalSummary {
    title: string;
    summary: string;
}

export interface ResumeWorkExperience {
    title: string;
    employments: Employment[];
}

export interface ResumePersonalData {
    title: string;
    phone: string;
    email: string;
    birthTitle: string;
    birthDate: string; // ISO date string
}

export interface ResumeData {
    id: string;
    header: ResumeHeader
    professionalSummary: ResumeProfessionalSummary;
    workExperience: ResumeWorkExperience;
    personalData: ResumePersonalData;
}
