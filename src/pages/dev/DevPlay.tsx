import {employerService} from "../../api/employerService.ts";

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

    return (
        <div className="justify-items-center">
            <div className="text-red-300">
                test
            </div>

            <button onClick={() => signupInit()} className="btn ml-3">signupInit</button>
            <button onClick={() => getEmployer()} className="btn ml-3">getEmployer</button>
            <button onClick={() => getEmployers()} className="btn ml-3">getEmployers</button>
            <div className="flex ">

            </div>
        </div>
    )
}
