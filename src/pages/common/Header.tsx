import {Link} from 'react-router-dom';
import Logout from "../auth/Logout.tsx";
import {useStore} from "zustand/react";
import {useEmployerStore} from "../../stores/useStore.ts";

export default function Header() {
    const app = useStore(useEmployerStore, state => state.app)

    return (
        <>
            <div className="flex h-[118px] max-w-full justify-center">
                <div className="flex items-center 2xl:basis-8/12 xl:basis-10/12 lg:basis-full justify-between ">
                    <Link to="/" className="flex flex-row items-center w-fit">
                        <img src="/logo.png" alt="findcare" className="w-[100px] h-[100px]"></img>
                        <div className="flex flex-col items-start">
                            <p className="head-btn-color text-[26px] font-bold leading-8">FINDCARE</p>
                            <p className="head-btn-color text-[26px] font-bold leading-8 color-blue">搜護綱</p>
                        </div>
                    </Link>
                    <div className="flex flex-row items-center justify-between">
                        {
                            app.isLogin ? (
                                <Link to="/dashboard"
                                      className="head-btn-color text-2xl font-medium pl-2 break-keep">首页</Link>
                            ) : (
                                <Link to="/login"
                                      className="btn bg-blue-500 text-white text-2xl font-normal rounded-3xl hover:bg-secondary">
                                    登陸/註冊
                                </Link>
                            )
                        }
                        <Link to="/" className="head-btn-color text-2xl font-medium pl-5 break-keep">服務內容</Link>
                        <Link to="/" className="head-btn-color text-2xl font-medium pl-5 break-keep">新知科普</Link>
                        <Link to="/" className="head-btn-color text-2xl font-medium pl-5 break-keep">聯繫客服</Link>
                        <Link to="/" className="head-btn-color text-2xl font-medium pl-5 break-keep">繁體中文</Link>
                        <Logout/>
                    </div>
                </div>
            </div>
        </>);
}

