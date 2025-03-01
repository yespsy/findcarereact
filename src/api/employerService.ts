import {type Schema} from '../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import {Amplify} from "aws-amplify";
import outputs from '../../amplify_outputs.json';
// import {Employer} from "../entity.ts";

const client = generateClient<Schema>();

Amplify.configure(outputs);
// type Employer = Schema['Employer']['type'];
export const employerService = {
    getCurrentEmployer: async (id: string) => {
        const {data: e, errors} = await client.models.Employer.list({
            filter: {phone: {eq: id}},
            authMode: 'userPool',
        });
        if (errors) {
            // alert(JSON.stringify(errors))
            console.dir(errors)
        }
        return e;
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
            console.dir(errors)
            return null
        } else {
            return newEmployer
        }
    }
}
