import {Employer} from "../../entity";

const mock1: Employer = {
    name: '25_01',
    phone: '19888888888',
    coin: 5,
    job: {
        title: 'No.20250211',
        nurseRank: '中級護理員',
        salary: '薪資面議',
        location: '香港 - 中西區',
        onboardDate: '半年內入職',
        requirements:
            '1. 語言要求：能夠用粵語進行基本溝通。\n' +
            '2. 身體條件：需要較爲強壯，能夠提供體力支持及照顧。\n' +
            '3. 經驗要求：有中風患者護理經驗者優先，能夠熟悉並提供專業護理，幫助患者進行日常生活照料。\n' +
            '4. 職責：協助日常生活活動（如進食、洗澡、更衣等）。\n' +
            '提供中風後康復訓練，協助病人進行簡單的物理治療。\n' +
            '監測病人的身體健康狀況，記錄病情變化並及時反饋。\n' +
            '與僱主和醫療團隊保持溝通，確保患者的健康和安全。',
        extraRequirements:
            '1. 具備良好的責任心、耐心及愛心，能夠與老人建立良好的關係。\n' +
            '2. 能夠適應彈性的工作時間安排。'
    },
    candidates: [{
        id: '1',
        nurse: {
            id: '1',
            name: 'Anna',
            avatarPath: '/nurse/nurse_avatar_1.png',
            rank: '中級護理員',
            status: 'READY_TO_WORK',
            experience: '9 years 1 month',
            resumeContent: '',
            resumePdfPath: ''
        },
        status: '發送邀請',
        interviewDate: '2025/2/14 14:00',
        isFavor: true,
        isNew: false,
        isAlreadyInterviewed: false
    }]
};

const mock2: Employer = {
    id: '1',
    name: 'null',
    phone: '123',
    coin: 10,
    job: {
        title: '123',
        nurseRank: '123',
        salary: '123',
        location: '123',
        onboardDate: '123',
        requirements: '1. 123。\n',
        extraRequirements: '123',
    },
    candidates: [{
        id: "1",
        nurse: {
            id: '1',
            name: '123',
            avatarPath: '/nurse/nurse_avatar_1.png',
            rank: '123',
            status: 'READY_TO_WORK',
            experience: '1 years 1 month',
            resumeContent: '',
            resumePdfPath: ''
        },
        status: '123',
        interviewDate: '2099/2/14 14:00',
        isFavor: true,
        isNew: true,
        isAlreadyInterviewed: true
    }]
};

export const nurse1 ={
    name: 'Anna',
    avatarPath: '/nurse/nurse_avatar_1.png',
    rank: '中級護理員',
    status: 'READY_TO_WORK',
    experience: '9 years 1 month',
    resumeContent: 'resumeContent',
    resumePdfPath: 'resumePdfPath'
}

const mocks = [mock1, mock2]
const mockEmployer = mocks[0];

export default mockEmployer;
