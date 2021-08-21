import type {ChartData} from '../types';

const filterClusters = (data: ChartData, timeBuffer: number):ChartData => {
  const newdata = data.map((userData) => {
    console.log('START', userData);
    let prevTime:Date;
    let thresholdTime:Date;
    userData.data = userData.data.filter(({x})=> {
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
    } );
    return userData;
  });
  console.log(newdata);
  return data;
};

export default filterClusters;
