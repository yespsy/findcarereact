import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'files',
    access: (allow) => ({
        'files/*': [
            //TODO need to control access
            allow.guest.to(['read','write','delete']),
            allow.authenticated.to(['read','write','delete']),
        ]
    })
});
