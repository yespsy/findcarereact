import {generateClient} from 'aws-amplify/data';
import {type Schema} from '../../amplify/data/resource'
import {Nurse} from "../entity";
import {Amplify} from "aws-amplify";
import outputs from '../../amplify_outputs.json';
const client = generateClient<Schema>();
Amplify.configure(outputs);

const nurseService = {
    getNurses: async (limit: number | undefined) => {
        const list = await client.models.Nurse.list({
            limit: limit,
            selectionSet: ['id', 'name', 'rank', 'status', 'experience', 'avatarPath', 'resumeContent', 'resumePdfPath']
        });
        return list.data
    },
    getNursesById: async (id: string) => {
        const {errors, data} = await client.models.Nurse.get({
            id
        });
        if (errors) {
            alert(JSON.stringify(errors))
        }
        return data
    },
    add: async (nurse: Nurse) => {
        const {errors, data} = await client.models.Nurse.create({
            name: nurse.name,
            rank: nurse.rank,
            status: nurse.status,
            experience: nurse.experience,
            avatarPath: nurse.avatarPath,
            resumeContent: nurse.resumeContent,
            resumePdfPath: nurse.resumePdfPath
        });
        if (errors) {
            console.log(errors);
            return null
        } else {
            return data
        }
    },
    update: async (nurse: Nurse) => {
        const {errors, data} = await client.models.Nurse.update({
            id: nurse.id,
            name: nurse.name,
            rank: nurse.rank,
            status: nurse.status,
            experience: nurse.experience,
            avatarPath: nurse.avatarPath,
            resumeContent: nurse.resumeContent,
            resumePdfPath: nurse.resumePdfPath
        });
        if (errors) {
            console.log(errors);
            return null
        } else {
            return data
        }
    },
    delete: async (id: string) => {
        await client.models.Nurse.delete({
            id: id
        })
    },
    updateAvatarPath: async (id: string, avatarPath: string) => {
        const {errors, data} = await client.models.Nurse.update({
            id, avatarPath: avatarPath
        });
        if (errors) {
            alert(JSON.stringify(errors))
        }
        return data;
    },
    updateResumePdfPath: async (id: string, resumePdfPath: string) => {
        const {errors, data} = await client.models.Nurse.update({
            id, resumePdfPath
        });
        if (errors) {
            alert(JSON.stringify(errors))
        }
        return data;
    },
}

export default nurseService;
