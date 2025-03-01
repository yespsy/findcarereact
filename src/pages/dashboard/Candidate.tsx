import CandidateFilter from "./candidateFilter";
import {Employer, Nurse} from "../../entity";
import {useRef, useState} from "react";
import PdfViewer from "../common/PdfViewer.tsx";
import DialogModal from "../common/DialogModal";

interface CandidateProps {
    employer: Employer
}

export default function Page({employer}: CandidateProps) {
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

    return (
        <div className="bg-white rounded-xl">
            <div className="flex text-2xl font-bold ml-7 mt-5 justify-between mr-6">
                <p>候選人</p>
                <p className="text-xl text-primary font-normal">面試幣剩餘&nbsp;：{employer.coin}</p>
            </div>
            <div>
                <CandidateFilter update={setFilterStr}/>
            </div>
            <div className="min-h-96">
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>護理員狀態</th>
                        <th>預約面試時間</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {nurses?.map((c, i) => {
                        if ((filterStr === 'favor' && !c.isFavor)
                            || (filterStr === 'new' && !c.isNew)
                            || (filterStr === 'interviewed' && !c.isAlreadyInterviewed)) {
                            return '';
                        } else {
                            return (
                                <tr key={i}>
                                    <td className="flex w-fit">
                                        <div className="avatar ml-5 min-w-[80px]">
                                            <div className="rounded-full mask mask-circle">
                                                <div className="w-[70px] h-[70px]">
                                                    <img src={c.nurse ? c.nurse.avatarPath : ''} alt="" className=""
                                                         sizes="(max-width: 100%) 50vw (max-height: 100%) 50vw"></img>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-3xl font-bold">{c.nurse ? c.nurse.name : ''}</div>
                                            <div className="text-xl text-gray-400 font-normal break-keep text-nowrap">Preview PDF</div>
                                        </div>
                                        <div onClick={() => previewPDf(c.nurse)} className="hover:cursor-pointer">
                                            <img src='../../../public/common/pdf_download.png' alt="" width={50} height={50} className="pt-3 ml-8 min-w-[40px]"></img>
                                        </div>

                                    </td>
                                    <td className="justify-items-center">
                                        <div
                                            className="bg-primary p-2 px-4 rounded-xl text-white text-xl font-bold w-fit break-keep">{c.status}</div>
                                    </td>
                                    <td className="text-center text-xl text-primary">{split(c.interviewDate)[0]}<br/>{split(c.interviewDate)[1]}
                                    </td>
                                    <td className="w-fit"></td>
                                </tr>
                            )
                        }
                    })}
                    </tbody>
                </table>
                <DialogModal ref={previewPdfRef}>
                    <PdfViewer src={previewPdfPath}/>
                </DialogModal>
            </div>
        </div>
    );
}
