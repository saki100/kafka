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
      const chartLabels = data.map((entry) => {
        const date = new Date(entry.dt * 1000);
        return date.toLocaleDateString('en-GB'); // Formatiraj datum u "dd/MM/yy"
      });

      const chartTemperatureData = data.map((entry) => entry.main.temp+ Math.random()*2);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Temperatura',
            data: chartTemperatureData,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
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
    </div>
  );
};

export default App;
