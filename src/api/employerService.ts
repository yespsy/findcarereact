import {type Schema} from '../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';
import {handleError} from "./utils.ts";
import {jobService} from "./jobService.ts";

import {Amplify} from "aws-amplify";
const client = generateClient<Schema>();
Amplify.configure(outputs);

export const employerService = {
    getCurrentEmployer: async (id: string) => {
        const {data: e, errors} = await client.models.Employer.list({
            filter: {phone: {eq: id}},
            authMode: 'userPool',
        });
        //TODO e is array, and should only one item
        console.dir(e);
        if (errors) {
            // alert(JSON.stringify(errors))
            console.dir(errors)
        }
        if (e && e.length === 0) {
            return e[0];
        }
        return null;
    },
    getEmployers: async () => {
        const {data: e, errors} = await client.models.Employer.list({authMode: 'userPool'});
        if (errors) {
            // alert(JSON.stringify(errors))
            console.dir(errors)
        }
        return e;
    },
    signupInit: async (phone: string) => {
        const {errors, data: newEmployer} = await client.models.Employer.create(
            {phone, name: phone, coin: 0}, {authMode: 'userPool',}
        )
        if (errors) {
            handleError(errors)
            return null
        }
        if (!newEmployer || !newEmployer.id) {
            return null;
        }
        const job = await jobService.create(newEmployer.id)
        if (errors) {
            console.dir(errors)
            return null
        } else if (!job) {
            return null
        } else {
            return newEmployer
        }
    }
}
