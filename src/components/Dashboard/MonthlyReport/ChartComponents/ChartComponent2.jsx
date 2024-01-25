import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent2 = ({ data, type }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    let chart;
    if (type === "bar") {
      chart = new Chart(ctx, {
        type: "bar",
        data,
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'black',
              },
              grid: {
                display: false
              },
            },
          },
          y: {
            ticks: {
              color: 'black',
            },
          },
        },
      });  
    } else if (type === "line") {
      chart = new Chart(ctx, {
        type: "line",
        data,
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'black',
              },
            },
            y: {
              ticks: {
                color: 'black',
              },
            },
          },
        },
      });
  
    }

    return () => {
      chart.destroy();
    };
  }, [data, type]);

  return <canvas className="p" ref={chartRef}></canvas>;
};

export default ChartComponent2;
