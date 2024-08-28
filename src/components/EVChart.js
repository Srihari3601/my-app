import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
    RadialLinearScale,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
    RadialLinearScale,
    Filler 
);

const EVChart = ({ data, dataUrl, label, chartType }) => {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        processChartData(data);
      } else if (dataUrl) {
        const response = await fetch(dataUrl);
        const fetchedData = await response.json();
        processChartData(fetchedData);
      }
    };

    const generateColors = (numColors) => {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.9)`);
      }
      return colors;
    };

    const processChartData = (data) => {
       
        const labels = data.map(item => item.Make || item['Model Year'] || item.City || item['Electric Range'] || item['Electric Vehicle Type'] || item.Model || item['Legislative District'] || item.County);
        const values = data.map(item => item.Count);
        const backgroundColors = generateColors(values.length);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: label,
              data: values,
              backgroundColor: chartType === 'pie' || chartType === 'doughnut' ? [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ] : backgroundColors,
              hoverBackgroundColor: '#808080',
              borderWidth: 1,
              borderColor: '#ccc',
            },
          ],
        });
      
    };

    fetchData();
  }, [data, dataUrl, label, chartType]);

  const options = {
    scales: {
      x: {
        type: chartType === 'bubble' ? 'linear' : 'category',
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  switch(chartType) {
    case 'pie':
      return <Pie data={chartData} options={options} />;
    case 'doughnut':
      return <Doughnut data={chartData} options={options} />;
    case 'line':
      return <Line data={chartData} options={options} />;
    case 'horizontalBar':
      return <Bar data={chartData} options={{  indexAxis: 'y' }} />;
    default:
      return <Bar data={chartData} options={options} />;
  }
};

export default EVChart;
