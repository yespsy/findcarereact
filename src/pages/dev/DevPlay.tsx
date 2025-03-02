import {useStore} from "zustand/react";
import {employerService} from "../../api/employerService.ts";
import {useEmployerStore} from "../../stores/useStore.ts";
import CurrentUser from "../dashboard/CurrentUser.tsx";

export default function DevPlay() {
    const employer = useStore(useEmployerStore, state => state.employer)
    const setEmployer = useStore(useEmployerStore, state => state.setEmployer)

    async function signupInit() {
        const e = await employerService.signupInit('+85263564764')
        console.dir(e);
    }

    async function getCurrentEmployer() {
        console.log('getCurrentEmployer click')
        const e = await employerService.getCurrentEmployer('+85263564764')
        console.dir(e);
        if (e != null) {
            // useEmployerStore.getState().setEmployer(e)
            setEmployer(e)
        }
        // console.dir(e);
        // console.log('old employer')
        // console.dir(employer);
        // const n = useEmployerStore.getState().employer
        // console.log('new fetch employer')
        // console.dir(n);
    }

    async function getEmployers() {
        console.log('getEmployers click')
        const e = await employerService.getEmployers()
        console.dir(e);
    }

    function changePhone() {
        setEmployer({...employer, phone: employer.phone + '_2'})
    }

    function clearStore() {
        // useEmployerStore.getState().clear();
    }

    return (
        <div className="justify-items-center">
            <CurrentUser></CurrentUser>
            <div className="text-red-300">
                test {employer.phone}
            </div>
            <p>Job: {employer.job?.title}</p>
            <button onClick={() => signupInit()} className="btn ml-3">signupInit</button>
            <button onClick={() => getCurrentEmployer()} className="btn ml-3">getCurrentEmployer</button>
            <button onClick={() => getEmployers()} className="btn ml-3">getEmployers</button>
            <hr className="mt-3"/>
            <button onClick={() => changePhone()} className="btn ml-3">change phone</button>
            <button onClick={() => clearStore()} className="btn ml-3">Clear store</button>
            <div className="flex ">
                Store Employer:
            </div>
        </div>
    )
}
