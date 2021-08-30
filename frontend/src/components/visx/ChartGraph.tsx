import React from 'react';
import {XYChart, Grid, LineSeries} from '@visx/xychart';
import {ChartData, ChartEntry, ChartPoint} from '../../types';
import {curveLinear} from '@visx/curve';
import {extent, max} from 'd3-array';
import {scaleTime, scaleLinear} from '@visx/scale';
import {ScaleConfig} from '@visx/scale';
import {AnimatedAxis, AnimatedGrid, Tooltip} from '@visx/xychart';
import {AnimationTrajectory} from '@visx/react-spring/lib/types';

import cityTemperature, {CityTemperature} from '@visx/mock-data/lib/mocks/cityTemperature';
const dataSample = cityTemperature.slice(225, 275);


type Accessor = (d: ChartPoint) => number | Date;

interface IChartGraph {
  data: ChartData;
  colors: string[];
  colourMapping: {
    [k: string]: number;
  };
}

const stringDateFormatted = (s: string): string => {
  const date = new Date(s);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const ChartGraph = ({data, colors, colourMapping}: IChartGraph) => {
  console.log(dataSample);
  console.log(data);
  // data accessors
  const getX = (d: ChartPoint) => {
    return new Date(d.x);
  };
  const getY = (d: ChartPoint) => {
    return d.y;
  };

  const xAccessor:Accessor = (d) => {
    return new Date(d.x);
  };
  const yAccessor:Accessor = (d) => {
    return d.y;
  };

  const xScaleConfig = {type: 'band', paddingInner: 0.3} as const;
  const yScaleConfig = {type: 'linear'} as const;
  const numTicks = 10;
  return (
    <XYChart height={400} width={window.innerWidth*0.95} xScale={xScaleConfig} yScale={yScaleConfig}>
      {data.map((userData: ChartEntry) => {
        return (
          <LineSeries
            key={userData.id}
            dataKey={userData.id}
            data={userData.data}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            curve={curveLinear}
            stroke={colors[colourMapping[userData.id]]}
          />
        );
      } )}
      <AnimatedAxis
        key={`sp-axis-y`}
        label={'Score'}
        orientation={'left'}
        numTicks={numTicks}
        animationTrajectory={'center'}
        // values don't make sense in stream graph
        tickFormat={undefined}
      />

      <AnimatedAxis
        key='time-axis-x'
        orientation='bottom'
        numTicks={numTicks}
        label="Time"
        // tickValues={['a', 'b', 'c', 'd', 'e']}
        // tickLength={50}
        // tickFormat={(value, index, values) => {
        //   console.log(value);
        //   console.log(values);
        //   return value;
        // }}
        animationTrajectory={'center'}
        tickFormat={(val: Date) => {
          // console.log(val);
          return `${val.getFullYear()}-${val.getMonth()+1}-${val.getDate()}`;
          return 'AY';
        } }
      />
      <AnimatedGrid
        key={`grid`}
        rows={true}
        columns={true}
        animationTrajectory={'center'}
        numTicks={numTicks}
      />

      <Tooltip<ChartPoint>
        showHorizontalCrosshair={true}
        showVerticalCrosshair={true}
        snapTooltipToDatumX={true}
        snapTooltipToDatumY={true}
        showDatumGlyph={true}
        showSeriesGlyphs={false}
        renderGlyph={undefined}
        renderTooltip={({tooltipData, colorScale}) => {
          console.log(tooltipData);
          return (
            <>
              {/** date */}
              {/* TODO: Use date format from Nivo LineGraph implementation */}
              {(tooltipData?.nearestDatum?.datum &&
                    tooltipData?.nearestDatum?.key) ||
                    'No date'}
              <br/>
              {(tooltipData?.nearestDatum?.datum &&
                    stringDateFormatted((tooltipData?.nearestDatum?.datum).x)) ||
                    'No date'}
              <br />
              <br />
              {(tooltipData?.nearestDatum?.datum &&
                    (tooltipData?.nearestDatum?.datum).y) ||
                    'No value'}
            </>
          );
        }}
      />


    </XYChart>


  );
};

export {ChartGraph};
