import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime, onTimeout }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } else {
      onTimeout();
    }
  }, [time, onTimeout]);

  // Convert seconds to hours, minutes, and seconds for display
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div>
      <p>
        Time Remaining: {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default CountdownTimer;
