import {getCurrentUser} from 'aws-amplify/auth';
import {useEffect, useState} from 'react';

export default function CurrentUser() {
    const [msg, setMsg] = useState('')
    useEffect(() => {
        async function get() {
            try {
                const {username, signInDetails} = await getCurrentUser();

                // console.log("username", username);
                // console.log("user id", userId);
                // console.log("sign-in details", signInDetails);
                // console.dir(signInDetails);

                setMsg(username + '   ' + signInDetails?.loginId)
            } catch (e) {
                console.log(e)
                setMsg('Not Login');
            }
        }

        get().then();
    }, []);

    return (
        <>
            {msg}
        </>
    );
}
