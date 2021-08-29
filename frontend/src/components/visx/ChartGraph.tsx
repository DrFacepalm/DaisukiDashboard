import React from 'react';
import {XYChart, Grid, LineSeries} from '@visx/xychart';
import {ChartData, ChartEntry, ChartPoint} from '../../types';
import {curveLinear} from '@visx/curve';
import {extent, max} from 'd3-array';
import {scaleTime, scaleLinear} from '@visx/scale';
import {ScaleConfig} from '@visx/scale';
import {AnimatedAxis, Tooltip} from '@visx/xychart';
import {AnimationTrajectory} from '@visx/react-spring/lib/types';

import cityTemperature, {CityTemperature} from '@visx/mock-data/lib/mocks/cityTemperature';
const dataSample = cityTemperature.slice(225, 275);


type Accessor = (d: ChartPoint) => number | Date;

interface IChartGraph {
  data: ChartData
}

const ChartGraph = ({data}: IChartGraph) => {
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
  const numTicks = 5;
  return (
    <XYChart height={400} width={600} xScale={xScaleConfig} yScale={yScaleConfig}>
      {data.map((userData: ChartEntry) => {
        return (
          <LineSeries
            key={userData.id}
            dataKey={userData.id}
            data={userData.data}
            xAccessor={xAccessor}
            yAccessor={yAccessor}
            curve={curveLinear}
          />
        );
      } )}
      <AnimatedAxis
        key={`sp-axis-y`}
        label={'SP Value'}
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
        tickFormat={(val: Date, index, values) => {
          console.log('THINGOOOO');
          console.log(val);
          console.log(index);
          console.log(values);
          return `${val.getFullYear()}-${val.getMonth()}-${val.getDate()}`;
        } }
      />

      <Tooltip<ChartPoint>
        showHorizontalCrosshair={true}
        showVerticalCrosshair={true}
        snapTooltipToDatumX={true}
        snapTooltipToDatumY={true}
        showDatumGlyph={true}
        showSeriesGlyphs={false}
        renderGlyph={undefined}
        renderTooltip={({tooltipData, colorScale}) => (
          <>
            {/** date */}
            {/* TODO: Use date format from Nivo LineGraph implementation */}
            {(tooltipData?.nearestDatum?.datum &&
                    new Date((tooltipData?.nearestDatum?.datum).x).toString() ) ||
                    'No date'}
            <br />
            <br />
            {(tooltipData?.nearestDatum?.datum &&
                    (tooltipData?.nearestDatum?.datum).y) ||
                    'No value'}
            {/** temperatures */}
            {/* {((sharedTooltip ?
                    Object.keys(tooltipData?.datumByKey ?? {}) :
                    [tooltipData?.nearestDatum?.key]
                  ).filter((city) => city) as City[]).map((city) => {
                    const temperature =
                      tooltipData?.nearestDatum?.datum &&
                      accessors[renderHorizontally ? 'x' : 'y'][city](
                          tooltipData?.nearestDatum?.datum,
                      );

                    return (
                      <div key={city}>
                        <em
                          style={{
                            color: colorScale?.(city),
                            textDecoration:
                              tooltipData?.nearestDatum?.key === city ? 'underline' : undefined,
                          }}
                        >
                          {city}
                        </em>{' '}
                        {temperature == null || Number.isNaN(temperature) ?
                          '–' :
                          `${temperature}° F`}
                      </div>
                    );
                  })} */}
          </>
        )}
      />


    </XYChart>


  );
};

export {ChartGraph};
