import {type Schema} from '../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';
import {handleError} from "./utils.ts";

import {Amplify} from "aws-amplify";
const client = generateClient<Schema>();
Amplify.configure(outputs);

export const jobService = {
    create: async (employerId: string) => {
        const {errors, data:job} = await client.models.Job.create({employerId}, {authMode: 'userPool'});
        if (errors) {
            handleError(errors)
            return null;
        }
        return job!;
    },
}
