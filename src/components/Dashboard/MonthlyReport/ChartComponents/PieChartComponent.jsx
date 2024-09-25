import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.register(ChartDataLabels);

const PieChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "pie",
      data,
      options: {
        plugins: {
          legend: {
            labels: {
              color: "black",
            },
          },
          datalabels: {
            formatter: (value, ctx) => {
              const total = ctx.chart.data.datasets[0].data.reduce((acc, dataValue) => acc + dataValue, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              return `${percentage}%`; // Show percentage
            },
            color: "black", // Set the color of the percentage text
            font: {
              weight: "bold",
              size: 19, // Adjust size if needed
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas className="Poppins p" ref={chartRef}></canvas>;
};

export default PieChartComponent;
