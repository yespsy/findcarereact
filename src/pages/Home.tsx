import {Link} from "react-router-dom";
import Slogan from "./home/HomeRightPromotion.tsx";
import NurseCarousel from "./home/NurseCarousel.tsx";
import Comments from "./home/Comments.tsx";
import AdRight from "./home/AdRight.tsx";
import Video from "./home/Video.tsx";
import CompanyTimeline from "./home/CompanyTimeline.tsx";
import CompanyPartner from "./home/CompanyPartner.tsx";

export default function Home() {
    // const bears = useStore((state) => state.bears)
    // const increase = useStore((state) => state.increase)
    return (
        <>
            <div className="bg-base-100 ">
                <div className="">
                    <div className="flex flex-col justify-items-center w-full">
                        <div
                            className="text-center w-full mt-[10px] lg:mt-[40px] 2xl:mt-[100px]  text-6xl font-bold text-white absolute text-nowrap">香港唯一專業印尼護理員的平台
                        </div>
                        <div className="text-center w-full mt-[40px] lg:mt-[90px] 2xl:mt-[150px] p-10 absolute">
                            <Link to="register"
                                  className="btn font-bold text-white text-4xl bg-primary border-0 px-6 btn-lg hover:bg-secondary">立即註冊</Link>
                        </div>
                        <div><img src="/home/home_banner.png" alt="findcare" className="max-w-full min-h-[220px]"></img></div>
                    </div>
                </div>

                <div className="flex justify-around">
                    <div className="flex flex-row md:basis-full lg:basis-11/12 xl:basis-10/12  2xl:basis-9/12  px-10 max-w-[1280px]">
                        <div className="flex flex-col basis-0656">
                            <NurseCarousel></NurseCarousel>
                            <Comments></Comments>
                        </div>
                        <div className="flex flex-col basis-0344">
                            <AdRight></AdRight>
                            <Slogan></Slogan>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="w-[1180px]"><Video></Video></div>
                </div>
                <div className="flex justify-around mt-5">
                    <div className="flex w-[1180px]">
                        <div className="pb-7 bg-white min-w-[850px] rounded-lg mb-5"><CompanyTimeline></CompanyTimeline>
                        </div>
                        <div className="bg-white ml-3 w-full rounded-lg mb-5"><CompanyPartner></CompanyPartner></div>
                    </div>
                </div>
            </div>
        </>
    )
}
