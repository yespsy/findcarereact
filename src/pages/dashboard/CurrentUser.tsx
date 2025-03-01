import {getCurrentUser} from 'aws-amplify/auth';
import {useEffect, useState} from 'react';

export default function CurrentUser() {
    const [loginName, setLoginName] = useState('')
    useEffect(() => {
        async function get() {
            try {
                const {username, userId, signInDetails} = await getCurrentUser();

                console.log("username", username);
                console.log("user id", userId);
                console.log("sign-in details", signInDetails);

                setLoginName(username)
            } catch (e) {
                console.log(e)
                setLoginName('Not Login');
            }
        }

        get().then();
    }, []);

    return (
        <>
            {loginName}
        </>
    );
}
