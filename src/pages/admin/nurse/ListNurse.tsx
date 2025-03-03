import {Nurse} from "../../../entity";
import service from "../../../api/service";
import {useEffect, useRef, useState} from "react";
import {getUrl, remove, uploadData} from 'aws-amplify/storage';
import {StorageImage} from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import PdfViewer from "../../common/PdfViewer.tsx";
import DialogModal from "../../common/DialogModal";
import { Space, Table, Form, FormProps,TableProps,Button, Input  } from 'antd';

export default function ListNurse() {
    const previewPdfRef = useRef(null)
    const selectAvatarFileRef = useRef(null);
    const selectPdfFileRef = useRef(null);
    const [avatarImage, setAvatarImage] = useState<File>();
    const [pdfFile, setPdfFile] = useState<File>();
    const [pdfPath, setPdfPath] = useState<string>('')
    const [pdfDownloadUrl, setPdfDownloadUrl] = useState('')
    const [uploadPdfMsg, setUploadPdfMsg] = useState('')
    const [nurses, setNurses] = useState<Nurse[]>([])
    // const [name, setName] = useState<string>('')
    // const [rank, setRank] = useState<string>('')
    // const [status_, setStatus_] = useState<string>('')
    // const [experience, setExperience] = useState<string>('')
    const [avatarPath, setAvatarPath] = useState<string>('')
    const [id, setId] = useState<string>('')

    async function addNurse() {
        const vs = form.getFieldsValue();
        const newOne = await service().nurseService.add(vs);
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
        setAvatarPath('');
        setAvatarImage(undefined);
        setUploadPdfMsg('');
        setPdfPath('');
        setPdfDownloadUrl('');
        // @ts-expect-error skip
        selectAvatarFileRef.current.value = "";
        // @ts-expect-error skip
        selectPdfFileRef.current.value = '';
        form.resetFields();
    }

    const [form] = Form.useForm();
    async function modify(n: Nurse) {
        form.setFieldsValue(n)
        setAvatarPath(n.avatarPath);
        setAvatarImage(undefined);
        setUploadPdfMsg('');
        setPdfPath(n.resumePdfPath);
        const link = await getLinkToPdfFile(n.resumePdfPath);
        setPdfDownloadUrl(link);
    }

    async function updateNurse() {
        // const updateNurse = {...newNurse} as Nurse;
        // updateNurse.avatarPath = avatarPath
        // updateNurse.resumePdfPath = pdfPath
        // console.dir(updateNurse);
        const update = form.getFieldsValue();
        await service().nurseService.update(update);
        await reload().then()
    }

    const columns: TableProps<Nurse>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'AvatarPath',
            dataIndex: 'avatarPath',
            key: 'avatarPath',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Resume Pdf Path',
            dataIndex: 'resumePdfPath',
            key: 'resumePdfPath',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => deleteNurse(record)} className="bg-base-100">Del</Button>
                    <Button onClick={()=>modify(record)} className="bg-base-100">Modify</Button>
                </Space>
            ),
        },
    ]

    const onFinish: FormProps<Nurse>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<Nurse>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="flex justify-items-center">
                    <Form name="basic" labelCol={{ span: 8 }} style={{ maxWidth: 300 }} initialValues={{ remember: true }}
                          form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size='small' autoComplete="off">
                        <div>----------------------- 1 ---------------------</div>
                        <Form.Item<Nurse> label="ID" name="id">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item<Nurse> label="Name" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item<Nurse> label="Rank" name="rank">
                            <Input />
                        </Form.Item>
                        <Form.Item<Nurse> label="Status" name="status">
                            <Input />
                        </Form.Item>
                        <Form.Item<Nurse> label="Exp" name="experience">
                            <Input />
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button className="bg-base-100" onClick={()=>addNurse()}>add</Button>
                            <Button className="bg-base-100 ml-3" onClick={()=>updateNurse()}>update</Button>
                            <Button className="bg-base-100 ml-3" onClick={()=>clear()}>clear</Button>
                        </Form.Item>
                    </Form>
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

            <div className="flex justify-center mt-5">
                <Table<Nurse> columns={columns} dataSource={nurses} />
            </div>
        </>
    );
}
