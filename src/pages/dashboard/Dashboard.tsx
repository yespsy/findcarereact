import JobDetail from "./JobDetail";
import Candidate from "./Candidate";
import Recommend from "./Recommend.tsx";
import {useEmployerStore} from "../../stores/useStore.ts";
import {useStore} from "zustand/react";

export default function Dashboard() {
    const employer = useStore(useEmployerStore, state => state.employer)
    return (
        <>
            <div className="bg-base-100">
                <div className="flex justify-around">
                    <div className="flex flex-col md:basis-full lg:basis-11/12 xl:basis-10/12 2xl:basis-9/12">
                        <div className="float-left"></div>
                        <div className="font-bold text-3xl py-6 text-primary">
                            {employer.phone}，您好!
                        </div>
                        <div>
                            <JobDetail></JobDetail>
                        </div>
                        <div className="flex justify-around mt-4">
                            <div className="flex flex-col w-full  pr-6">
                                <Candidate></Candidate>
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
