export default function Page() {

    function item(date: string, title: string) {
        return (
            <>
                <div className="timeline-middle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="pink"
                        className="h-5 w-5">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483
                            4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"/>
                    </svg>
                </div>
                <div className="timeline-end">
                    <div className="flex text-xl">
                        <div className="ml-3 font-bold text-nowrap">{date}</div>
                        <div className="ml-10 text-nowrap">{title}</div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="text-3xl pt-6 pl-[240px]">我們的發展歷程</div>
            <div className="w-[700px] -ml-20">
                <ul className="timeline timeline-vertical ">
                    <div className="text-2xl ml-80 py-3 font-bold">2024</div>
                    <li>
                        <hr className="my-3"/>
                        {item('Jul', 'Business Registration')}
                        <hr/>
                    </li>
                    <li>
                        <hr className="my-3"/>
                        {item('Aug', 'Office Established In Central, Hong Kong')}
                        <hr/>
                    </li>
                    <li>
                        <hr className="my-3"/>
                        {item('Sep', 'Got The EA Licence')}
                        <hr/>
                    </li>
                    <li>
                        <hr className="my-3"/>
                        <div className="float-left text-nowrap absolute mt-14 ml-[462px] text-gray-500">Got
                            introductions from the caregivers
                        </div>
                        {item('Oct', 'Cooperated With LoveCare')}
                        <hr/>
                    </li>
                    <li>
                        <hr className="my-3"/>
                        {item('Nov', 'Trained caregivers')}
                        <hr/>
                    </li>
                    <li>
                        <hr className="my-3"/>
                        {item('Dec', 'Joined CCMF-HKYEP')}
                        <hr/>
                    </li>
                </ul>
            </div>
            <div className="w-[700px] -ml-20">
                <ul className="timeline timeline-vertical ">
                    <div className="text-2xl ml-80 py-3 font-bold">2025</div>
                    <li>
                        <hr className="my-3"/>
                        <div className="float-left text-nowrap absolute mt-14 ml-[414px] text-gray-500">Caregiver Hired
                            In Hong Kong
                        </div>
                        {item('Jan', 'First Employer')}
                        <hr/>
                    </li>
                    <li>
                        <hr className="my-3"/>
                        {item('Feb', 'Mobile App Launch')}
                        <hr/>
                    </li>
                </ul>
                <div className="text-2xl ml-80 text-primary font-bold">To Be Continued...</div>
            </div>
        </div>
    );
}
