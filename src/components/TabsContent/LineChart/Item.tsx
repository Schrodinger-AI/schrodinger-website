import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { serveGet } from '@/api/axios';
import { ITabsModuleItemsContentDataList } from '@/types/modules/tabsModule';
import { formatNumber, formatTokenPrice } from '@/utils/format';

export default function Item({ value, label, service, format }: ITabsModuleItemsContentDataList) {
  const [valueInfo, setValueInfo] = useState<string>(value);

  const getValue = async (service: string) => {
    try {
      const res = await serveGet(service);
      let formatValue = res;
      switch (format) {
        case 'number':
          formatValue = formatTokenPrice(res, {
            decimalPlaces: 2,
          });
          break;
        case 'abbreviate':
          formatValue = formatNumber(res, {
            decimalPlaces: 2,
          });
          break;
        default:
          formatValue = res;
          break;
      }
      setValueInfo(formatValue);
    } catch (error) {
      console.log('=====serveApi error', error);
    }
  };

  useEffect(() => {
    if (service) {
      getValue(service);
    }
  }, [service]);

  return (
    <div className={styles.dataListCard}>
      <p className={styles.dataListValue}>{valueInfo}</p>
      <p className={styles.dataListLabel}>{label}</p>
    </div>
  );
}
