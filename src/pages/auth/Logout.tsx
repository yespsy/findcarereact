import {signOut} from "aws-amplify/auth";
import {useNavigate} from 'react-router-dom';
import {isUserLogin} from "../../api/utils";
import {useEffect, useState} from "react";
import {useEmployerStore} from "../../stores/useStore.ts";

export default function Logout() {
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate();
    //TODO update state after logout
    useEffect(() => {
        isUserLogin().then(isLogin => {
            setIsLogin(isLogin)
        })
    }, []);

    if (isLogin) {
        return <a onClick={async () => {
            await signOut();
            useEmployerStore.getState().clear();
            navigate('/')
        }} className="head-btn-color text-2xl font-medium pl-2 break-keep underline text-nowrap">
            SIGN OUT
        </a>
    } else {
        return <></>
    }
}
