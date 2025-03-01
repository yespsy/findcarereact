import JobDetail from "./JobDetail";
import Candidate from "./Candidate";
import {employerService} from "../../api/employerService";
import Recommend from "./Recommend.tsx";
import CurrentUser from "./CurrentUser.tsx";
import {useEmployerStore} from "../../stores/useStore.ts";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import {Employer} from "../../entity.ts";

export default function Dashboard() {
    const employer = useEmployerStore((state)=> state.employer)

    const setEmployer = useEmployerStore((state)=> state.setEmployer)
    useEffect(() => {
        async function get() {
            try {
                const {username, signInDetails} = await getCurrentUser();
                console.log(`username: ${username} loginId: ${signInDetails?.loginId}`);
                setEmployer({
                    phone: username,
                    name: username,
                    coin: 0
                })
                const employer = await employerService.getCurrentEmployer(username)
                console.dir(employer);
                const setOne:Employer = {
                    phone: username,
                    name: username,
                    coin: 0
                }
                if(employer?.job){
                    //setOne.job = employer.job
                }
                setEmployer(setOne)
            } catch (e) {
                console.log(e)
            }
        }
        get().then();
    }, []);


    return (
        <>
            <div className="bg-base-100">
                <div className="flex justify-around">
                    <div className="flex flex-col md:basis-full lg:basis-11/12 xl:basis-10/12 2xl:basis-9/12">
                        <div className="float-left"></div>
                        <div className="font-bold text-3xl py-6 text-primary">
                            {employer.phone}，您好!<CurrentUser></CurrentUser>
                        </div>
                        <div>
                            <JobDetail employer={employer}></JobDetail>
                        </div>
                        <div className="flex justify-around mt-2">
                            <div className="flex flex-col w-full  pr-3">
                                <Candidate employer={employer}></Candidate>
                            </div>
                            <div className=" bg-white rounded-2xl h-fit max-w-[500px]">
                                <Recommend></Recommend>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
