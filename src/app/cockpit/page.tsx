'use client'
import { Chart } from "@/components/echart";
import SliderDemo from "@/components/slider";
import { APP15timeStamp, APP15value } from "@/constants/APP15min";
import { APP5timeStamp, APP5value } from "@/constants/APP5min";
import { DLR15Value, DLR15timeStamp } from "@/constants/DLR15min";
import { DLR5Value, DLR5timeStamp } from "@/constants/DLR5min";
import { SLRSlice } from "@/util/SLRSlice";
import { useState } from "react";

export default function Cockpit() {
  //[Inicio]Responsavel pelo slider
  const [startTimestamp, setStartTimestamp] = useState(1682510400000);
  const [endTimestamp, setEndTimestamp] = useState(1694973600000);
  const [dateRange, setDateRange] = useState([startTimestamp, endTimestamp]);

  //aqui faz uma checagem para separar em 12 meses
  function handleSliderChange(range:any) {
    const monthToTimestamp = (monthsSinceStart:any) => {
      const date = new Date(startTimestamp);
      date.setMonth(date.getMonth() + monthsSinceStart);
      return date.getTime();
    };
  
    const startDate = monthToTimestamp(range[0]);
    const endDate = monthToTimestamp(range[1]);
  
    setDateRange([startDate, endDate]);
  }
  //[FIM]Responsavel pelo slider
  const SLRTimeStamp = SLRSlice(DLR5timeStamp)

  //[Inicio]Combina o Timespatamp para o eixo X
  const combinedTimestamps = [...APP5timeStamp, ...DLR5timeStamp];
  
  const allTimestamps = Array.from(new Set(combinedTimestamps)).sort((a, b) => a - b);
  //[FIM]Combina o Timespatamp para o eixo X
  const filteredTimestamps = allTimestamps.filter((ts => ts >= dateRange[0] && ts <= dateRange[1]));


  //[Inicio]Faz a igualdade do comprimento das datas do eixo X, caso não existir dado colocar NULL
  const SLRData = filteredTimestamps.map(ts => {
    const index = SLRTimeStamp.indexOf(ts);
    return index !== -1 ? 150 : null;
  });

  const APPData = filteredTimestamps.map(ts => {
    const index = APP5timeStamp.indexOf(ts);
    return index !== -1 ? APP5value[index] : null;
  });
  
  const DLRData = filteredTimestamps.map(ts => {
    const index = DLR5timeStamp.indexOf(ts);
    return index !== -1 ? DLR5Value[index] : null;
  });

  //[Final]Faz a igualdade do comprimento das datas do eixo X, caso não existir dado colocar NULL
  //(UTC do cliente)
  const UTC = '0'
  //(UTC do cliente)

  //segundo exemplo
  const SLR15TimeStamp = SLRSlice(DLR15timeStamp)

  //[Inicio]Combina o Timespatamp para o eixo X
  const combined15Timestamps = [...APP15timeStamp, ...DLR15timeStamp];
  
  const all15Timestamps = Array.from(new Set(combined15Timestamps)).sort((a, b) => a - b);
  //[FIM]Combina o Timespatamp para o eixo X
  const filtered15Timestamps = all15Timestamps.filter((ts => ts >= dateRange[0] && ts <= dateRange[1]));

  const SLR15Data = filtered15Timestamps.map(ts => {
    const index = SLR15TimeStamp.indexOf(ts);
    return index !== -1 ? 150 : null;
  });

  const APP15Data = filtered15Timestamps.map(ts => {
    const index = APP15timeStamp.indexOf(ts);
    return index !== -1 ? APP15value[index] : null;
  });
  
  const DLR15Data = filtered15Timestamps.map(ts => {
    const index = DLR15timeStamp.indexOf(ts);
    return index !== -1 ? DLR15Value[index] : null;
  });

  return (
    <>
    {startTimestamp && endTimestamp && (
      <SliderDemo onSliderChange={handleSliderChange} startTimestamp={startTimestamp} endTimestamp={endTimestamp} />
  )}
    <div style={{ width: '100%', display:"grid", gridTemplateColumns:'1fr 1fr' }} >
     <Chart type={'cockpit'} data={{SLRData,APPData,DLRData, filteredTimestamps,UTC }}/>
      <Chart type={'cockpit'} data={{SLRData:SLR15Data,APPData:APP15Data,DLRData:DLR15Data, filteredTimestamps:filtered15Timestamps,UTC }}/>
    </div>
    </>)
}
