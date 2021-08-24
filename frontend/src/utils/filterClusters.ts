import type {ChartEntry, ChartData} from '../types';

const filterClusters = (data: ChartData, timeBuffer: number):ChartData => {
  const newdata = data.map((userData) => {
    let prevTime:Date;
    let thresholdTime:Date;
    const filteredData: ChartEntry = userData;
    const finalTime = new Date(userData.data[userData.data.length-1].x);
    filteredData.data = userData.data.filter(({x}, index)=> {
      if (index === userData.data.length - 1) {
        return true;
      }
      const currentTime = new Date(x);
      if ((finalTime.getTime() - currentTime.getTime()) < timeBuffer) {
        return false;
      }
      if (!prevTime) {
        prevTime = new Date(x);
        thresholdTime = new Date(prevTime.getTime() + timeBuffer);
        return true;
      }
      const curDate = new Date(x);
      if (curDate >= thresholdTime) {
        prevTime = curDate;
        thresholdTime = new Date(prevTime.getTime() + timeBuffer);
        return true;
      } else {
        return false;
      }
    });
    return filteredData;
  });
  return newdata;
};

export default filterClusters;
