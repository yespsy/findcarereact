import {create} from 'zustand'
import {Employer, Job} from "../entity.ts";

//TODO 保守狀態於localStorage，避免頁面刷新後資料消失

interface EmployerState {
    employer: Employer,
    setEmployer: (employer: Employer) => void,
    setJob: (job: Job) => void,
}

export const useEmployerStore = create<EmployerState>()((set) => ({
    employer: {
        name: '', phone: 'unAuthorization', coin: 0, id: ''
    },
    setEmployer: (employer: Employer) => set(() => ({employer: employer})),
    setJob: (job) => {
        set(state => ({
            employer: {
                ...state.employer,
                job: job
            }
        }))
    }
}))

interface JobState {
    job: Job,
    setJob: (job: Job) => void,
}

export const useJobStore = create<JobState>()((set) => ({
    job: {
        title: '',
        nurseRank: '',
        salary: '',
        location: '',
        onboardDate: '',
        requirements: '',
        extraRequirements: '',
        id: '',
        employerId: ''
    },
    setJob: (job: Job) => set(() => ({job: job})),
}))
