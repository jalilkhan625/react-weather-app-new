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
          label: 'Temperatura (°C)',
          data: temperatureData.slice(0, 24),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          borderWidth: 2,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 16,
                weight: 'bold',
              },
              color: '#333'
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Ora del Giorno',
              color: '#666',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
              lineWidth: 1,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperatura (°C)',
              color: '#666',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
            },
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
              lineWidth: 1,
            },
            beginAtZero: true,
          }
        }
      }
    });
  }, [temperatureData]);

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '1.8rem' }}>Andamento della Temperatura</h2>
      <canvas ref={chartRef} style={{ width: '100%', height: '400px', maxHeight: '400px' }}></canvas>
    </div>
  );
};

export default TemperatureChart;
