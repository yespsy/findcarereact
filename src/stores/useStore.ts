import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import {Employer, Job} from "../entity.ts";

type EmployerStoreState = { employer: Employer, }

type EmployerStoreActions = {
    setEmployer: (employer: Employer) => void,
    setJob: (job: Job) => void,
    clear: ()=>void
}

type EmployerStore = EmployerStoreState & EmployerStoreActions

export const useEmployerStore = createStore<EmployerStore>()(
    persist(
        (set) => ({
            employer: {name: '', phone: 'unAuthorization', coin: 0, id: ''},
            setEmployer: (nextEmployer: Employer) => set(() => ({employer: nextEmployer})),
            setJob: (job) => {
                set(state => ({
                    employer: {
                        ...state.employer,
                        job: job
                    }
                }))
            },
            clear: ()=>set(()=>({employer:{name: '', phone: 'clear', coin: 0, id: ''}}))
        }),
        { name: 'employer-storage' },
    ),
)
