import {createStore} from 'zustand/vanilla'
import {persist} from 'zustand/middleware'
import {Candidate, Employer, Job} from "../entity.ts";

type EmployerStoreState = { employer: Employer, }

type EmployerStoreActions = {
    setEmployer: (employer: Employer) => void,
    setJob: (job: Job) => void,
    addCandidate: (candidate: Candidate) => void,
    clear: () => void
    updateRequirements: (requirements: string, extraRequirements: string) => void
}

type EmployerStore = EmployerStoreState & EmployerStoreActions

export const useEmployerStore = createStore<EmployerStore>()(
    persist(
        (set) => ({
            employer: {name: '', phone: 'unAuthorization', coin: 0, id: '', candidates: []},
            setEmployer: (nextEmployer: Employer) => set(() => ({employer: nextEmployer})),
            setJob: (job) => {
                set(state => ({
                    employer: {
                        ...state.employer,
                        job: job
                    }
                }))
            },
            clear: () => set(() => ({employer: {name: '', phone: '', coin: 0, id: '', candidates: []}})),
            addCandidate: (candidate) => {
                if (candidate == null) {
                    return
                }
                set(state => {
                    if (!state.employer.candidates) {
                        state.employer.candidates = []
                    }
                    return {
                        employer: {
                            ...state.employer,
                            candidates: [...state.employer.candidates, candidate]
                        }
                    }
                })
            },
            updateRequirements: (requirements, extraRequirements) => {
                set(state => {
                    if (!state.employer.job) {
                        return {employer: state.employer}
                    }
                    return {
                        employer: {
                            ...state.employer,
                            job: {
                                ...state.employer.job,
                                requirements: requirements,
                                extraRequirements: extraRequirements
                           }
                        }
                    }
                })
            }
        }),
        {name: 'employer-storage'},
    ),
)
