import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TemperatureChart = ({ temperatureData }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const labels = Array.from({ length: 24 }, (_, i) => `${i}h`);

    // Destroy the previous chart instance if it exists
    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    // Create a new chart instance
    chartRef.current.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatureData.slice(0, 24),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Ora del Giorno', // x-axis label in Italian
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperatura (°C)', // y-axis label in Italian
            },
            beginAtZero: true, // Optional: start y-axis at zero
          }
        }
      }
    });
  }, [temperatureData]);

  return <canvas ref={chartRef}></canvas>;
};

export default TemperatureChart;
