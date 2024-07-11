import Image from 'next/image';
import styles from './styles.module.scss';
import { iconArrowRightBlue } from '@/assets/images';
import { ITabsModuleItemsContent } from '@/types/modules/tabsModule';
import { openWithBlank } from '@/utils/router';

export default function PurchaseCardWrap({
  title,
  imageUrl,
  description,
  button,
}: {
  title?: string;
  imageUrl?: string;
  description?: string;
  button?: ITabsModuleItemsContent['button'];
}) {
  return (
    <div className={styles.purchaseCardWrap}>
      {imageUrl ? (
        <div className={styles.purchaseCardImage}>
          <Image src={imageUrl} alt={''} width={1080} height={350} className={styles.image} />
        </div>
      ) : null}
      <div className={styles.purchaseCardInfo}>
        {title ? <p className={styles.purchaseCardInfoTitle}>{title}</p> : null}
        {description ? <p className={styles.purchaseCardInfoDescription}>{description}</p> : null}
        {button?.text ? (
          <p className={styles.purchaseCardInfoButton}>
            <span onClick={() => button.link && openWithBlank(button.link)}>
              {button.text}
              <Image src={iconArrowRightBlue} alt={''} width={20} height={20} className={styles.icon} />
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
