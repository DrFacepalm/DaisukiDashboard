type ChartEntry = {
  id: string,
  data: Array<{
    x: string,
    y: number
  }>
};

type ChartData = Array<ChartEntry>;

export type {ChartEntry, ChartData};
