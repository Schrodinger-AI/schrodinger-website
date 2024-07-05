import { ITabsModuleItemsContent } from '@/types/modules/tabsModule';

export const getLineChartConfig = (
  lineData: ITabsModuleItemsContent['lineData'],
  params?: {
    areaStyle?: any;
    grid?: any;
    yAxisLabelFormatter?: string;
  },
) => {
  return {
    title: {
      text: '',
    },
    grid: params?.grid || {
      top: 10,
      right: 20,
      bottom: 20,
    },
    tooltip: {
      show: true,
      formatter: (params: any) => {
        // const preData = lineData?.dataY[params.dataIndex - 1] || 0;
        // const added = params.value - preData;
        return `Estimated Supply: ${params.value} M`;
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
      splitLine: {
        show: false,
      },
      min: 0,
      max: 'dataMax',
      splitNumber: 1,
      axisLabel: {
        formatter: params?.yAxisLabelFormatter ? params.yAxisLabelFormatter : null,
      },
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
          color: 'rgba(56, 136, 255)',
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
        itemStyle: {
          borderWidth: 4,
        },
        symbolSize: 8,
        areaStyle: params?.areaStyle,
      },
    ],
  };
};
