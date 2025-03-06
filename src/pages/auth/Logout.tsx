import {signOut} from "aws-amplify/auth";
import {useNavigate} from 'react-router-dom';
import {useEmployerStore} from "../../stores/useStore.ts";
import {useStore} from "zustand/react";

export default function Logout() {
    const navigate = useNavigate();
    const app = useStore(useEmployerStore, state => state.app)
    const setLogin = useStore(useEmployerStore, state => state.setLogin)

    if (app.isLogin) {
        return <a onClick={async () => {
            await signOut();
            useEmployerStore.getState().clear();
            setLogin(false);
            navigate('/')
        }} className="head-btn-color text-2xl font-medium pl-2 break-keep underline text-nowrap hover:cursor-pointer">
            SIGN OUT
        </a>
    } else {
        return <></>
    }
}
