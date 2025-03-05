import Requirement from "./Requirement";

export default function Register() {
    return (
        <>
            <div className="flex items-center justify-around pt-12 bg-secondary">
                <div
                    className="flex bg-white sm:basis-11/12 md:basis-10/12 lg:basis-9/12 xl:basis-8/12 rounded-3xl h-[785px] max-w-screen-lg mb-14">
                    <div className="lg:w-min basis-1/3 bg-base-100 rounded-tl-3xl rounded-bl-3xl">
                        <img src='/logo.png' alt="findcare"
                             className="float-left w-[100px] h-[100px] mt-[70px] ml-[22px]"></img>
                        <div className="mt-[97px] text-base font-bold text-nowrap text-secondary">香港唯一專業</div>
                        <div className="text-base text-nowrap text-secondary">印尼護理員的平臺</div>
                        <img src='/login/registry_steps_left.png' alt="findcare"
                             className="w-[180px] h-[180px] mt-[70px] ml-[47px]"></img>
                    </div>
                    <div className="flex items-center flex-col basis-2/3 pt-24">
                        <div className="w-[487px]">
                            <Requirement/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
