"use client";
import { useRef, useState } from "react";
  
export default function Timer() {
    const [start, setStart] = useState(0);
  const [now, setNow] = useState(0);
  let timer = useRef(0);
  const handleStart = () => {
    if (start == 0){
    setStart(Date.now());
    }
    setNow(Date.now());

      timer.current = setInterval(() => {
        setNow(Date.now());
      }, 100);
  };

  const handleStop = () => {
    clearInterval(timer.current);
  };

  return (
    <>
      <div>{(now - start) / 1000}s</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
