import { ModuleType } from '.';
import { ImageWrapper } from '../components/image';

export interface ITabsModuleItemsContentDataList {
  label: string;
  value: string;
  format?: 'number' | 'abbreviate';
  service?: string;
  title?: string;
  content?: string;
  imgUrl?: string;
}

export interface ITabsModuleItemsContent {
  tabKey: string;
  tabLabel: string;
  contentType: 'lineChart' | 'imageCard' | 'purchaseCard' | 'descriptionList';
  imageUrl?: string;
  imageUrlMobile?: string;
  description?: string;
  title?: string;
  button?: {
    text: string;
    link?: string;
  };
  lineData?: {
    dataX: string[];
    dataY: number[];
    chartId: string;
    lineColor?: string;
    grid?: {
      top?: string | number;
      right?: string | number;
      left?: string | number;
      bottom?: string | number;
    };
    yAxisLabelFormatter?: string;
  };
  dataList?: ITabsModuleItemsContentDataList[];
}

export interface ITabsModule {
  index: number;
  key: ModuleType.TabsModule;
  content: {
    items: ITabsModuleItemsContent[];
  };
  backgroundImage?: ImageWrapper;
  commonStyles: {
    paddingTop?: string;
    paddingBottom?: string;
    mobilePaddingTop?: string;
    mobilePaddingBottom?: string;
    defaultBackgroundColor?: string;
  };
}
