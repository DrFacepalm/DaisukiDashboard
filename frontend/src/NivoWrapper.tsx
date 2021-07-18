import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./App.css";
import { default as myData } from "./data/tp_min.json";
import LineGraph from "./components/nivo/LineGraph";

function App() {
  const [chartData, setChartData] = useState(myData);
  return (
    <div style={{ height: 300, widows: 600 }}>
      <Button
        onClick={() => {
          const size = Math.floor(Math.random() * myData[0].data.length + 1);
          const start = Math.floor(
            Math.random() * (myData[0].data.length - size)
          );
          setChartData([
            {
              id: "fatezero",
              data: myData[0].data.slice(start, start + size),
            },
          ]);

          console.log(chartData[0].data.length);
        }}
      >
        hello
      </Button>
      <LineGraph data={chartData} />
    </div>
  );
}

export default App;
