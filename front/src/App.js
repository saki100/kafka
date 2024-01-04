import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const App = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:8000');

    socket.on('message', (message) => {
      const newData = JSON.parse(message);
      setData((prevData) => [...prevData, newData]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Formatiranje podataka za grafikon samo ako postoje podaci
    if (data.length > 0) {
      const chartLabels = data.map((_, index) => (index + 1).toString()); // Indeks + 1 kao labela

      const chartTemperatureData = data.map((entry) => entry.average_temperature );

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Prosečna temperatura',
            data: chartTemperatureData,
            fill: false,
            //borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(11, 156, 49, 0.4)',
            borderColor: 'rgba(255, 0, 0, 0.6)',
            borderWidth: 2,
            tension: 0.1,
            elements: {
              point: {
                radius: 0,
              },
              line: {
                tension: 0.1,
              },
            },
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      {/* Prikazivanje grafikona samo ako postoje podaci */}
      {chartData && <Line data={chartData} />}
      {/* Prikazivanje prosečne temperature pored prethodnih */}
      {data.length > 0 && (
        <ul>
          {data.map((entry, index) => (
            <li key={index}>Prosečna temperatura {index + 1}: {entry.average_temperature}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;