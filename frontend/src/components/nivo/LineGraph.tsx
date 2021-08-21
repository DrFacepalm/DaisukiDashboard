import React from 'react';
import {ResponsiveLine, PointTooltip, Point} from '@nivo/line';
import styled from 'styled-components';
import {Card, CardContent, Typography} from '@material-ui/core';
export type LineGraphData = {
  id: string;
  data: LineGraphDataPoint[];
};

export type LineGraphDataPoint = {
  x: string;
  y: number;
};

const theme = {
  background: 'var(--bg-color)',
  textColor: 'var(--main-color)',
  fontSize: 16,
  axis: {
    domain: {
      line: {
        stroke: 'var(--sub-color)',
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: 'var(--sub-color)',
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: 'var(--sub-color)',
      strokeWidth: 1,
    },
  },
  crosshair: {
    line: {
      stroke: 'var(--sub-color)',
    },
  },
};

const StyledToolTip = styled(Card)`
  background: var(--bg-color);
  color: var(--main-color);
  // pointer-events: none;
  // width: 200px;
  // height: 100px;
`;
const CustomTooltip: PointTooltip = ({point}: { point: Point }) => (
  <StyledToolTip>
    <CardContent>
      <Typography>
        <span style={{color: point.serieColor}}>[</span>
        {point.serieId}
        <span style={{color: point.serieColor}}>]</span>
      </Typography>
      <Typography variant="h5">{point.data.yFormatted}</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        {point.data.xFormatted}
      </Typography>
      {/* {point.y} */}
    </CardContent>
  </StyledToolTip>
  // <></>
);

const LineGraph = ({
  data,
  colors,
}: {
  data: LineGraphData[];
  colors: string[];
}) => {
  return (
    <div style={{height: '70vh'}}>
      <ResponsiveLine
        data={data}
        animate={true}
        useMesh={true}
        // enableSlices={"x"}
        // enableCrosshair={true}
        // debugMesh={true}
        margin={{top: 50, right: 50, bottom: 50, left: 100}}
        xScale={{format: '%Y-%m-%dT%H:%M:%S.%L', type: 'time'}}
        xFormat="time:%Y-%m-%d (%H:%M:%S)"
        yScale={{type: 'linear', stacked: false, min: 0, max: 'auto'}}
        curve="natural"
        theme={theme}
        tooltip={CustomTooltip}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          // tickValues: "every 1 day",
          // tickSize: 5,
          // tickPadding: 5,
          // tickRotation: 30,
          format: '%y-%m-%d',
          legend: 'Time',
          legendOffset: 40,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: '',
          legend: 'Score',
          legendOffset: -80,
          legendPosition: 'middle',
        }}
        // colors={{scheme: 'spectral'}}
        // colors={["#03C8B1", "#5AA8FF", "#D44086", "#EC9936", "#FFCC00"]}
        colors={colors}
        pointColor={{from: 'color'}}
        pointBorderWidth={1}
        pointBorderColor={{from: 'serieColor'}}
        enablePointLabel={false}
        pointLabel="xFormatted"
        pointLabelYOffset={-12}
      />
    </div>
  );
};

export default LineGraph;
