import { Link } from "react-router-dom";

export default function Page() {
    return (
        <>
            <div className="pt-12" >
                <div className="flex flex-col justify-item-center bg-gray-700 rounded-xl w-full">
                    <img src="/home/promotion.png" alt="promotion" className="max-w-full"></img>
                    <div className="text-center text-4xl text-white mt-[20px] absolute w-[420px]"><p>4月限時優惠</p></div>
                    <div className="absolute text-center mt-[80px] w-[420px] ">
                        <Link to="/register" className="text-2xl text-white btn bg-primary border-0 hover:bg-secondary">立即註冊</Link></div>
                </div>
            </div>
        </>);
}
