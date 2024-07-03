import { useState } from 'react';
import styles from './styles.module.scss';

export default function Item({ value, label, service }: { value: string; label: string; service?: string }) {
  const [valueInfo, setValueInfo] = useState<string>(value);

  return (
    <div className={styles.dataListCard}>
      <p className={styles.dataListValue}>{valueInfo}</p>
      <p className={styles.dataListLabel}>{label}</p>
    </div>
  );
}
