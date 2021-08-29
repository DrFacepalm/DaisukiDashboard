import React, {useState} from 'react';
import {extent, max} from 'd3-array';
import * as allCurves from '@visx/curve';
import {Group} from '@visx/group';
import {LinePath} from '@visx/shape';
import {scaleTime, scaleLinear} from '@visx/scale';
import {
  MarkerArrow,
  MarkerCross,
  MarkerX,
  MarkerCircle,
  MarkerLine,
} from '@visx/marker';
import {AxisBottom, AxisLeft} from '@visx/axis';
import {CircleSubject, Connector, EditableAnnotation, Label} from '@visx/annotation';
import {XYChart, Grid} from '@visx/xychart';
import {ChartEntry, ChartData, ChartPoint} from '../../types';


type CurveType = keyof typeof allCurves;

const curveTypes = Object.keys(allCurves);

// data accessors
const getX = (d: ChartPoint) => {
  return new Date(d.x);
};
const getY = (d: ChartPoint) => {
  return d.y;
};

export type CurveProps = {
  width: number;
  height: number;
  showControls?: boolean;
};

export default function Example({
  data,
  colors,
  colourMapping,
}: {
  data: ChartData;
  colors: string[];
  colourMapping: {
    [k: string]: number;
  };
}) {
  const series = data;

  let edgeSpData: number[] = [];

  data.forEach((user, index) => {
    edgeSpData = edgeSpData.concat(extent(user.data, getY));
  });

  const xScale = scaleTime<number>({
    domain: extent(data[0].data, getX) as [Date, Date],
  });

  console.log(xScale);
  console.log(extent(data[0].data, getX));

  const yMax = max(edgeSpData) as number;
  const yScale = scaleLinear<number>({
    domain: [0, yMax],
  });

  const width = 1000;
  const axisPadding = 70;
  const bAxisPadding = 40;
  const height = 400;
  const showControls = true;
  const [curveType, setCurveType] = useState<CurveType>('curveNatural');
  const [showPoints, setShowPoints] = useState<boolean>(true);

  const svgHeight = showControls ? height - bAxisPadding : height;
  const lineHeight = svgHeight;

  // update scale output ranges
  xScale.range([0, width - 50]);
  yScale.range([lineHeight - 2, 0]);

  console.log(colors);


  return (
    <div className="visx-curves-demo">
      {showControls && (
        <>
          <label>
            Curve type &nbsp;
            <select
              onChange={(e) => setCurveType(e.target.value as CurveType)}
              value={curveType as string}
            >
              {curveTypes.map((curve) => (
                <option key={curve} value={curve}>
                  {curve}
                </option>
              ))}
            </select>
          </label>
          &nbsp;
          <label>
            Show points&nbsp;
            <input
              type="checkbox"
              checked={showPoints}
              onChange={() => setShowPoints(!showPoints)}
            />
          </label>
          <br />
        </>
      )}
      <svg width={width+axisPadding} height={svgHeight+2000}>
        <MarkerX
          id="marker-x"
          stroke="#333"
          size={4}
          strokeWidth={1}
          markerUnits="userSpaceOnUse"
        />
        <MarkerCross
          id="marker-cross"
          stroke="#333"
          size={4}
          strokeWidth={1}
          strokeOpacity={0.6}
          markerUnits="userSpaceOnUse"
        />

        <MarkerCircle id="marker-circle" fill="transparent" size={2} refX={2}/>
        <MarkerArrow
          id="marker-arrow-odd"
          stroke="#333"
          size={1}
          strokeWidth={1}
        />
        <MarkerLine id="marker-line" fill="#333" size={1} strokeWidth={1} />
        <MarkerArrow id="marker-arrow" fill="#333" refX={2} size={6} />
        <rect width={width+axisPadding} height={svgHeight+40} fill="transparent" rx={14} ry={14} />
        {series.map((lineData, i) => {
          const even = i % 2 === 0;
          let markerStart = even ? 'url(#marker-cross)' : 'url(#marker-x)';
          if (i === 1) markerStart = 'url(#marker-line)';
          const markerEnd = even ?
            'url(#marker-arrow)' :
            'url(#marker-arrow-odd)';
          return (
            <Group key={`lines-${i}`} top={0} left={axisPadding}>
              {showPoints &&
                lineData.data.map((d, j) => (
                  <>
                    <EditableAnnotation
                      x={xScale(getX(d))}
                      y={yScale(getY(d))}
                      width={200}
                      height={200}
                      onDragEnd={()=>{}}

                      dx={0} // x offset of label from subject
                      dy={0} // y offset of label from subject
                    >
                      <Connector />
                      <CircleSubject />
                      <Label title="Context about this point" subtitle="More deets"/>
                    </EditableAnnotation>

                    <circle
                      key={i + j}
                      r={2}
                      cx={xScale(getX(d))}
                      cy={yScale(getY(d))}
                      stroke={colors[colourMapping[lineData.id]]}
                      fill="transparent"
                    />
                  </>
                ))}
              <AxisLeft scale={yScale} />
              <text x="-160" y="-60" transform="rotate(-90)" fontSize={10}>
                Points
              </text>
              <AxisBottom
                top={height-bAxisPadding}
                scale={xScale}
                tickStroke="#000"
                stroke="#000"
                tickLabelProps={()=>({fill: '#000', fontSize: 11, textAnchor: 'middle'})}
                numTicks={width > 520 ? 10 : 5}
              />
              <text x={width/2} y={height} fontSize={10}>
                Date
              </text>
              <LinePath<ChartPoint>
                curve={allCurves[curveType]}
                data={lineData.data}
                x={(d) => xScale(getX(d)) ?? 0}
                y={(d) => yScale(getY(d)) ?? 0}
                stroke={colors[colourMapping[lineData.id]]}
                strokeWidth={even ? 2 : 1}
                strokeOpacity={even ? 0.6 : 1}
                shapeRendering="geometricPrecision"
                markerMid="url(#marker-circle)"
                markerStart={markerStart}
                markerEnd={markerEnd}
              />
            </Group>
          );
        })}
      </svg>
      {/* @ts-ignore */}
      <style jsx>{`
        .visx-curves-demo label {
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
