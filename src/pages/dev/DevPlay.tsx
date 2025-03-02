import {employerService} from "../../api/employerService.ts";
import {useEmployerStore} from "../../stores/useStore.ts";

export default function DevPlay() {
    async function signupInit() {
        console.log('signupInit click')
        const e = await employerService.signupInit('+85263564764')
        console.dir(e);
    }

    async function getEmployer() {
        console.log('getEmployer click')
        const e = await employerService.getCurrentEmployer('+85263564764')
        console.dir(e);
    }
    async function getEmployers() {
        console.log('getEmployers click')
        const e = await employerService.getEmployers()
        console.dir(e);
    }

    const employer = useEmployerStore((state)=> state.employer)
    const setEmployer = useEmployerStore(state=>state.setEmployer)
    const setJob = useEmployerStore(state=>state.setJob)
    function changePhone() {
        setEmployer({...employer, phone: '1' + employer.phone})
        setJob({
            title: 'test',
            nurseRank: "test",
            salary: "a",
            location: "a",
            onboardDate: "a",
            requirements: "a",
            extraRequirements: "a",
            id: "",
            employerId: ""
        })
    }

    // const job = useJobStore((state)=> state.job)


    return (
        <div className="justify-items-center">
            <div className="text-red-300">
                test {employer.phone}
            </div>
            <p>Job: {employer.job?.title}</p>
            <button onClick={() => signupInit()} className="btn ml-3">signupInit</button>
            <button onClick={() => getEmployer()} className="btn ml-3">getEmployer</button>
            <button onClick={() => getEmployers()} className="btn ml-3">getEmployers</button>
            <hr className="mt-3" />
            <button onClick={() => changePhone()} className="btn ml-3">change phone</button>
            <div className="flex ">

            </div>
        </div>
    )
}
