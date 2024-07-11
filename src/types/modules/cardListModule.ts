import { ModuleType } from '.';
import { DescriptionComponent } from '../components/description';
import { ImageWrapper } from '../components/image';

export interface ICardListModule {
  key: ModuleType.CardListModule;
  index: number;
  title?: {
    text: string;
  };
  subTitle?: {
    text: string;
  };
  name?: string;
  dataArray?: Array<DescriptionComponent>;
  backgroundImage?: ImageWrapper;
  commonStyles: {
    paddingTop?: string;
    paddingBottom?: string;
    mobilePaddingTop?: string;
    mobilePaddingBottom?: string;
    defaultBackgroundColor?: string;
    defaultCardBackgroundColor?: string;
    defaultImgContainerBackgroundColor?: string;
  };
}
