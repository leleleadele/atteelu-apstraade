import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import CornerTag from '../CornerTag';

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(BarElement);

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
    },
    y: {
      beginAtZero: true,
      ticks: {
        display: false, // Set to false to hide y-axis labels
      },
    },
  },
};

const ImageHistogram = () => {
  const { originalHistogram, resultHistogram } = useSelector(
    state => state.filters
  );

  const setGraphData = data => {
    return {
      labels: Array.from({ length: 256 }, (_, i) => i.toString()),
      datasets: [
        {
          label: 'Pixel Count',
          data,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <>
      <div className="relative flex flex-wrap justify-around border-t border-mauve-700 p-8">
        <CornerTag label="Histogram" />
        <div className="mr-4">
          {!!originalHistogram && (
            <>
              <div>
                <Bar
                  data={setGraphData(originalHistogram)}
                  options={chartOptions}
                />
              </div>
            </>
          )}
        </div>
        <div className="mr-4">
          {!!resultHistogram && (
            <>
              <div>
                <Bar
                  data={setGraphData(resultHistogram)}
                  options={chartOptions}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageHistogram;
