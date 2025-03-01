import { create } from 'zustand'
import {Employer} from "../entity.ts";

interface BearState {
    bears: number
    increase: (by?:number) => void
}

const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    increase: (by?:number) => set((state) => ({ bears: state.bears + (by||1) })),
}))

interface EmployerState {
    employer: Employer,
    setEmployer: (employer: Employer) => void,
}

export const useEmployerStore = create<EmployerState>()((set) => ({
    employer: {name: '', phone: 'fromStore', coin: 0},
    setEmployer: (employer: Employer) => set(() => ({employer : employer})),
}))

export default useBearStore;
