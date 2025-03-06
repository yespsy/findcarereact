import {createStore} from 'zustand/vanilla'
import {persist} from 'zustand/middleware'
import {Candidate, Employer, Job} from "../entity.ts";

type EmployerStoreState = { employer: Employer, app: App }

type App = {
    isLogin: boolean,
}

type EmployerStoreActions = {
    setEmployer: (employer: Employer) => void,
    setJob: (job: Job) => void,
    addCandidate: (candidate: Candidate) => void,
    removeCandidate: (id: string) => void,
    clear: () => void,
    updateRequirements: (requirements: string, extraRequirements: string) => void,
    setLogin: (loginStatus: boolean) => void
}

type EmployerStore = EmployerStoreState & EmployerStoreActions

export const useEmployerStore = createStore<EmployerStore>()(
    persist(
        (set) => ({
            employer: {name: '', phone: 'unAuthorization', coin: 0, id: '', candidates: []},
            app: {isLogin: true},
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
            removeCandidate: (id) => set(state => {
                let ary: Candidate[] = []
                if (state.employer.candidates) {
                    ary = state.employer.candidates.filter(candidate => candidate.id !== id)
                }
                return {
                    employer: {
                        ...state.employer,
                        candidates: ary
                    }
                }
            }),
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
            },
            setLogin: (loginStatus: boolean) =>
                set(() => ({
                    app: {isLogin: loginStatus}
                }))
        }),
        {name: 'employer-storage'},
    ),
)
