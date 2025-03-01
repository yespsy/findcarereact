import {Nurse} from "../../../entity";
import service from "../../../api/service";
import {useEffect, useRef, useState} from "react";
import {getUrl, remove, uploadData} from 'aws-amplify/storage';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import PdfViewer from "../../common/PdfViewer.tsx";
import DialogModal from "../../common/DialogModal";

export default function Page() {
    const previewPdfRef = useRef(null)
    const selectAvatarFileRef = useRef(null);
    const selectPdfFileRef = useRef(null);
    const [avatarImage, setAvatarImage] = useState<File>();
    const [pdfFile, setPdfFile] = useState<File>();
    const [pdfPath, setPdfPath] = useState<string>('')
    const [pdfDownloadUrl, setPdfDownloadUrl] = useState('')
    const [uploadPdfMsg, setUploadPdfMsg] = useState('')
    const [nurses, setNurses] = useState<Nurse[]>([])
    const [name, setName] = useState<string>('')
    const [rank, setRank] = useState<string>('')
    const [status_, setStatus_] = useState<string>('')
    const [experience, setExperience] = useState<string>('')
    const [avatarPath, setAvatarPath] = useState<string>('')
    const [id, setId] = useState<string>('')
    const style = "ml-1 mr-3 mt-2 bg-green-200"

    const newNurse: Nurse = {
        name, rank, status: status_, experience, avatarPath: "", resumeContent: "", resumePdfPath: "",
    }

    async function addNurse() {
        const newOne = await service().nurseService.add(newNurse);
        // @ts-expect-error ignore
        setId(newOne.id);
        reload().then()
    }

    async function reload() {
        const loadData = await service().nurseService.getNurses(undefined)
        // @ts-expect-error ignore
        setNurses(loadData);
    }

    useEffect(() => {
        reload().then()
    }, []);

    async function deleteNurse(n: Nurse) {
        if (!n.id) return;
        await service().nurseService.delete(n.id);
        //TODO deny
        try {
            await remove({path: n.avatarPath})
        } catch (error) {
            console.log('Error ', error);
            alert(JSON.stringify(error))
        }
        try {
            await remove({path: n.resumePdfPath})
        } catch (error) {
            console.log('Error ', error);
            alert(JSON.stringify(error))
        }
        await reload()
    }

    const uploadAvatar = async () => {
        if (!avatarImage) {
            return;
        }
        if (id === '') {
            alert('ID is empty');
        }
        try {
            const fileExtension = avatarImage.name.split('.').pop();
            const fileName = await avatarImage.arrayBuffer()
                .then((fileBuffer) => window.crypto.subtle.digest('SHA-1', fileBuffer))
                .then((hashBuffer) => {
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map((a) => a.toString(16).padStart(2, '0')).join('');
                    return `${hashHex}.${fileExtension}`;
                });
            const filePath = `files/${fileName}`;
            const result = await uploadData({
                path: filePath,
                data: avatarImage,
            }).result;
            await service().nurseService.updateAvatarPath(id, result.path);
            setAvatarPath(result.path)
            await reload()
        } catch (error) {
            console.log('Error : ', error);
            alert(JSON.stringify(error))
        }
    };

    const selectAvatarImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAvatarImage(event.target.files?.[0]);
    };

    const selectPdfFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPdfFile(event.target.files?.[0]);
        setUploadPdfMsg('')
    };

    async function uploadPdf() {
        if (!pdfFile) {
            return;
        }
        setPdfDownloadUrl('')
        setUploadPdfMsg('');
        try {
            const fileExtension = pdfFile.name.split('.').pop();
            const fileName = await pdfFile.arrayBuffer()
                .then((fileBuffer) => window.crypto.subtle.digest('SHA-1', fileBuffer))
                .then((hashBuffer) => {
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map((a) => a.toString(16).padStart(2, '0')).join('');
                    return `${hashHex}.${fileExtension}`;
                });
            const filePath = `files/${fileName}`;
            const result = await uploadData({
                path: filePath,
                data: pdfFile,
            }).result;
            setPdfPath(result.path)
            const link = await getLinkToPdfFile(filePath);
            await service().nurseService.updateResumePdfPath(id, result.path);
            setPdfDownloadUrl(link)
            await reload()
            setUploadPdfMsg('Upload PDF Success!')
        } catch (error) {
            console.log('Error : ', error);
            setUploadPdfMsg(JSON.stringify(error))
            alert(JSON.stringify(error))
        }
    }

    async function getLinkToPdfFile(path: string) {
        if (path === '') {
            return '';
        }
        const linkToPdfFile = await getUrl({
            path: path,
        });
        return linkToPdfFile.url.toString()
    }

    function previewPdf() {
        // @ts-expect-error skip
        previewPdfRef.current.show();
    }

    function clear() {
        setId('');
        setName('');
        setRank('');
        setStatus_('');
        setExperience('');
        setAvatarPath('');
        setAvatarImage(undefined);
        setUploadPdfMsg('');
        setPdfPath('');
        setPdfDownloadUrl('');
        // @ts-expect-error skip
        selectAvatarFileRef.current.value = "";
        // @ts-expect-error skip
        selectPdfFileRef.current.value = '';
    }

    async function modify(n: Nurse) {
        setId(n.id ? n.id : '');
        setName(n.name);
        setRank(n.rank);
        setStatus_(n.status);
        setExperience(n.experience);
        setAvatarPath(n.avatarPath);
        setAvatarImage(undefined);
        setUploadPdfMsg('');
        setPdfPath(n.resumePdfPath);
        const link = await getLinkToPdfFile(n.resumePdfPath);
        setPdfDownloadUrl(link);
    }

    async function updateNurse() {
        const updateNurse = {id, ...newNurse} as Nurse;
        updateNurse.avatarPath = avatarPath
        updateNurse.resumePdfPath = pdfPath
        console.dir(updateNurse);
        await service().nurseService.update(updateNurse);
        await reload().then()
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex">
                    <form>
                        <div>--- 1 ---</div>
                        <div>ID: {id}</div>
                        <div>Name:<input value={name} className={style} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>Rank:<input value={rank} className={style} onChange={(e) => setRank(e.target.value)}/>
                        </div>
                        <div>Status:<input value={status_} className={style}
                                           onChange={(e) => setStatus_(e.target.value)}/></div>
                        <div>Exp:<input value={experience} className={style}
                                        onChange={(e) => setExperience(e.target.value)}/></div>
                        <button type="button" onClick={() => addNurse()}
                                className="btn btn-sm my-2 bg-primary text-white">Add
                        </button>
                        <button type="button" onClick={() => updateNurse()}
                                className="btn btn-sm my-2 ml-2 bg-primary text-white">update
                        </button>
                        <button type="button" onClick={() => clear()}
                                className="btn btn-sm my-2 bg-primary text-white ml-5">Clear
                        </button>
                    </form>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="w-25 h-30">
                    <div>--- 2 ---</div>
                    <div>ID: {id}</div>
                    {
                        avatarPath !== '' ?
                            <div>
                                <StorageImage alt="avatar" path={avatarPath}/>
                                <p>{avatarPath}</p>
                            </div>
                            : ''
                    }
                    <input type="file" onChange={selectAvatarImage} ref={selectAvatarFileRef}/>
                    <button onClick={uploadAvatar} className="btn-sm btn text-base">Change Avatar</button>
                </div>
                <div className="divider divider-horizontal"></div>
                <div>
                    <div>--- 3 ---</div>
                    <div>ID: {id}</div>
                    {
                        pdfDownloadUrl !== '' ?
                            <div>
                                <a href={pdfDownloadUrl} target="_blank" rel="noreferrer">
                                    Download PDF: {pdfPath}
                                </a>
                                <p>{pdfPath}</p>
                                <button onClick={previewPdf} className="btn-sm btn text-base my-2">Preview PDF
                                </button>
                            </div>
                            : ''
                    }
                    <input type="file" onChange={selectPdfFile} ref={selectPdfFileRef}/>
                    <button onClick={uploadPdf} className="btn-sm btn text-base">Update PDF</button>
                    <div className="text-green-500 text-lg font-bold">{uploadPdfMsg}</div>
                    <DialogModal ref={previewPdfRef}>
                        <PdfViewer src={pdfDownloadUrl}/>
                    </DialogModal>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <table className="table w-fit">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>rank</th>
                        <th>status</th>
                        <th>experience</th>
                        <th>avatarPath</th>
                        <th>resumePdfPath</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        nurses.map((n: Nurse) => {
                            return (
                                <tr key={n.id}>
                                    <td>{n.id}</td>
                                    <td>{n.name}</td>
                                    <td>{n.rank}</td>
                                    <td>{n.status}</td>
                                    <td>{n.experience}</td>
                                    <td className="truncate max-w-30">{n.avatarPath}</td>
                                    <td className="truncate max-w-30">{n.resumePdfPath}</td>
                                    <td>
                                        <button className="bg-secondary px-5 py-0.5 rounded-lg"
                                                onClick={() => deleteNurse(n)}>Del
                                        </button>
                                        <button className="bg-secondary px-3 py-0.5 rounded-lg ml-3"
                                                onClick={() => modify(n)}>Modify
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}
