import {useEffect, useRef, useState} from "react";

interface CountdownControlParams {
    click: () => Promise<boolean>
}

const CountdownControl = ({click}: CountdownControlParams) => {
    const [remainingTime, setRemainingTime] = useState(60);
    const [isCounting, setIsCounting] = useState(false);
    const intervalRef = useRef(0);

    useEffect(() => {
        if (isCounting) {
            intervalRef.current = setInterval(() => {
                console.log('counting...');
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000)
        }
    }, [isCounting]);

    if (isCounting) {
        if ((remainingTime - 1) < 0) {
            setIsCounting(false)
            const intervalId = intervalRef.current;
            clearInterval(intervalId);
        }
    }

    const handleStart = async () => {
        const flag = await click()
        if (flag) {
            setRemainingTime(60);
            setIsCounting(true);
        }
    };

    // const handleStop = () => {
    //     setIsCounting(false);
    // };

    return <>
        {
            isCounting ? (
                <div className="w-44 text-gray-400 text-[20px] px-3 pt-2">已發送 {remainingTime}s</div>
            ) : (
                <button className="btn bg-white border-0 text-xl text-primary font-medium pr-6"
                        onClick={() => handleStart()}>發送驗證碼
                </button>
            )
        }
    </>
}

export default CountdownControl;