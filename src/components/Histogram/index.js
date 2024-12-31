import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import * as styles from "./styles.module.scss";

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(BarElement);

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "linear",
      position: "bottom",
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
    (state) => state.filters
  );

  const setGraphData = (data) => {
    return {
      labels: Array.from({ length: 256 }, (_, i) => i.toString()),
      datasets: [
        {
          label: "Pixel Count",
          data,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <>
      <h2 className={styles.title}>Histogram:</h2>
      <div className={styles.histogramContainer}>
        <div className={styles.histogram}>
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
        <div className={styles.histogram}>
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
