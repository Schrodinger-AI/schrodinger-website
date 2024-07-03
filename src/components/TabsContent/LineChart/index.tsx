import { useEffect } from 'react';
import styles from './styles.module.scss';
import * as echarts from 'echarts';
import { ITabsModuleItemsContent } from '@/types/modules/tabsModule';
import Item from './Item';

export default function LineChart({
  lineData,
  dataList,
}: {
  lineData: ITabsModuleItemsContent['lineData'];
  dataList?: ITabsModuleItemsContent['dataList'];
}) {
  useEffect(() => {
    if (!document.getElementById(lineData?.chartId || 'main')) return;
    const myChart = echarts.init(document.getElementById(lineData?.chartId || 'main'));
    const option = {
      title: {
        text: '',
      },
      grid: {
        show: false,
      },
      tooltip: {},
      legend: {
        data: ['sales'],
      },
      xAxis: {
        type: 'category',
        data: lineData?.dataX,
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      visualMap: {
        type: 'piecewise',
        show: false,
        dimension: 0,
        seriesIndex: 0,
        pieces: [
          {
            gt: 0,
            lt: 2,
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
          areaStyle: {},
        },
      ],
    };
    myChart.setOption(option);
  }, [lineData?.chartId, lineData?.dataX, lineData?.dataY, lineData?.lineColor]);

  return (
    <div className={styles.lineChartWrap}>
      <div className={styles.chartWrap}>
        <div id={lineData?.chartId || 'main'} className={styles.chartCanvas}></div>
      </div>
      {dataList?.length ? (
        <div className={styles.dataListWrap}>
          {dataList?.map((item, index) => {
            return <Item key={index} {...item} />;
          })}
        </div>
      ) : null}
    </div>
  );
}
