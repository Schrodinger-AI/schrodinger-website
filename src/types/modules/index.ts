import { IBrandModule } from './brandModule';
import { ICardListModule } from './cardListModule';
import { IGraphicTextModule } from './graphicTextModule';
import { IPartnersModule } from './partnersModule';
import { IButtonBelowTextModule } from './buttonBelowTextModule';
import { IFeatureCardModule } from './featureCardModule';
import { IInfiniteScrollCarouselModule } from './infiniteScrollCarouselModule';
import { ITabsModule } from './tabsModule';

export type Module =
  | IBrandModule
  | IGraphicTextModule
  | ICardListModule
  | IPartnersModule
  | IButtonBelowTextModule
  | IFeatureCardModule
  | IInfiniteScrollCarouselModule
  | ITabsModule;

export enum ModuleType {
  BrandModule = 'BrandModule',
  GraphicTextModule = 'GraphicTextModule',
  CardListModule = 'CardListModule',
  PartnersModule = 'PartnersModule',
  ButtonBelowTextModule = 'ButtonBelowTextModule',
  FeatureCardModule = 'FeatureCardModule',
  InfiniteScrollCarouselModule = 'InfiniteScrollCarouselModule',
  TabsModule = 'TabsModule',
}
