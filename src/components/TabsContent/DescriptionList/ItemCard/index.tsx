import CommonImage from '@/components/CommonImage';
import styles from './styles.module.scss';
import { s3Url } from '@/constants/network';

export default function ItemCard({
  data,
}: {
  data: {
    title?: string;
    content?: string;
    imgUrl?: string;
  };
}) {
  const { title, content, imgUrl } = data || {};
  return (
    <section className={styles.cardContainer}>
      <CommonImage className={styles.img} src={imgUrl ? s3Url + imgUrl : ''} width={48} height={48} alt="icon" />
      <div className={styles.textWrap}>
        <span className={styles.title}>{title}</span>
        <p className={styles.content}>{content}</p>
      </div>
    </section>
  );
}
