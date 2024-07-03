import clsx from 'clsx';
import useGetVertical from '@/hooks/useGetVertical';

import styles from './styles.module.scss';
import { Radio } from 'antd';
import { useMemo, useState } from 'react';
import LineChart from '@/components/TabsContent/LineChart';
import { ITabsModule, ITabsModuleItemsContent } from '@/types/modules/tabsModule';
import TabsImage from '@/components/TabsContent/TabsImage';

export default function TabsModule({ module }: { module: ITabsModule }) {
  const { getVertical } = useGetVertical();
  const { defaultBackgroundColor } = module.commonStyles || {};

  const [currentContent, setCurrentContent] = useState<ITabsModuleItemsContent>(module?.content?.items[0]);

  const items = useMemo(
    () =>
      module?.content?.items.map((item, index) => {
        return {
          value: index,
          label: item.tabLabel,
        };
      }),
    [module?.content?.items],
  );

  const [selected, setSelected] = useState<number>(0);

  const renderContent = useMemo(() => {
    switch (currentContent?.contentType) {
      case 'lineChart':
        return <LineChart lineData={currentContent.lineData} dataList={currentContent.dataList} />;
      case 'imageCard':
        return currentContent.imageUrl ? (
          <TabsImage image={currentContent.imageUrl} imageUrlMobile={currentContent.imageUrlMobile} />
        ) : null;
      default:
        return null;
    }
  }, [
    currentContent?.contentType,
    currentContent.dataList,
    currentContent.imageUrl,
    currentContent.imageUrlMobile,
    currentContent.lineData,
  ]);

  return (
    <section
      className={clsx(['section-container', styles.tabsModuleWrap])}
      style={{
        paddingTop: getVertical(module.commonStyles).top + 'px',
        paddingBottom: getVertical(module.commonStyles).bottom + 'px',
        backgroundColor: defaultBackgroundColor,
      }}>
      <section className={styles.container}>
        <div className={styles.tabsModuleRadioWrap}>
          <Radio.Group
            optionType="button"
            value={selected}
            onChange={(e) => {
              setCurrentContent(module?.content?.items[e.target.value]);
              setSelected(e.target.value);
            }}
            options={items}
          />
        </div>

        <div className={styles.contentWrap}>{renderContent}</div>
      </section>
    </section>
  );
}
