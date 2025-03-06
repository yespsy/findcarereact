import {useEffect, useRef, useState} from 'react';

const CountdownButton = () => {
    const [remainingTime, setRemainingTime] = useState(5);
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

    const handleStart = () => {
        setRemainingTime(5);
        setIsCounting(true);
    };

    const handleStop = () => {
        setIsCounting(false);

    };

    return (
        <div style={styles.container}>
            <button
                style={styles.button}
                onClick={() => isCounting ? handleStop() : handleStart()}>
                {isCounting ? `还剩 ${remainingTime}s` : '开始倒计时'}
                <div>hello</div>
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        backgroundColor: '#f0f0f0'
    },
    button: {
        padding: '15px 30px',
        fontSize: '20px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#4CAF50',
        color: 'white'
    }
};

export default CountdownButton;