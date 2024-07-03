import Image from 'next/image';
import { useMemo } from 'react';
import { useWindowSize } from 'react-use';
import styles from './styles.module.scss';

export default function TabsImage({ image, imageUrlMobile }: { image: string; imageUrlMobile?: string }) {
  const { width } = useWindowSize();

  const isMobile = useMemo(() => width <= 991, [width]);

  return (
    <div className={styles.tabsImageWrap}>
      <Image
        src={isMobile ? imageUrlMobile || image : image}
        alt={''}
        width={1080}
        height={350}
        className={styles.image}
      />
    </div>
  );
}
