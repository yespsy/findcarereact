import {type Schema} from '../../amplify/data/resource'
import {generateClient, SelectionSet} from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';
import {handleError} from "./utils.ts";
import {Amplify} from "aws-amplify";
import {Employer} from "../entity.ts";

const client = generateClient<Schema>();
Amplify.configure(outputs);

const selectionSetOfEmployer = ['id', 'name', 'phone', 'coin', 'job.*', 'candidates.*'] as const;
type EmployerAll = SelectionSet<Schema['Employer']['type'], typeof selectionSetOfEmployer>;

function convertToEntity(e: EmployerAll) {
    const employer: Employer = {
        id: e.id!,
        name: e.name!,
        phone: e.phone!,
        coin: e.coin!,
        job: undefined,
        candidates: undefined
    }
    const job = e.job;
    if (e.job) {
        employer.job = {
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
    }
    return employer
}

export const employerService = {
    getCurrentEmployer: async (id: string) => {
        const {data: e, errors} = await client.models.Employer.list({
            filter: {phone: {eq: id}},
            selectionSet: selectionSetOfEmployer,
            authMode: 'userPool',
        });
        //TODO e is array, and should only one item
        console.dir(e);
        if (errors) {
            console.dir(errors)
        }
        if (e && e.length === 0) {
            return convertToEntity(e[0])
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
        const {errors, data: e} = await client.models.Employer.create(
            {phone, name: phone, coin: 0}, {authMode: 'userPool',}
        )
        if (errors) {
            handleError(errors)
            return null
        }
        if (!e) {
            return null;
        }
        const ret: Employer = {
            id: e.id!,
            name: e.name!,
            phone: e.phone!,
            coin: e.coin!,
            job: undefined,
            candidates: undefined
        }
        return ret
    },
}
