import service from "../../api/service";
import {useEffect, useRef, useState} from "react";
import {Nurse} from "../../entity";
import {StorageImage} from "@aws-amplify/ui-react-storage";
import PdfViewer from "../../pages/common/PdfViewer";
import DialogModal from "../../pages/common/DialogModal";
import {getUrl} from "aws-amplify/storage";
import {useEmployerStore} from "../../stores/useStore.ts";
import {useStore} from "zustand/react";
import {candidateService} from "../../api/CandidateService.ts";

export default function Recommend() {
    const [nurses, setNurses] = useState<Nurse[]>([]);
    const previewPdfRef = useRef(null)
    const [pdfDownloadLink, setPdfDownloadLink] = useState('')
    const employer = useStore(useEmployerStore, state => state.employer)
    const addCandidate = useStore(useEmployerStore, state => state.addCandidate)

    async function previewPdf(url: string) {
        const link = await genPdfViewer(url)
        setPdfDownloadLink(link);
        // @ts-expect-error skip
        previewPdfRef.current.show();
    }

    async function genPdfViewer(path: string) {
        const linkToPdfFile = await getUrl({
            path: path,
        });
        return linkToPdfFile.url.toString()
    }

    useEffect(() => {
        async function loadData() {
            const data = await service().nurseService.getNurses(4);
            // @ts-expect-error ignore
            setNurses(data);
        }

        loadData().then()
    }, []);
    const isFavor = false;

    async function favor(nurseId: string | undefined) {
        if (!nurseId) return;
        // 不加重复的
        if(useEmployerStore.getState().employer.candidates?.find(candidate => candidate?.nurse?.id === nurseId)){
            return
        }
        const candidate = await candidateService.add(employer.id, nurseId, true);
        if (candidate) addCandidate(candidate)
    }

    return (
        <>
            <div className="flex justify-between">
                <p className="ml-5 mt-5 font-bold text-2xl">智能推薦</p>
                <div className="mr-6 mt-5 hover:cursor-pointer"><img src='/common/icon_refresh.png' alt="" className="w-8 h-8 inline"></img><span
                    className="ml-2 underline underline-offset-4 text-primary text-xl">換一批</span></div>
            </div>
            <div className="pb-14 ml-1 min-w-[485px]">
                {nurses.map((n) => (
                    <div key={n.id}
                         className="ml-4 mt-6 w-[220px] border-2 shadow-lg rounded-2xl inline-block">
                        <div><StorageImage alt="findcare" path={n.avatarPath} width={220} height={165} objectFit="cover" objectPosition="50% 50%" className="rounded-xl p-0.5"/></div>
                        <div className="flex flex-row max-w-full justify-between mx-3 my-1">
                            <div className="flex flex-row">
                                <div className="flex text-lg font-bold w-fit">{n.name}</div>
                                <div><img onClick={() => favor(n.id)} src={isFavor ? '/common/icon_favor.png' : '/common/icon_no_favor.png'}
                                           alt=""
                                           width={20} height={20} className="ml-2 hover:cursor-pointer"/></div>
                            </div>
                            <p className="text-secondary text-sm font-bold pt-0.5">{n.rank}</p>
                        </div>
                        <div className="rounded-lg bg-[#43A047] max-w-fit ml-3">
                            <p className="text-white text-xs px-3 py-0.5">{n.status}</p>
                        </div>
                        <div className="flex flex-row max-w-full justify-between mx-3 mt-2 text-xs">
                            <p className="text-gray-400 font-bold">Experience</p>
                            <p className="font-bold text-nowrap">{n.experience}</p>
                        </div>
                        <div className="flex flex-row max-w-full justify-between mx-3 my-1 text-xs">
                            <p className="text-gray-400 font-bold mt-1">Preview PDF</p>
                            <p className="font-bold hover:cursor-pointer" onClick={() => previewPdf(n.resumePdfPath)}>
                                <img src='/common/pdf_download.png' alt={""} width={25} height={25}/>
                            </p>
                            <DialogModal ref={previewPdfRef}>
                                <PdfViewer src={pdfDownloadLink}></PdfViewer>
                            </DialogModal>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

