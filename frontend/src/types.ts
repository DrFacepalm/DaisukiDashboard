type ChartPoint = {
  x: string,
  y: number
}

type ChartEntry = {
  id: string,
  data: Array<ChartPoint>
};

type ChartData = Array<ChartEntry>;

export type {ChartEntry, ChartData, ChartPoint};
