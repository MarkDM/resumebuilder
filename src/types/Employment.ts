export interface Employment {
    id: string;
    companyName: string;
    jobTitle: string;
    startDate: string; // ISO date string
    endDate?: string; // ISO date string, optional for current jobs
    description: string;
}