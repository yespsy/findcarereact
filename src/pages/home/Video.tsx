import {Link} from "react-router-dom";

export default function Video() {
    return (
        <>
            <div className="pt-4 flex">
                <div className="">
                    <video src="https://findcare.id/wp-content/uploads/2024/12/Caregivers-at-nursing-home-2.mp4"
                           autoPlay={true}
                           loop muted playsInline={true} className="rounded-l-xl"></video>
                </div>
                <div className="bg-secondary text-white text-lg p-5 rounded-r-xl w-[1000px]">
                    <p>1. 搜護網的護理員有何特別之處？</p>
                    <p className="mt-3">我們所有的護理員都接受了專為香港家庭設計的專業培訓，其中包括由專業粵語導師提供的粵語課程，為與香港家庭的交流建立基礎。</p>
                    <p className="mt-3">2. 搜護網的護理員提供哪些專業護理？</p>
                    <p className="mt-3">我們的護理人員皆持有專業證書，並具有看護以下病症的實踐經驗：</p>
                    <p className="mt-2">糖尿病、癡呆症、阿茲海默氏症、骨質疏鬆症、癌症、中風、心理殘疾</p>
                    <Link to="/"
                          className="btn-sm float-right text-white bg-primary border-0 text-lg rounded-lg px-6 pt-0.5 mt-5">更多問題 &gt;</Link>
                </div>
            </div>
        </>);
}
