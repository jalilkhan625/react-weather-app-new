import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TemperatureChart = ({ temperatureData }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const labels = Array.from({ length: 24 }, (_, i) => `${i}h`);

    if (chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    chartRef.current.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatureData.slice(0, 24),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3,
          fill: false
        }]
      }
    });
  }, [temperatureData]);

  return <canvas ref={chartRef}></canvas>;
};

export default TemperatureChart;
