import { useEffect, useState } from "react";
import './Clock.css';

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = seconds * 6; // 360 / 60
    const minuteDeg = minutes * 6 + seconds * 0.1; // плавное движение
    const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 360 / 12

    return (
        <div className="clock">
            <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
            <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
            <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
            <div className="center"></div>
        </div>
    );
}
