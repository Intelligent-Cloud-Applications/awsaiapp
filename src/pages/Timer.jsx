import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
// import Context from "../context/Context";
// const startTime = 1703565289322;

const Timer = () => {
  const [seconds, setSeconds] = useState(48 * 60 * 60);
  const [submissionTime, setSubmissionTime] = useState(Date.now());
  // const Ctx = useContext(Context);
  const totalTime = 48 * 60 * 60;

  useEffect(() => {
    const onLoad = async () => {
      // Ctx.util.setLoader(true);
      try {
        const res = await API.get(
          "clients",
          "/user/Development-form/Get-time/awsaiapp"
        );
        setSubmissionTime(res.submissiontime);
      } catch (e) {
        console.error(e);
      } finally {
        // Ctx.util.setLoader(false);
      }
    };

    onLoad();
  }, []);

  useEffect(() => {
    const usedTime = (Date.now() - submissionTime) / 1000;
    const leftTime = totalTime - usedTime;
  
    if (Math.floor(leftTime) < 0) {
      setSeconds(0);
    } else {
      setSeconds(Math.floor(leftTime));
    }
  }, [submissionTime, totalTime]); // Include them here
  

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const seconds2 = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds2.toString().padStart(2, "0")}`;
  };

  return (
    <div className="countdown-timer">
      <div className="timer-display">
        {formatTime()
          .split(":")
          .map((timePart, index) => (
            <span key={index} className="time-part">
              {timePart}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Timer;

