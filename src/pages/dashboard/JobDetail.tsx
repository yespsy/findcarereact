import {useState} from "react";
import {jobService} from "../../api/jobService.ts";
import {useEmployerStore} from "../../stores/useStore.ts";
import {useStore} from "zustand/react";

export default function JobDetail() {
    const employer = useStore(useEmployerStore, state => state.employer)
    const updateRequirements = useStore(useEmployerStore, state => state.updateRequirements)
    const [onEdit, setOnEdit] = useState(false)
    const [editRequirements, setEditRequirements] = useState('')
    const [editExtraRequirements, setEditExtraRequirements] = useState('')
    const job = employer.job;

    function switchEdit() {
        if (!onEdit) {
            setEditRequirements(job!.requirements);
            setEditExtraRequirements(job!.extraRequirements);
            setOnEdit(true);
        }
    }

    async function save() {
        const flag = await jobService.updateRequirements(job!.id, job!.requirements, job!.extraRequirements);
        if (flag) updateRequirements(editRequirements, editExtraRequirements)
        setOnEdit(false);
    }

    function close() {
        setOnEdit(false);
    }

    return (
        <div className="bg-white w-full mb-3 rounded-2xl">
            <div className="text-3xl pl-7 pt-5 font-bold">
                <span>發布的職位 (1/1)</span><span className="ml-8 text-primary">{job?.title}</span>
            </div>
            {onEdit ? (
                <>
                    <img src='/common/icon_close.png' alt="" className="float-right mr-6 hover:cursor-pointer" width={45} height={45}
                         onClick={() => close()}></img>
                    <img src='/common/icon_save.png' alt="" className="float-right mr-6 hover:cursor-pointer" width={45} height={45}
                         onClick={() => save()}></img>
                </>
            ) : (
                <>
                    <img src='/common/icon_edit.png' alt="" className="float-right mr-6 hover:cursor-pointer" width={45} height={45}
                         onClick={() => switchEdit()}></img>
                </>
            )}
            <div className="text-22p pl-7 pt-3 font-bold">
                <span>{job?.nurseRank}</span><span className="ml-8 text-[#EFAAE9]">{job?.salary}</span>
            </div>
            <div className="text-16p pl-7 pt-1">
                <span className="text-gray-400">{job?.location} | {job?.onboardDate}</span>
            </div>
            <div className="min-h-36 rounded-lg bg-base-100 mx-7 mt-3 pb-3 shadow-lg shadow-gray-300">
                <div className="text-xl pl-5 pt-4 font-bold">職位要求&nbsp;：</div>
                {
                    onEdit ? <textarea className="textarea textarea-lg bg-white w-11/12 ml-3 mt-3 text-lg min-h-52"
                                       value={editRequirements} onChange={(e) => setEditRequirements(e.target.value)}></textarea>
                        : <p className="mx-5 my-2 text-lg whitespace-pre-wrap font-medium">{job?.requirements}</p>
                }
            </div>
            <div className="min-h-24 rounded-lg bg-base-100 mx-7 mt-6 pb-3 shadow-lg shadow-gray-300">
                <div className="text-xl pl-5 pt-4 font-bold">其他要求&nbsp;：</div>

                {
                    onEdit ? <textarea className="textarea textarea-lg bg-white w-11/12 ml-3 mt-3 text-lg min-h-52"
                                       value={editExtraRequirements} onChange={(e) => setEditExtraRequirements(e.target.value)}></textarea>
                        : <p className="mx-5 mt-2 text-lg whitespace-pre-wrap font-medium">{job?.extraRequirements}</p>
                }
            </div>
            <br/>
        </div>
    )
}
