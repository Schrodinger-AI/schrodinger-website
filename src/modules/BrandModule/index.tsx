import clsx from 'clsx';
import CommonImage from '@/components/CommonImage';
import { DEVICE_TYPE } from '@/constants/enum';
import RowDescription from '@/components/RowDescription';
import styles from './styles.module.scss';
import DownloadButtonGroup from '@/components/DownloadButtonGroup';
import { ButtonKey } from '@/types/components/button';
import { BrandModuleType, IBrandModule } from '@/types/modules/brandModule';
import { s3Url } from '@/constants/network';
import { openExternalLink } from '@/utils/router';
import CommonButton from '@/components/CommonButton';
import useGetVertical from '@/hooks/useGetVertical';
import { useCallback, useEffect, useState } from 'react';
import { serveGet } from '@/api/axios';
import { formatTokenPrice } from '@/utils/format';

export interface BrandModuleProps {
  type: DEVICE_TYPE;
  moduleData: IBrandModule;
}

export default function BrandModule({ type, moduleData }: BrandModuleProps) {
  const { getVertical } = useGetVertical();
  const [dataListValue, setDataListValue] = useState<Record<string, number>>();

  const getDataListValue = useCallback(
    async (service: string) => {
      try {
        const res = await serveGet(service, moduleData.dataList?.params);
        setDataListValue(res);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    [moduleData.dataList?.params],
  );

  useEffect(() => {
    if (moduleData.dataList?.service) {
      getDataListValue(moduleData.dataList?.service);
    }
  }, [getDataListValue, moduleData.dataList?.service]);

  return (
    <section
      className={clsx([
        'section-container',
        styles.brandModuleWrap,
        moduleData.type === BrandModuleType.White ? styles.whiteType : styles.brandType,
      ])}
      style={{
        backgroundColor: moduleData.commonStyles?.defaultBackgroundColor,
        backgroundImage: `url(${
          moduleData?.backgroundImage?.filename_disk ? s3Url + moduleData?.backgroundImage?.filename_disk : ''
        })`,
        paddingTop: getVertical(moduleData.commonStyles).top + 'px',
        paddingBottom: getVertical(moduleData.commonStyles).bottom + 'px',
      }}>
      <section className={clsx([styles.brandModuleContainer, styles.brandModule])}>
        <section className={styles.brandModuleLeft}>
          {/* section 1: title */}
          <div className={styles.title} style={{ letterSpacing: type === DEVICE_TYPE.IOS ? -1 : 'normal' }}>
            {moduleData.title.text}
          </div>

          {/* section 2: description */}
          <div className="flex-column-start">
            {Array.isArray(moduleData?.descriptionList) &&
              moduleData.descriptionList.map((item, idx) => {
                return (
                  <RowDescription
                    isLast={idx === moduleData.descriptionList.length - 1}
                    key={'BrandModule_Description' + '_' + idx}
                    className={styles.desc}
                    iconSrc={item.icon?.filename_disk ? s3Url + item.icon?.filename_disk : ''}
                    gap={10}
                    content={item.text || ''}
                  />
                );
              })}
          </div>

          {/* section 3: button list */}
          {Array.isArray(moduleData?.buttonList) && moduleData.buttonList.length > 0 && (
            <div className={styles.buttonGroup}>
              {moduleData.buttonList.map((btn, index) => {
                return btn.key === ButtonKey.DownloadApp ? (
                  <DownloadButtonGroup
                    key={'BrandModule' + '_' + index + '_' + btn.key}
                    type={type}
                    chromeStoreUrl={btn?.extensionUrl}
                    iosStoreUrl={btn?.iOSUrl}
                    androidStoreUrl={btn?.androidUrl}
                    otherDownloadUrl={btn?.otherUrl}
                    goDownloadPageUrl={btn?.otherUrl}
                    downloadPageBtnClassName={styles.downloadPageBtn}
                  />
                ) : (
                  <CommonButton
                    key={'BrandModule' + '_' + index + '_' + btn.key}
                    className={styles.brandButton}
                    text={btn?.text || ''}
                    fontColor={btn.commonStyles.default?.fontColor}
                    backgroundColor={btn.commonStyles.default?.backgroundColor}
                    borderColor={btn.commonStyles.default?.borderColor}
                    width={btn.commonStyles.width ? btn.commonStyles.width + 'px' : 'auto'}
                    onClick={() => openExternalLink(btn.link?.url, btn.link?.target)}
                  />
                );
              })}
            </div>
          )}

          {moduleData.dataList?.keyList.length ? (
            <div className={styles['brand-module-data-list']}>
              {moduleData.dataList.keyList.map((item) => {
                return (
                  <div className={styles['brand-module-data-list-card']} key={item.apiKey}>
                    <p className={styles['brand-module-data-list-card-value']}>
                      {dataListValue?.[item.apiKey]
                        ? formatTokenPrice(dataListValue?.[item.apiKey], {
                            decimalPlaces: 2,
                          })
                        : '--'}
                    </p>
                    <p className={styles['brand-module-data-list-card-title']}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>

        {/* section 4: hero image */}
        <div className={styles.mainImage}>
          <CommonImage
            quality={100}
            src={moduleData.image.filename_disk ? s3Url + moduleData.image.filename_disk : ''}
            width={640}
            height={640}
            className={clsx(['flex-row-center', styles.mainImage])}
            alt="homeMainImage"
            layout="intrinsic" // TODO
            priority
          />
        </div>
      </section>
    </section>
  );
}
