import {type Schema} from '../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';
import {handleError} from "./utils.ts";

import {Amplify} from "aws-amplify";
import {Job} from "../entity.ts";

const client = generateClient<Schema>();
Amplify.configure(outputs);

export const jobService = {
    create: async (employerId: string) => {
        const {errors, data: job} = await client.models.Job.create({employerId}, {authMode: 'userPool'});
        if (errors) {
            handleError(errors)
            return null;
        }
        if (job) {
            const ret: Job = {
                employerId: job.employerId!,
                extraRequirements: job.extraRequirements!,
                id: job.id!,
                location: job.location!,
                nurseRank: job.nurseRank!,
                onboardDate: job.onboardDate!,
                requirements: job.requirements!,
                salary: job.salary!,
                title: job.title!
            }
            return ret;
        }
        return null;
    },
}
