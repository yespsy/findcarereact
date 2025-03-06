import {type Schema} from '../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import {handleError} from "./utils.ts";
import outputs from '../../amplify_outputs.json';
import {Amplify} from "aws-amplify";
import {Candidate} from "../entity.ts";
// import nurseService from "./nurseService.ts";

const client = generateClient<Schema>();
Amplify.configure(outputs);

export const candidateService = {
    add: async (employerId: string, nurseId: string, isFavor:boolean) => {
        const {errors, data} = await client.models.Candidate.create({employerId, nurseId, isFavor}, {authMode: 'userPool'});
        if (errors) {
            handleError(errors)
            return null;
        }
        if (!data) {
            return null;
        }
        const candidate: Candidate = {
            id: data.id!,
            nurse: undefined,
            status: data.status!,
            interviewDate: data.interviewDate!,
            isFavor: data.isFavor!,
            isNew: data.isNew!,
            isAlreadyInterviewed: data.isAlreadyInterviewed!,
        }
        const rev = await data.nurse();
        const n = rev.data;
        if (n) {
            candidate.nurse = {
                id: n.id!,
                name: n.name!,
                rank: n.rank!,
                status: n.status!,
                experience: n.experience!,
                avatarPath: n.avatarPath!,
                resumeContent: n.resumeContent!,
                resumePdfPath: n.resumePdfPath!
            }
        }
        return candidate;
    },
}
