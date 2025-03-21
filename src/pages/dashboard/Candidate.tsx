import CandidateFilter from "./CandidateFilter.tsx";
import {Nurse} from "../../entity";
import {useRef, useState} from "react";
import PdfViewer from "../common/PdfViewer.tsx";
import DialogModal from "../common/DialogModal";
import {StorageImage} from "@aws-amplify/ui-react-storage";
import {useEmployerStore} from "../../stores/useStore.ts";
import {useStore} from "zustand/react";
import {candidateService} from "../../api/CandidateService.ts";

export default function Page() {
    const employer = useStore(useEmployerStore, state => state.employer)
    const nurses = employer.candidates
    const [filterStr, setFilterStr] = useState('all')
    const previewPdfRef = useRef(null);
    const [previewPdfPath, setPreviewPdfPath] = useState<string>('')

    function split(dateStr: string): string[] {
        if (dateStr === '') {
            return ['', '']
        }
        return dateStr.split(' ')
    }

    function previewPDf(nurse: Nurse | undefined) {
        if (!nurse) return;
        setPreviewPdfPath(nurse.resumePdfPath)
        // @ts-expect-error skip
        previewPdfRef.current.show();
    }

    function getCandidateCount() {
        if (!nurses) {
            return '0'
        } else {
            return nurses?.length
        }
    }

    async function disFavor(id: string) {
        const isSuc = await candidateService.disfavor(id)
        if (isSuc) {
            useEmployerStore.getState().removeCandidate(id)
        }
    }

    return (
        <div className="bg-white rounded-xl mb-5">
            <div className="flex text-24px font-bold ml-7 mt-5 justify-between mr-4">
                <div>候選人({getCandidateCount()})</div>
                <div className="text-22px text-primary font-normal">面試幣剩餘&nbsp;：{employer.coin}</div>
            </div>
            <div>
                <CandidateFilter update={setFilterStr}/>
            </div>
            <div className="h-[605px] mr-3 overflow-auto mb-3">
                <table className="table-auto w-full">
                    {nurses?.map((c, i) => {
                        if ((filterStr === 'favor' && !c.isFavor)
                            || (filterStr === 'new' && !c.isNew)
                            || (filterStr === 'interviewed' && !c.isAlreadyInterviewed)) {
                            return '';
                        } else {
                            return (
                                <tbody key={i}>
                                {i == 0 ? (
                                    <tr className="sticky top-0 z-20 bg-white">
                                        <td></td>
                                        <td></td>
                                        <td className="text-22px font-normal text-nowrap text-center">護理員狀態</td>
                                        <td className="text-22px font-normal text-nowrap text-center">預約面試時間</td>
                                        <td></td>
                                    </tr>
                                ) : (<></>)}
                                {i >= 1 ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="divider mr-5 my-1"></div>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td className="leading-[5px]">&nbsp;</td>
                                    </tr>
                                )}
                                <tr key={i}>
                                    <td className="flex w-fit">
                                        <div className="avatar ml-5 min-w-[80px]">
                                            <div className="rounded-full mask mask-circle">
                                                <div className="w-[77px] h-[77px]">
                                                    <StorageImage alt="findcare" path={c.nurse ? c.nurse.avatarPath : ''} sizes="(max-width: 100%) 50vw (max-height: 100%) 50vw" objectFit="cover" objectPosition="50% 50%"></StorageImage>
                                                </div>
                                            </div>
                                            {c.isFavor ? (<div className="w-[25px] h-[25px] z-10 absolute ml-14 -mt-2 hover:cursor-pointer" onClick={() => disFavor(c.id)}><img
                                                src="/dashboard/favor.png" alt=""/></div>) : <></>}
                                        </div>
                                        <div className="ml-3 w-full">
                                            <div className="text-3xl font-bold">{c.nurse ? c.nurse.name : ''}</div>
                                            <div className="text-xl text-gray-400 font-normal break-keep text-nowrap">Preview PDF</div>
                                        </div>
                                    </td>
                                    <td className="w-fit">
                                        <div onClick={() => previewPDf(c.nurse)} className="hover:cursor-pointer w-fit">
                                            <img src='/common/pdf_download.png' alt="" width={50} height={50} className="pt-1 min-w-[50px]"></img>
                                        </div>
                                    </td>
                                    <td className="justify-items-center">
                                        <div className="bg-warning py-1 px-3 rounded-xl text-white text-22px  font-bold w-fit hover:cursor-pointer">
                                            <p className="w-[46px]">{c.status}</p>
                                        </div>
                                    </td>
                                    <td className="text-center text-xl text-primary">{split(c.interviewDate)[0]}<br/>{split(c.interviewDate)[1]}
                                    </td>
                                    <td className="w-fit"></td>
                                </tr>
                                </tbody>
                            )
                        }
                    })}
                </table>
                <DialogModal ref={previewPdfRef}>
                    <PdfViewer src={previewPdfPath}/>
                </DialogModal>
            </div>
        </div>
    );
}
