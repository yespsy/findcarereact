import LoginInfo from "./LoginInfo";
import {Link} from "react-router-dom";

export default function Auth() {
    return (
        <div className="mx-auto lg:min-width">
            <div className="bg-secondary pb-14">
                <div className="flex items-center justify-around pt-12 ">
                    <div
                        className="flex bg-white sm:basis-11/12 md:basis-11/12 lg:basis-11/12 xl:basis-8/12 rounded-3xl max-w-screen-lg">
                        <div className="lg:w-min basis-1/3 bg-base-100 rounded-tl-3xl rounded-bl-3xl min-w-[260px]">
                            <img src='/logo_origin.png' alt="findcare"
                                 className="float-left w-[100px] h-[100px] mt-[70px] ml-[22px]"></img>
                            <div className="mt-[97px] text-base font-bold text-nowrap text-[#EFAAE9]">香港唯一專業</div>
                            <div className="text-base text-nowrap text-secondary">印尼護理員的平臺</div>
                        </div>
                        <div className="flex items-center flex-col sm:basis-11/12 lg:basis-2/3 pt-24 px-2 mb-14">
                            <ul className="menu menu-horizontal bg-[#FDF1F7] rounded-xl w-[487px] justify-center">
                                <li className="w-1/2">
                                    <Link to="/register"
                                          className="flex text-xl font-semibold justify-center text-gray-400">我要註冊</Link>
                                </li>
                                <li className="w-1/2">
                                    <Link to="/login"
                                          className="flex text-xl font-semibold justify-center bg-white text-primary">我要登錄</Link>
                                </li>
                            </ul>
                            <LoginInfo type="login"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
