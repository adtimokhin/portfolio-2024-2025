"use client";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Function to update the current time in Chicago timezone
    const updateTime = () => {
      const date = new Date();

      // Get the time in Chicago, IL
      const chicagoTime = date.toLocaleTimeString("en-US", {
        timeZone: "America/Chicago", // Specify the Chicago timezone
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Set to true if you want 12-hour format with AM/PM
      });

      setTime(chicagoTime);
    };

    // Update time immediately on mount
    updateTime();

    // Set interval to update time every second
    const timerId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return <>{time}</>;
};

export default Timer;
