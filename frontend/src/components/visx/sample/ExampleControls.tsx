import React, {useCallback, useMemo, useState} from 'react';
import {lightTheme, darkTheme, XYChartTheme} from '@visx/xychart';
import {PatternLines} from '@visx/pattern';
import {GlyphProps} from '@visx/xychart/lib/types';
import {AnimationTrajectory} from '@visx/react-spring/lib/types';
import {GlyphCross, GlyphDot, GlyphStar} from '@visx/glyph';
import {curveLinear, curveStep, curveCardinal} from '@visx/curve';
import customTheme from './customTheme';
import userPrefersReducedMotion from './userPrefersReducedMotion';
import getAnimatedOrUnanimatedComponents from './getAnimatedOrUnanimatedComponents';
import {ChartEntry, ChartPoint} from '../../../types';

const dateScaleConfig = {type: 'band', paddingInner: 0.3} as const;
const temperatureScaleConfig = {type: 'linear'} as const;
const numTicks = 4;

const defaultAnnotationDataIndex = 13;
const selectedDatumPatternId = 'xychart-selected-datum';

type Accessor = (d: ChartPoint) => number | Date;

interface Accessors {
  'San Francisco': Accessor;
  'New York': Accessor;
  Austin: Accessor;
}

type DataKey = keyof Accessors;

type SimpleScaleConfig = { type: 'band' | 'linear'; paddingInner?: number };

type ProvidedProps = {
  accessors: { x: Accessor; y:Accessor }
  animationTrajectory?: AnimationTrajectory;
  annotationDataKey: DataKey | null;
  annotationDatum?: ChartEntry;
  annotationLabelPosition: { dx: number; dy: number };
  annotationType?: 'line' | 'circle';
  colorAccessorFactory: (key: DataKey) => (d: ChartEntry) => string | null;
  config: {
    x: SimpleScaleConfig;
    y: SimpleScaleConfig;
  };
  curve: typeof curveLinear | typeof curveCardinal | typeof curveStep;
  data: ChartEntry[];
  editAnnotationLabelPosition: boolean;
  numTicks: number;
  setAnnotationDataIndex: (index: number) => void;
  setAnnotationDataKey: (key: DataKey | null) => void;
  setAnnotationLabelPosition: (position: { dx: number; dy: number }) => void;
  renderAreaSeries: boolean;
  renderAreaStack: boolean;
  renderBarGroup: boolean;
  renderBarSeries: boolean;
  renderBarStack: boolean;
  renderGlyph: React.FC<GlyphProps<ChartEntry>>;
  renderGlyphSeries: boolean;
  enableTooltipGlyph: boolean;
  renderTooltipGlyph: React.FC<GlyphProps<ChartPoint>>;
  renderHorizontally: boolean;
  renderLineSeries: boolean;
  sharedTooltip: boolean;
  showGridColumns: boolean;
  showGridRows: boolean;
  showHorizontalCrosshair: boolean;
  showTooltip: boolean;
  showVerticalCrosshair: boolean;
  snapTooltipToDatumX: boolean;
  snapTooltipToDatumY: boolean;
  stackOffset?: 'wiggle' | 'expand' | 'diverging' | 'silhouette';
  theme: XYChartTheme;
  xAxisOrientation: 'top' | 'bottom';
  yAxisOrientation: 'left' | 'right';
} & ReturnType<typeof getAnimatedOrUnanimatedComponents>;

type ControlsProps = {
  children: (props: ProvidedProps) => React.ReactNode;
  data: ChartEntry[]
};

function ExampleControls({children, data}: ControlsProps) {
  // TODO: Make all settings into a type
  const [useAnimatedComponents, setUseAnimatedComponents] = useState(true);
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);
  const [animationTrajectory, setAnimationTrajectory] = useState<AnimationTrajectory | undefined>(
      'center',
  );
  const [gridProps, setGridProps] = useState<[boolean, boolean]>([true, true]);
  const [showGridRows, showGridColumns] = gridProps;
  const [xAxisOrientation, setXAxisOrientation] = useState<'top' | 'bottom'>('bottom');
  const [yAxisOrientation, setYAxisOrientation] = useState<'left' | 'right'>('left');
  const [renderHorizontally, setRenderHorizontally] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [annotationDataKey, setAnnotationDataKey] = useState<ProvidedProps['annotationDataKey']>(
      null,
  );
  const [annotationType, setAnnotationType] = useState<ProvidedProps['annotationType']>('circle');
  // Tooltips
  const [showVerticalCrosshair, setShowVerticalCrosshair] = useState(true);
  const [showHorizontalCrosshair, setShowHorizontalCrosshair] = useState(true);
  const [snapTooltipToDatumX, setSnapTooltipToDatumX] = useState(true);
  const [snapTooltipToDatumY, setSnapTooltipToDatumY] = useState(true);
  const [sharedTooltip, setSharedTooltip] = useState(true);

  const [renderBarStackOrGroup, setRenderBarStackOrGroup] = useState<
    'bar' | 'barstack' | 'bargroup' | 'none'
  >('none');
  const [renderAreaLineOrStack, setRenderAreaLineOrStack] = useState<
    'line' | 'area' | 'areastack' | 'none'
  >('line');
  const [stackOffset, setStackOffset] = useState<ProvidedProps['stackOffset']>();
  const [renderGlyphSeries, setRenderGlyphSeries] = useState(true);
  const [editAnnotationLabelPosition, setEditAnnotationLabelPosition] = useState(false);
  const [annotationLabelPosition, setAnnotationLabelPosition] = useState({dx: -40, dy: -20});
  const [annotationDataIndex, setAnnotationDataIndex] = useState(defaultAnnotationDataIndex);
  const [negativeValues, setNegativeValues] = useState(false);
  const [fewerDatum, setFewerDatum] = useState(false);
  const [missingValues, setMissingValues] = useState(false);
  const [glyphComponent, setGlyphComponent] = useState<'star' | 'cross' | 'circle' | '🍍'>('star');
  const [curveType, setCurveType] = useState<'linear' | 'cardinal' | 'step'>('linear');
  const glyphOutline = theme.gridStyles.stroke;
  const renderGlyph = useCallback(
      ({size, color, onPointerMove, onPointerOut, onPointerUp}: GlyphProps<ChartEntry>) => {
        const handlers = {onPointerMove, onPointerOut, onPointerUp};
        if (glyphComponent === 'star') {
          return <GlyphStar stroke={glyphOutline} fill={color} size={size * 10} {...handlers} />;
        }
        if (glyphComponent === 'circle') {
          return <GlyphDot stroke={glyphOutline} fill={color} r={size / 2} {...handlers} />;
        }
        if (glyphComponent === 'cross') {
          return <GlyphCross stroke={glyphOutline} fill={color} size={size * 10} {...handlers} />;
        }
        return (
          <text dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          🍍
          </text>
        );
      },
      [glyphComponent, glyphOutline],
  );
  const [enableTooltipGlyph, setEnableTooltipGlyph] = useState(false);
  const [tooltipGlyphComponent, setTooltipGlyphComponent] = useState<
    'star' | 'cross' | 'circle' | '🍍'
  >('star');

  const renderTooltipGlyph = useCallback(
      ({
        x,
        y,
        size,
        color,
        onPointerMove,
        onPointerOut,
        onPointerUp,
      }: GlyphProps<ChartPoint>) => {
        const handlers = {onPointerMove, onPointerOut, onPointerUp};
        if (tooltipGlyphComponent === 'star') {
          return (
            <GlyphStar
              left={x}
              top={y}
              stroke={glyphOutline}
              fill={color}
              size={size * 10}
              {...handlers}
            />
          );
        }
        if (tooltipGlyphComponent === 'circle') {
          return (
            <GlyphDot left={x} top={y} stroke={glyphOutline} fill={color} r={size} {...handlers} />
          );
        }
        if (tooltipGlyphComponent === 'cross') {
          return (
            <GlyphCross
              left={x}
              top={y}
              stroke={glyphOutline}
              fill={color}
              size={size * 10}
              {...handlers}
            />
          );
        }
        return (
          <text x={x} y={y} dx="-0.75em" dy="0.25em" fontSize={14} {...handlers}>
          🍍
          </text>
        );
      },
      [tooltipGlyphComponent, glyphOutline],
  );
  // for series that support it, return a colorAccessor which returns a custom color if the datum is selected
  const colorAccessorFactory = useCallback(
      (dataKey: DataKey) => (d: ChartEntry) =>
      annotationDataKey === dataKey && d === data[annotationDataIndex] ?
        `url(#${selectedDatumPatternId})` :
        null,
      [annotationDataIndex, annotationDataKey],
  );

  const accessors = useMemo(
      () => ({
        x: (d: ChartPoint) => {
          return new Date(d.x);
        },
        y: (d: ChartPoint) => {
          return d.y;
        },
      }),
      [renderHorizontally, negativeValues],
  );

  const config = useMemo(
      () => ({
        x: dateScaleConfig,
        y: temperatureScaleConfig,
      }),
      [renderHorizontally],
  );

  // cannot snap to a stack position
  const canSnapTooltipToDatum =
    renderBarStackOrGroup !== 'barstack' && renderAreaLineOrStack !== 'areastack';

  return (
    <>
      {children({
        accessors,
        animationTrajectory,
        annotationDataKey,
        annotationDatum: data[annotationDataIndex],
        annotationLabelPosition,
        annotationType,
        colorAccessorFactory,
        config,
        curve:
          (curveType === 'cardinal' && curveCardinal) ||
          (curveType === 'step' && curveStep) ||
          curveLinear,
        data,
        editAnnotationLabelPosition,
        numTicks,
        renderBarGroup: renderBarStackOrGroup === 'bargroup',
        renderBarSeries: renderBarStackOrGroup === 'bar',
        renderBarStack: renderBarStackOrGroup === 'barstack',
        renderGlyphSeries,
        renderGlyph,
        enableTooltipGlyph,
        renderTooltipGlyph,
        renderHorizontally,
        renderAreaSeries: renderAreaLineOrStack === 'area',
        renderAreaStack: renderAreaLineOrStack === 'areastack',
        renderLineSeries: renderAreaLineOrStack === 'line',
        setAnnotationDataIndex,
        setAnnotationDataKey,
        setAnnotationLabelPosition,
        sharedTooltip,
        showGridColumns,
        showGridRows,
        showHorizontalCrosshair,
        showTooltip,
        showVerticalCrosshair,
        snapTooltipToDatumX: canSnapTooltipToDatum && snapTooltipToDatumX,
        snapTooltipToDatumY: canSnapTooltipToDatum && snapTooltipToDatumY,
        stackOffset,
        theme,
        xAxisOrientation,
        yAxisOrientation,
        ...getAnimatedOrUnanimatedComponents(useAnimatedComponents),
      })}
      {/** This style is used for annotated elements via colorAccessor. */}
      <svg className="pattern-lines">
        <PatternLines
          id={selectedDatumPatternId}
          width={6}
          height={6}
          orientation={['diagonalRightToLeft']}
          stroke={theme?.axisStyles.x.bottom.axisLine.stroke}
          strokeWidth={1.5}
        />
      </svg>
      <div className="controls">
        {/** data */}
        <div>
          <strong>data</strong>
          <label>
            <input
              type="checkbox"
              onChange={() => setNegativeValues(!negativeValues)}
              checked={negativeValues}
            />
            negative values (SF)
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setMissingValues(!missingValues)}
              checked={missingValues}
            />
            missing values
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setFewerDatum(!fewerDatum)}
              checked={fewerDatum}
            />
            fewer datum
          </label>
        </div>

        {/** theme */}
        <div>
          <strong>theme</strong>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(lightTheme)}
              checked={theme === lightTheme}
            />
            light
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(darkTheme)}
              checked={theme === darkTheme}
            />
            dark
          </label>
          <label>
            <input
              type="radio"
              onChange={() => setTheme(customTheme)}
              checked={theme === customTheme}
            />
            custom
          </label>
        </div>
      </div>
      <style >{`
        .controls {
          font-size: 13px;
          line-height: 1.5em;
        }
        .controls > div {
          margin-bottom: 4px;
        }
        label {
          font-size: 12px;
        }
        input[type='radio'] {
          height: 10px;
        }
        .pattern-lines {
          position: absolute;
          pointer-events: none;
          opacity: 0;
        }
      `}</style>
    </>
  );
}

export type{ProvidedProps};
export {ExampleControls};
