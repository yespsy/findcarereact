import {Nurse} from "../entity";

function getNurses(limit: number|undefined): Nurse[] {
    const mockNurses: Array<Nurse> = [
        {
            id: '1',
            name: 'Titik',
            rank: "高級護理",
            status: "READY_TO_WORK",
            experience: "9 years 1 month",
            avatarPath: "/nurse/nurse_avatar_1.png",
            resumeContent: "",
            resumePdfPath: ""
        }, {
            id: '2',
            name: 'Vannya',
            rank: "中級護理",
            status: "READY_TO_WORK",
            experience: "9 years 1 month",
            avatarPath: "/nurse/nurse_avatar_2.png",
            resumeContent: "",
            resumePdfPath: ""
        }, {
            id: '3',
            name: 'Sustira',
            rank: "初級護理",
            status: "READY_TO_WORK",
            experience: "9 years 1 month",
            avatarPath: "/nurse/nurse_avatar_3.png",
            resumeContent: "",
            resumePdfPath: ""
        }, {
            id: '4',
            name: 'Titik04',
            rank: "高級護理",
            status: "READY_TO_WORK",
            experience: "9 years 1 month",
            avatarPath: "/nurse/nurse_avatar_1.png",
            resumeContent: "",
            resumePdfPath: ""
        }, {
            id: '5',
            name: 'Vannya_05',
            rank: "中級護理",
            status: "READY_TO_WORK",
            experience: "9 years 1 month",
            avatarPath: "/nurse/nurse_avatar_2.png",
            resumeContent: "",
            resumePdfPath: ""
        }, {
            id: '6',
            name: 'Sustira_06',
            rank: "初級護理",
            status: "READY_TO_WORK",
            experience: "9 years 1 month",
            avatarPath: "/nurse/nurse_avatar_3.png",
            resumeContent: "",
            resumePdfPath: ""
        }];
    return mockNurses.slice(0, limit);
}

const nurseServiceMock = {
    getNurses, add: () => {},
    delete: () => {},
    updateAvatarPath: ()=>{},
    updateResumePdfPath: ()=>{},
    update: ()=>{}
}

export default nurseServiceMock;
