import service from "../../api/service";
import {Nurse} from "../../entity";
import {useEffect, useRef, useState} from "react";
import {StorageImage} from '@aws-amplify/ui-react-storage';
import {getUrl} from 'aws-amplify/storage';
import DialogModal from "../common/DialogModal";
import PdfViewer from "../common/PdfViewer.tsx";

export default function NurseCarousel() {
    const [nurses, setNurses] = useState<Nurse[]>([])
    const [pdfDownloadLink, setPdfDownloadLink] = useState('')
    const previewPdfRef = useRef(null)

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
            const data = await service().nurseService?.getNurses(3);
            // @ts-expect-error ignore
            setNurses(data);
        }

        loadData().then()
    }, []);
    return (
        <>
            <div className="flex flex-row justify-between pt-8 mr-8">
                {nurses.map((n) => (
                    <div key={n.id} className="max-w-full w-[235px] border-2 shadow-lg rounded-2xl bg-white">
                        <div className="flex justify-around p-0.5">
                            <StorageImage alt="findcare" path={n.avatarPath} width={227} height={170} objectFit="cover" objectPosition="50% 50%" className="rounded-xl p-0.5"/>
                        </div>
                        <div className="flex flex-row max-w-full justify-between mx-3 my-1">
                            <p className="text-lg font-bold">{n.name}</p>
                            <p className="text-secondary text-sm font-bold pt-1">{n.rank}</p>
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
                            <p className="font-bold" onClick={() => previewPdf(n.resumePdfPath)}>
                                <img src="/common/pdf_download.png" alt={""} width={25} height={25}/>
                            </p>
                            <DialogModal ref={previewPdfRef}>
                                <PdfViewer src={pdfDownloadLink}></PdfViewer>
                            </DialogModal>
                        </div>
                    </div>
                ))}
            </div>
        </>);
}

