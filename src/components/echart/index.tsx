'use client'
import ReactEcharts from 'echarts-for-react';
import { formatTimestamp } from '../../util/convertTimestamp';


export function Chart({type, data}:any){
  // const [startTimestamp, setStartTimestamp] = useState(1660759200000);
  // const [endTimestamp, setEndTimestamp] = useState(1691772300000);
  // const [dateRange, setDateRange] = useState([startTimestamp, endTimestamp]);


  // function handleSliderChange(range:any) {
  //   const monthToTimestamp = (monthsSinceStart:any) => {
  //     const date = new Date(startTimestamp);
  //     date.setMonth(date.getMonth() + monthsSinceStart);
  //     return date.getTime();
  //   };
  
  //   const startDate = monthToTimestamp(range[0]);
  //   const endDate = monthToTimestamp(range[1]);
  
  //   setDateRange([startDate, endDate]);
  // }

  // const SLRTimeStamp = SLRSlice(DLRtimeStamp)

  // const combinedTimestamps = [...APP15timeStamp, ...DLRtimeStamp];
  
  // const allTimestamps = Array.from(new Set(combinedTimestamps)).sort((a, b) => a - b);
  // const filteredTimestamps = allTimestamps.filter((ts => ts >= dateRange[0] && ts <= dateRange[1]));


  // const SLRData = filteredTimestamps.map(ts => {
  //   const index = SLRTimeStamp.indexOf(ts);
  //   return index !== -1 ? 1250 : null;
  // });

  // const APPData = filteredTimestamps.map(ts => {
  //   const index = APP15timeStamp.indexOf(ts);
  //   return index !== -1 ? APP15value[index] : null;
  // });
  
  // const DLRData = filteredTimestamps.map(ts => {
  //   const index = DLRtimeStamp.indexOf(ts);
  //   return index !== -1 ? DLRValue[index] : null;
  // });
  

  const colors = ['#5470C6', '#EE6666', "#aaf9a1","#c54fd6", "#f5ffd8","#e56fa6"];


  const chartOptions = {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {},
    
    grid: {
      top: 70,
      bottom: 50
    },

    yAxis: [
      {
        type: 'value'
      }
      
    ],
    dataZoom: [
      {
        type: 'inside',
        throttle: 50
      }
    ],
   
  };
  if(type==='cockpit'){
    const objetoteste = {
      xAxis: {
        name: `time [UTC ${data.UTC} ]`,
        nameLocation: "middle",
        nameTextStyle: {
          padding: [10, 0],
          fontSize: 16,
        },
        
        type: 'category',
        data: data.filteredTimestamps.map((ts:any) => formatTimestamp(ts))
      },
      series: [
      {
        name: 'APP',
        type: 'line',
        markLine: {
          symbol: ['none', 'none'],
          lineStyle: {
            type: 'dashed',
            width: 3
          },
          data: [{ xAxis: formatTimestamp("1691699400000")}],
          label: {
            position: 'end',
            rotate: 0,
            formatter: 'Esta é a data atual',
            show: true
          },
        },
        emphasis: {
          focus: "series"
        },
        blur: {
          focus: "none"
        },
          data: data.APPData
      },
      {
        name: 'DLR',
        type: 'line',
        data: data.DLRData,
        connectNulls: true
      },
      {
        name: 'SLR',
        type: 'line',
        data: data.SLRData
      }
    ]}

  Object.assign(chartOptions, objetoteste)
  }
  if(type==='analysis'){
    const objetoteste = {
      xAxis: {
        name: `distance [KM]`,
        nameLocation: "middle",
        nameTextStyle: {
          padding: [10, 0],
          fontSize: 16,
        
        },
        
        type: 'category',
        data: data.distanceKM.map((ts:any) => `${ts} km`)
      },
      series: [...data.valuesKM]}

  Object.assign(chartOptions, objetoteste)
  }

  return (
    <>
      <ReactEcharts option={{...chartOptions}} style={{ height: '400px', width: '100%' }}/>
    </>
  )
}

