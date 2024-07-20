import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { EChartsOption, BarSeriesOption } from 'echarts';

interface ICategoryData {
  value: number[];
  barColor: string;
  barHeightCoefficient: number;
}

interface IStackedBarProps {
  dataByCategory: Record<string, ICategoryData>;
  xAxisValues: string[];
}

const StackedBar: React.FC<IStackedBarProps> = ({ dataByCategory, xAxisValues }) => {
  const series: BarSeriesOption[] = Object.keys(dataByCategory).map((name, index) => ({
    name,
    type: 'bar',
    stack: 'total',
    barWidth: '40%',
    label: {
      show: true,
      color: 'black',
      fontSize: '15px',
      formatter: (params: any) => parseFloat((params.value / dataByCategory[name].barHeightCoefficient).toFixed(1)),
    },
    data: dataByCategory[name].value,
    itemStyle: {
      color: dataByCategory[name].barColor,
    },
  }));

  const option: EChartsOption = {
    legend: {
      selectedMode: false,
    },
    grid: {
      left: 100,
      right: 100,
      top: 50,
      bottom: 50,
    },
    yAxis: {
      type: 'value',
    },
    xAxis: {
      type: 'category',
      data: xAxisValues,
    },
    series,
  };

  return <ReactECharts option={option} echarts={echarts} />;
};

export default StackedBar;