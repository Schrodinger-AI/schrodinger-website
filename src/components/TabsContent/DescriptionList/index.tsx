import { ITabsModuleItemsContent } from '@/types/modules/tabsModule';
import ItemCard from './ItemCard';
import styles from './styles.module.scss';

export default function DescriptionList({ data }: { data: ITabsModuleItemsContent['dataList'] }) {
  return (
    <section className={styles.cardList}>
      {data?.map((item, index) => (
        <ItemCard data={item} key={index} />
      ))}
    </section>
  );
}
