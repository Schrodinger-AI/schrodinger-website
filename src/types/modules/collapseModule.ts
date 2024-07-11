import { ModuleType } from '.';
import { ImageWrapper } from '../components/image';

export enum SortingMethods {
  'unordered' = 'unordered',
  'ordered' = 'ordered',
  'none' = 'none',
}

export interface ICollapseModuleItem {
  label: string;
  content?: string[];
  subTitle?: string[];
  bottomDescription?: string[];
  sortingMethods?: SortingMethods;
}

export interface ICollapseModule {
  index: number;
  key: ModuleType.CollapseModule;
  title?: string;
  backgroundImage?: ImageWrapper;
  list: ICollapseModuleItem[];
  commonStyles: {
    paddingTop?: string;
    paddingBottom?: string;
    mobilePaddingTop?: string;
    mobilePaddingBottom?: string;
    defaultBackgroundColor?: string;
  };
}
