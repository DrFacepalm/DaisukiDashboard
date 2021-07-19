import { ResponsiveBump } from "@nivo/bump";
export type LineGraphData = {
  id: string;
  data: LineGraphDataPoint[];
};

export type LineGraphDataPoint = {
  x: string;
  y: number;
};

const theme = {
  background: "var(--bg-color)",
  textColor: "var(--main-color)",
  fontSize: 16,
  axis: {
    domain: {
      line: {
        stroke: "var(--sub-color)",
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: "var(--sub-color)",
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: "var(--sub-color)",
      strokeWidth: 1,
    },
  },
  crosshair: {
    line: {
      stroke: "var(--sub-color)",
    },
  },
};

const LineGraph = ({
  data,
  colors,
}: {
  data: LineGraphData[];
  colors: string[];
}) => {
  return (
    <div style={{ height: "70vh" }}>
      <ResponsiveBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        theme={theme}
        colors={colors}
        // lineWidth={3}
        // activeLineWidth={6}
        // inactiveLineWidth={3}
        // inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: "background" }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: "serie.color" }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "ranking",
          legendPosition: "middle",
          legendOffset: -40,
        }}
      />
    </div>
  );
};

export default LineGraph;
