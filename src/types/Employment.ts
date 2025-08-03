export interface Employment {
    id: string;
    companyName: string;
    jobTitle: string;
    startDate: Date; 
    endDate?: Date;
    description: string;
}