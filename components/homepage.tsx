



"use client";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Hero from "@/components/hero";

const getFollowerCount = async () => {
  const res = await fetch(`http://35.154.19.254:3000/followercount`);
  const data = await res.json();
  return data;
};

interface ChartData {
  options: {
    // Your options type
  };
  series: {
    name: string;
    data: number[]; // Change this to the actual type of your data
  }[];
}


function App() {
  const [followerCount, setFollowerCount] = useState(null);
  const [chartData, setChartData] = useState<ChartData>({
    options: {
      colors: ["#FFFF00"],
      chart: {
        id: "basic-line",
        animations: {
          enabled: true,
        },
        toolbar: {
          show: false
        },
      },

      tooltip: {
        enabled: true,
        style: {
          fontSize: '20px',
          fontFamily: 'Roboto'
        },
        x: {
          show: false,
          format:'HH:mm'
        },
        // y: {
        //   formatter:(value) => `${value}`
        // },
        marker: {
          show: true,
        },
        theme:'dark'
      },
      
      xaxis: {
        type: "numeric",
        labels: {
          style: {
            colors: "#ffffff", // Set the color of x-axis labels to white
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff", // Set the color of y-axis labels to your desired color
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Followers",
        data: [],
      },
      
    ],
    
  });
  useEffect(() => {
    const fetchData = async () => {
      const followerData = await getFollowerCount();
      const newFollowerCount = followerData.followtech;
  
      setChartData((prevChartData) => {
        const newData = [...prevChartData.series[0].data, newFollowerCount];
        return {
          ...prevChartData,
          series: [{ name: "Followers", data: newData }],
        };
      });
      setFollowerCount(newFollowerCount);
    };
  
    // Fetch initially
    fetchData();
  
    // Fetch every 3 seconds, but only if running in the browser
    if (typeof window !== 'undefined') {
      const intervalId = setInterval(fetchData, 3000);
  
      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, []); // Empty dependency array means it only runs once on mount
  

  return (
    <div className="App">
      <div className="row">
        <div className="col-4" id="chartContainer">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            width="450"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [followerCount, setFollowerCount] = useState(null);

  const fetchAndUpdateFollowerCount = async () => {
    const followerData = await getFollowerCount();
    const newFollowerCount = followerData.followtech;
    setFollowerCount(newFollowerCount);
  };

  useEffect(() => {
    // Fetch initially
    fetchAndUpdateFollowerCount();

    // Fetch every 3 seconds
    const intervalId = setInterval(fetchAndUpdateFollowerCount, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means it only runs once on mount

  return (
    <main className="w-full h-screen text-white flex flex-col gap-4 justify-center items-center Bg">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">{followerCount}</h1>
        <h1>Followers</h1>
      </div>
      <App />
      <Hero />
    </main>
  );
}
