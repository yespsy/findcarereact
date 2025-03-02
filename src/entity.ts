import {Schema} from "../amplify/data/resource.ts";

export interface Nurse {
    id?: string;
    name: string,
    rank: string,
    status: string,
    experience: string,
    avatarPath: string,
    resumeContent: string,
    resumePdfPath: string,
}

export interface Employer {
    id?: string;
    name: string,
    phone: string,
    coin: number,
    job?: Job,
    candidates?: Candidate[]
}

export interface Job {
    id?: string,
    employerId?: string,
    title: string,
    nurseRank: string,
    salary: string,
    location: string,
    onboardDate: string,
    requirements: string,
    extraRequirements: string,
}

export interface Candidate {
    id?: string;
    nurse?: Nurse,
    status: string,
    interviewDate: string,
    isFavor: boolean,
    isNew: boolean,
    isAlreadyInterviewed: boolean
}

export type EmployerDO = Schema['Employer']['type'];
export type JobDO = Schema['Job']['type'];
