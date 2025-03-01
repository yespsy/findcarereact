import {type Schema} from '../../amplify/data/resource'
import {generateClient} from 'aws-amplify/data';
import {Amplify} from "aws-amplify";
import outputs from '../../amplify_outputs.json';

const client = generateClient<Schema>();

Amplify.configure(outputs);

export const employerService = {
    getCurrentEmployer: async (id: string) => {
        const {data: e, errors} = await client.models.Employer.get({
            id: id
        });
        if (errors) {
            // alert(JSON.stringify(errors))
            console.dir(errors)
        }
        return e;
    },
}
