import { ModuleType } from '.';

export interface ITabsModuleItemsContentDataList {
  label: string;
  value: string;
  format?: 'number' | 'abbreviate';
  service?: string;
}

export interface ITabsModuleItemsContent {
  tabKey: string;
  tabLabel: string;
  contentType: 'lineChart' | 'imageCard';
  imageUrl?: string;
  imageUrlMobile?: string;
  lineData?: {
    dataX: string[];
    dataY: number[];
    chartId: string;
    lineColor?: string;
  };
  dataList?: ITabsModuleItemsContentDataList[];
}

export interface ITabsModule {
  index: number;
  key: ModuleType.TabsModule;
  content: {
    items: ITabsModuleItemsContent[];
  };
  commonStyles: {
    paddingTop?: string;
    paddingBottom?: string;
    mobilePaddingTop?: string;
    mobilePaddingBottom?: string;
    defaultBackgroundColor?: string;
  };
}