export interface EducationInstitution {
    id: string;
    name: string;
    degree: string;
    startDate: Date; // ISO date string
    endDate?: Date; // ISO date string, optional for current education
    description: string;
}