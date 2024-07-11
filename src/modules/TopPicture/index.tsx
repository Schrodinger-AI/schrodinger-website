import CommonImage from '@/components/CommonImage';
import { s3Url } from '@/constants/network';
import clsx from 'clsx';
import { useMemo } from 'react';
import { IGraphicTextModule } from '@/types/modules/graphicTextModule';
import RowDescription from '@/components/RowDescription';
import { DescriptionComponent } from '@/types/components/description';

import useGetVertical from '@/hooks/useGetVertical';

import styles from './styles.module.scss';

export interface FeatureDescModuleProps {
  module: IGraphicTextModule;
}

export default function TopPicture({ module }: FeatureDescModuleProps) {
  const { getVertical } = useGetVertical();
  const { defaultBackgroundColor } = module.commonStyles || {};

  const renderTxt = useMemo(
    () =>
      module.descriptionList?.map((list) => (
        <div key={list.index}>
          {list.children?.map((item, idx) => (
            <RowDescription
              isLast={idx === (item.children as Array<DescriptionComponent>).length - 1}
              key={'TopPicture_Description' + '_' + idx}
              iconSrc={item.icon?.filename_disk ? s3Url + item.icon?.filename_disk : ''}
              gap={10}
              content={item.text || ''}
            />
          ))}
        </div>
      )),
    [module.descriptionList],
  );

  return (
    <section
      className={clsx(['section-container', styles.featureDescModuleWrap])}
      style={{
        paddingTop: getVertical(module.commonStyles).top + 'px',
        paddingBottom: getVertical(module.commonStyles).bottom + 'px',
        backgroundColor: defaultBackgroundColor,
      }}>
      <section className={styles.container}>
        <h1 className={styles.title}>{module.title?.text}</h1>
        <CommonImage
          quality={100}
          src={module.image?.filename_disk ? s3Url + module.image.filename_disk : ''}
          className={clsx(['flex-row-center', styles.image])}
          alt="homeMainImage"
          priority
          width={1080}
          height={500}
          layout="intrinsic" // TODO
        />
        <div className={styles.content}>{renderTxt}</div>
      </section>
    </section>
  );
}
