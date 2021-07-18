import { ResponsiveLine, PointTooltip, Point } from "@nivo/line";
import { Tooltip } from "@nivo/tooltip";
import styled from "styled-components";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
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

const StyledToolTip = styled(Card)`
  background: var(--bg-color);
  color: var(--main-color);
`;
const customTooltip: PointTooltip = ({ point }: { point: Point }) => (
  <StyledToolTip>
    <CardContent>
      <Typography color="textSecondary">
        <span style={{ color: point.serieColor }}>[</span>
        {point.serieId}
        <span style={{ color: point.serieColor }}>]</span>
      </Typography>
      <Typography variant="h5">{point.data.yFormatted}</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {point.data.xFormatted}
      </Typography>
      {/* {point.y} */}
    </CardContent>
  </StyledToolTip>
);

const LineGraph = ({ data }: { data: LineGraphData[] }) => {
  return (
    <div style={{ height: "80vh" }}>
      <ResponsiveLine
        data={data}
        animate={true}
        useMesh={true}
        // enableSlices={"x"}
        // enableCrosshair={true}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ format: "%Y-%m-%dT%H:%M:%S.%L", type: "time" }}
        xFormat="time:%Y-%m-%d (%H:%M:%S)"
        yScale={{ type: "linear", stacked: false, min: 0, max: "auto" }}
        curve="natural"
        theme={theme}
        tooltip={customTooltip}
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
        colors={{ scheme: "spectral" }}
        pointColor={{ theme: "background" }}
        pointBorderWidth={1}
        pointBorderColor={{ from: "serieColor" }}
        enablePointLabel={false}
        pointLabel="xFormatted"
        pointLabelYOffset={-12}
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 140,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemDirection: "left-to-right",
        //     itemWidth: 80,
        //     itemHeight: 12,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemBackground: "rgba(0, 0, 0, .03)",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};

export default LineGraph;
