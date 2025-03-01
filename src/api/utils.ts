import {getCurrentUser} from 'aws-amplify/auth';

export function isUserLogin(): Promise<boolean> {
    return new Promise((resolve) => {
        getCurrentUser().then(() => resolve(true)).catch(() => resolve(false));
    })
}
