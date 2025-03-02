import {Employer} from "../../entity";

interface JobDetailProps {
    employer: Employer
}

export default function JobDetail({employer}: JobDetailProps) {
    const job = employer.job;
    return (
        <div className="bg-white w-full mb-3 rounded-2xl">
            <div className="text-2xl pl-7 pt-5 font-bold">
                <span>發布的職位 (1/1)</span><span className="ml-8 text-primary">{job?.title}</span>
            </div>
            <img src='/common/icon_edit.png' alt="" className="float-right mr-6" width={45} height={45}></img>
            <div className="text-xl pl-7 pt-3 font-bold">
                <span>{job?.nurseRank}</span><span className="ml-8 text-secondary">{job?.salary}</span>
            </div>
            <div className="text-lg pl-7 pt-1">
                <span className="text-gray-400">{job?.location} | {job?.onboardDate}</span>
            </div>
            <div className="min-h-24 rounded-lg bg-base-100 mx-7 mt-3 pb-3 shadow-lg shadow-gray-300">
                <div className="text-xl pl-5 pt-4 font-bold">職位要求&nbsp;：</div>
                <p className="mx-5 my-2 text-lg whitespace-pre-wrap font-medium">{job?.requirements}</p>
            </div>
            <div className="min-h-24 rounded-lg bg-base-100 mx-7 mt-6 pb-3 shadow-lg shadow-gray-300">
                <div className="text-xl pl-5 pt-4 font-bold">其他要求&nbsp;：</div>
                <p className="mx-5 mt-2 text-lg whitespace-pre-wrap font-medium">{job?.extraRequirements}</p>
            </div>
            <br/>
        </div>
    );
}
