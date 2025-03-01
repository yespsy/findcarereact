import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'files',
    access: (allow) => ({
        'files/*': [
            allow.guest.to(['read']),
            allow.authenticated.to(['read']),
        ]
    })
});
