import clsx from 'clsx';
import useGetVertical from '@/hooks/useGetVertical';

import styles from './styles.module.scss';
import { s3Url } from '@/constants/network';
import { ICollapseModule, SortingMethods } from '@/types/modules/collapseModule';
import { Collapse } from 'antd';
import { iconArrowDown } from '@/assets/images';
import Image from 'next/image';

export default function CollapseModule({ module }: { module: ICollapseModule }) {
  const { getVertical } = useGetVertical();
  const { defaultBackgroundColor } = module.commonStyles || {};

  const renderSortingMethods = ({ sortingMethods, index }: { sortingMethods: SortingMethods; index?: number }) => {
    switch (sortingMethods) {
      case SortingMethods.unordered:
        return <span className={styles['collapseItemContentItemSort']}>•</span>;

      case SortingMethods.ordered:
        return <span className={styles['collapseItemContentItemSort']}>{index}. </span>;
      default:
        return null;
    }
  };

  const renderCollapseItemContent = ({
    content,
    sortingMethods,
  }: {
    content: string[];
    sortingMethods: SortingMethods;
  }) => {
    if (content && content?.length) {
      return (
        <span className={styles['collapseItemContent']}>
          {content?.map((item, index) => {
            return (
              <span key={index} className={styles['collapseItemContentItem']}>
                {renderSortingMethods({
                  sortingMethods,
                  index: index + 1,
                })}
                <span
                  dangerouslySetInnerHTML={{
                    __html: item,
                  }}
                />
              </span>
            );
          })}
        </span>
      );
    }
    return null;
  };

  const expandIcon = (isActive?: boolean) => {
    return (
      <Image
        src={iconArrowDown}
        className={styles.collapseItemIcon}
        style={{
          transform: isActive ? 'rotate(180deg) translateY(50%)' : 'translateY(-50%)',
        }}
        alt={''}
      />
    );
  };

  return (
    <section
      className={clsx(['section-container', styles.collapseModuleWrap])}
      style={{
        paddingTop: getVertical(module.commonStyles).top + 'px',
        paddingBottom: getVertical(module.commonStyles).bottom + 'px',
        backgroundColor: defaultBackgroundColor,
        backgroundImage: `url(${
          module?.backgroundImage?.filename_disk ? s3Url + module.backgroundImage.filename_disk : ''
        })`,
      }}>
      <section className={styles.container}>
        {module.title ? <h1 className={styles.title}>{module.title}</h1> : null}
        {module.list.length ? (
          <div className={styles.contentWrap}>
            <Collapse ghost expandIconPosition="end" expandIcon={(panelProps) => expandIcon(panelProps.isActive)}>
              {module.list.map((item, index) => {
                return (
                  <Collapse.Panel header={item.label} key={index}>
                    {item.subTitle
                      ? renderCollapseItemContent({
                          content: item.subTitle || [],
                          sortingMethods: SortingMethods.none,
                        })
                      : null}
                    {renderCollapseItemContent({
                      content: item.content || [],
                      sortingMethods: item.sortingMethods || SortingMethods.none,
                    })}
                    {item.bottomDescription
                      ? renderCollapseItemContent({
                          content: item.bottomDescription || [],
                          sortingMethods: SortingMethods.none,
                        })
                      : null}
                  </Collapse.Panel>
                );
              })}
            </Collapse>
          </div>
        ) : null}
      </section>
    </section>
  );
}
