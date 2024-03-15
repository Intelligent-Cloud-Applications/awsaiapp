import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

const ChartComponent = ({ data, type }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')

    let chart
    if (type === 'bar') {
      chart = new Chart(ctx, {
        type: 'bar',
        data,
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
            },
          },
        },
      })
    } else if (type === 'line') {
      chart = new Chart(ctx, {
        type: 'line',
        data,
        options: {
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
            },
          },
          elements: {
            point: {
              radius: 1, // Set point radius to 0 to hide points
            },
          },
        },
      })
    }

    return () => {
      chart.destroy()
    }
  }, [data, type])

  return <canvas className="p" ref={chartRef}></canvas>
}

export default ChartComponent
