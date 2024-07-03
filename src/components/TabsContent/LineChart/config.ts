import { ITabsModuleItemsContent } from '@/types/modules/tabsModule';

export const getLineChartConfig = (lineData: ITabsModuleItemsContent['lineData']) => {
  return {
    title: {
      text: '',
    },
    tooltip: {
      show: true,
      formatter: (params: any) => {
        const preData = lineData?.dataY[params.dataIndex - 1] || 0;
        const added = params.value - preData;
        return `current: ${params.value}M <br /> added: ${added}M`;
      },
      backgroundColor: '#2E2E3A',
      textStyle: {
        color: '#ffffff',
      },
    },
    xAxis: {
      type: 'category',
      data: lineData?.dataX,
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      splitArea: {
        show: false,
      },
      show: true,
      min: 0,
      max: 'dataMax',
      splitNumber: 5,
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt: 0,
          lt: lineData?.dataX.length,
          color: 'rgba(56, 136, 255, 0.4)',
        },
      ],
    },
    series: [
      {
        data: lineData?.dataY,
        type: 'line',
        lineStyle: {
          color: lineData?.lineColor || '#3888FF',
          width: 3,
        },
        symbolSize: 8,
        areaStyle: {},
      },
    ],
  };
};
