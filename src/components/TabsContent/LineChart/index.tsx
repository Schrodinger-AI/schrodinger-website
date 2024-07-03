import { useEffect } from 'react';
import styles from './styles.module.scss';
import * as echarts from 'echarts';
import { ITabsModuleItemsContent } from '@/types/modules/tabsModule';
import Item from './Item';
import { getLineChartConfig } from './config';

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
    const option = getLineChartConfig(lineData);
    myChart.setOption(option);
  }, [lineData, lineData?.chartId, lineData?.dataX, lineData?.dataY, lineData?.lineColor]);

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
