import "./Timer.css";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Timer = ({title, endTime, elapsedTime}) => {
    const radius = 150;
    const dash = radius * Math.PI * 2;
    const circleWidth = "400";
    const [timeLeft, setTimeLeft] = useState(endTime - elapsedTime);
    const [isFlashing, setIsFlashing] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [intervalId, setIntervalId] = useState(null);

    elapsedTime = endTime - timeLeft;
    if (endTime > 3599) {
        throw new Error("endTime cannot exceed 59 minutes and 59 seconds (3599 seconds).");
    }
    if(endTime < elapsedTime){
        throw new Error("endTime cannot be less then elapsed time.");
    }

    useEffect(() => {
        if (timeLeft > 0 && !isPaused) {
            const id = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            setIntervalId(id);
            return () => clearInterval(id);
        } else if (timeLeft <= 0) {
            setTimeout(() => {
                setIsFlashing(true);
            }, 1001)
            clearInterval(intervalId);
        }
    }, [timeLeft, isPaused]);



    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const calculateOffset = () => {
        const progress = (endTime - timeLeft) / endTime;
        return dash * (1 - progress);
    };

    const startTimer = () => {
        setIsPaused(false);
        setIsFlashing(false);
    };


    const pauseTimer = () => {
        setIsPaused(true);
    };


    const resetTimer = () => {
        setIsPaused(true);
        setTimeLeft(endTime);
        setIsFlashing(false);
    };
    return (
        <div className="timer-wrapper">
            <div className="timer-container">

                <div className="timer-content">
                    <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>

                        <circle cx={circleWidth / 2}
                                cy={circleWidth / 2}
                                strokeWidth="10px"
                                r={radius}
                                className="circle-bg"
                        />

                        <circle cx={circleWidth / 2}
                                cy={circleWidth / 2}
                                strokeWidth="10px"
                                r={radius}
                                className={`circle-prog-bar ${isFlashing ? "flash" : ""}`}
                                style={{strokeDasharray: dash, strokeDashoffset: calculateOffset(),}}
                                transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                        />

                        <text x={"50%"} y={"35%"} dy={"0.3em"} textAnchor={"middle"} className="circle-text">{title}</text>
                        <text x={"50%"} y={"50%"} dy={"0.3em"} textAnchor={"middle"} className="circle-timer-text">{formatTime(elapsedTime)}</text>
                        <text x={"50%"} y={"65%"} dy={"0.3em"} textAnchor={"middle"} className="circle-text">{formatTime(timeLeft)} left</text>

                    </svg>
                </div>

                <div className="timer-buttons">
                    <button onClick={startTimer} disabled={!isPaused} className="timer-button">Start</button>
                    <button onClick={pauseTimer} disabled={isPaused} className="timer-button">Pause</button>
                    <button onClick={resetTimer} className="timer-button">Reset</button>
                </div>

            </div>
        </div>
    )
}

export default Timer;