import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import './App.css';
import { Line, ResponsiveLine } from "@nivo/line";
import { default as myData } from './data/tp_min.json';
function App() {
  const [chartData, setChartData] = useState(myData);
  return (
    <div style={{ height: 300, widows: 600 }}>
      <Button onClick={() => {
        const size = Math.floor((Math.random() * myData[0].data.length) + 1);
        const start = Math.floor((Math.random() * (myData[0].data.length - size)));
        setChartData([{
          "id": "fatezero",
          "data": myData[0].data.slice(start, start + size),
        }]);

        console.log(chartData[0].data.length);
      }}>hello</Button>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L", type: "time" }}
        xFormat="time:%Y-%m-%dT%H:%M:%S.%L"
        yScale={{ type: "linear", stacked: false, min: 0, max: 'auto' }}
        curve="monotoneX"
        axisTop={null}
        animate={true}
        axisRight={{
          tickSize: 100,
          legend: "Scores",
          legendOffset: 0
        }}
        axisBottom={{
          tickValues: "every 1 day",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: "%Y-%m-%d",
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle"
        }}
        axisLeft={{
          tickSize: 100,
          legend: "Scores",
          legendOffset: -40,
          legendPosition: "middle"
        }}
        enableGridX={false}
        colors={{ scheme: "spectral" }}
        lineWidth={1}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={false}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        // gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        // gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 140,
            translateY: 0,
            itemsSpacing: 2,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 12,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}

export default App;
