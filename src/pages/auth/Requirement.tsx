import {useState} from "react";
import LoginInfo from "./LoginInfo.tsx";
import {Link} from "react-router-dom";

export default function Requirement() {
    const [nextPage, setNextPage] = useState(false);
    const questions = [{
        index: 1,
        content: "是否對護理員的外觀或舉止有任何特別偏好？",
        notes: '(例如：正式、友善、安靜等)'
    }, {
        index: 2,
        content: "長者是否使用任何設備，護理員是否需要了解這些設備？",
        notes: '(例如：輪椅、氧氣機等)'
    }]

    function goNextPage() {
        setNextPage(true);
    }

    if (nextPage) {
        return (
            <>
                <div className="inline-block w-full">
                    <div className="float-left text-2xl ml-2 text-blue-600 font-bold">驗證信息</div>
                    <div className="float-right text-xl mt-1 mr-2 underline-offset-auto text-gray-500">
                        <a href="" onClick={() => setNextPage(false)}>返回上一步</a>
                    </div>
                </div>
                <LoginInfo type="register"/>
            </>
        )
    } else {
        return (
            <>
                <ul className="menu menu-vertical lg:menu-horizontal bg-[#FDF1F7] rounded-xl w-full justify-center">
                    <li className="w-1/2">
                        <Link to="/register"
                              className="flex text-xl font-semibold justify-center text-primary bg-white ">我要註冊</Link>
                    </li>
                    <li className="w-1/2">
                        <Link to="/login"
                              className="flex text-xl font-semibold justify-center text-gray-400">我要登錄</Link>
                    </li>
                </ul>
                {/*問卷*/}
                {questions.map((item, index) => (
                    <div key={index}>
                        <p className="text-xl py-2 font-normal">{index + 1}.{item.content}</p>
                        <textarea className="textarea textarea-bordered w-full"
                                  placeholder=""></textarea>
                        <p className="text-info">{item.notes}</p>
                    </div>
                ))}

                <img src='/login/registry_steps_one.png' alt="findcare" className="my-4"></img>
                <div className="flex flex-row mt-4 justify-items-center">
                    <button className="btn bg-primary border-0 text-xl text-white w-full font-medium h-14"
                            onClick={() => {
                                goNextPage()
                            }}>下一步，驗證手機
                    </button>
                </div>
            </>
        );
    }

}
