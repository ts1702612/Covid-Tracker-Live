import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Charts.module.css";

const Charts = ({ data: { confirmed, recovered, deaths }, cntry }) => {
  const [dailyData, setDailyData] = useState([]);
  //defining states  initially empty object
  // useeffect accepts a callback
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    // console.log(dailyData);
    fetchAPI();
  });
  // for global daily data
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(200, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",

            backgroundColor: [
              "rgba(0, 0, 200, 0.5)",
              "rgba(0, 200, 0, 0.5)",
              "rgba(200, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legends: { display: false },
        title: { display: true, text: `Current Situation in ${cntry}` },
      }}
    />
  ) : null;

  return <div className={styles.container}>{cntry ? barChart : lineChart}</div>;
};

export default Charts;
