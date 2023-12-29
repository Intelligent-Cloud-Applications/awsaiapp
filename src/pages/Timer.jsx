import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

const Timer = () => {
  const [seconds, setSeconds] = useState(48 * 60 * 60);
  const [submissionTime, setSubmissionTime] = useState(Date.now());
  const totalTime = 48 * 60 * 60;
  const [timerEnded, setTimerEnded] = useState(false);
  useEffect(() => {
    const onLoad = async () => {
      
      try {
        const res = await API.get(
          "clients",
          "/user/development-form/get-time/awsaiapp"
        );
        
        setSubmissionTime(res.submissiontime);
      } catch (e) {
        console.error(e);
      } finally {
      
      }
    };

    onLoad();
  }, []);

  useEffect(() => {
    const usedTime = (Date.now() - submissionTime) / 1000;
    const leftTime = totalTime - usedTime;
 
    if (Math.floor(leftTime) < 0) {
      setSeconds(0);
      setTimerEnded(true);
    } else {
      setSeconds(Math.floor(leftTime));
      
    }
  }, [submissionTime, totalTime]); 
  

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setTimerEnded(true); 
          clearInterval(interval); 
          return 0; 
        }
      });
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
    <div className="flex flex-col justify-center p-12 gap-5">
    <div className="countdown-timer px-3">
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
      <div className="px-4 ml-3 text-white">
        {timerEnded ? (
          <div className="congratulations-ui bg-black opacity-75 p-10 rounded-md absolute inset-0 flex flex-col justify-center items-center">
          <table className="text-center">
            <tbody>
              <tr>
                <td>
                  <p style={{ fontSize: "3em" }}>
                    🎉 Congratulations! Your website is completed. 🎉
                  </p>
                  <p>We have sent the domain name to your registered email ID.</p>
                
                </td>
              </tr>
            </tbody>
          </table>
          <div className="scrolling-text">
            <p>Congratulations! Congratulations! Congratulations!</p>
            
          </div>
        </div>
        ) : (
          <p className="text-center max450:w-[20rem]">
   Get ready for an enhanced online presence your website's transformation is underway! Need changes or more info? Reach out anytime!
  </p>
        )}
      </div>
    </div>
  );
};

export default Timer;