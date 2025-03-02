import {getCurrentUser} from 'aws-amplify/auth';

export function isUserLogin(): Promise<boolean> {
    return new Promise((resolve) => {
        getCurrentUser().then(() => resolve(true)).catch(() => resolve(false));
    })
}

export function handleError(error: unknown) {
    if (error instanceof Error) {
        console.log(error.message)
    } else {
        console.log(JSON.stringify(error))
    }
}

export function handleErrorWithMessage(error: unknown, message: string) {
    handleError(error)
    alert("处理出错, " + message)
}
