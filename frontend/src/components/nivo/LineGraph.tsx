import { ResponsiveLine } from "@nivo/line";

export type LineGraphData = {
  id: string;
  data: LineGraphDataPoint[];
};

export type LineGraphDataPoint = {
  x: string;
  y: number;
};

const LineGraph = ({ data }: { data: LineGraphData[] }) => {
  return (
    <div style={{ height: 300, widows: 600 }}>
      <ResponsiveLine
        data={data}
        animate={true}
        useMesh={true}
        // enableSlices={"x"}
        // enableCrosshair={true}
        margin={{ top: 50, right: 25, bottom: 100, left: 70 }}
        xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L", type: "time" }}
        xFormat="time:%Y-%m-%d (%H:%M:%S)"
        yScale={{ type: "linear", stacked: false, min: 0, max: "auto" }}
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickValues: "every 1 day",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          format: "%y-%m-%d",
          legend: "Time",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: "",
          legend: "Score",
          legendOffset: -60,
          legendPosition: "middle",
        }}
        // enableGridX={false}
        colors={{ scheme: "spectral" }}
        // lineWidth={1}
        // pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={false}
        pointLabel="xFormatted"
        pointLabelYOffset={-12}
        // gridXValues={[0, 20, 40, 60, 80, 100, 120]}
        // gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
        // legends={[
        //     {
        //         anchor: "bottom-right",
        //         direction: "column",
        //         justify: false,
        //         translateX: 140,
        //         translateY: 0,
        //         itemsSpacing: 2,
        //         itemDirection: "left-to-right",
        //         itemWidth: 80,
        //         itemHeight: 12,
        //         itemOpacity: 0.75,
        //         symbolSize: 12,
        //         symbolShape: "circle",
        //         symbolBorderColor: "rgba(0, 0, 0, .5)",
        //         effects: [
        //             {
        //                 on: "hover",
        //                 style: {
        //                     itemBackground: "rgba(0, 0, 0, .03)",
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
      />
    </div>
  );
};

export default LineGraph;
