export interface EducationInstitution {
    id: string;
    name: string;
    degree: string;
    startDate: string; // ISO date string
    endDate?: string; // ISO date string, optional for current education
    description: string;
}