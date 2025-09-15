'use client';
import NavFooter from '@/components/NavFooter';
import NavHeader from '@/components/NavHeader';
import { ROUTER } from '@/constants/enum';
import { useUserAgent } from '@/hooks/useUserAgent';
import BrandModule from '@/modules/BrandModule';
import { IHomePageProps } from '@/types/pages/home';
import GraphicTextModule from '@/modules/GraphicTextModule';
import { ModuleType } from '@/types/modules';
import { getGlobalConfig } from '@/api/utils';
import { useCallback, useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import CardListModule from '@/modules/CardListModule';
import PartnersModule from '@/modules/PartnersModule';
import FeatureCardModule from '@/modules/FeatureCardModule';
import InfiniteScrollCarouselModule from '@/modules/InfiniteScrollCarouselModule';
import { ButtonBelowTextModule } from '@/modules/ButtonBelowText';
import TabsModule from '@/modules/TabsModule';
import CollapseModule from '@/modules/CollapseModule';
import { notification, Button } from 'antd';

export default function HomeMain({ headerData, footerData, pageData }: IHomePageProps) {
  const uaType = useUserAgent();

  useEffect(() => {
    // if (localStorage.getItem('important-notice') === 'true') {
    //   return;
    // }
    const key = `open${Date.now()}`;
    const btn = (
      <div>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            notification.close(key);
            localStorage.setItem('important-notice', 'true');
          }}>
          Confirm
        </Button>
      </div>
    );
    notification.open({
      duration: 30000,
      message: 'IMPORTANT SERVICE UPDATE',
      description: (
        <div className="schrodinger-cat-service-ending">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h2>Schrödinger's Cat Service Ending</h2>
          <p>
            <strong>All services</strong> will terminate on <strong>October 27, 2025 (UTC 00:00)</strong>
          </p>

          <h3>📊 Token Burn Information:</h3>
          <ul>
            <li>
              <strong>20,321,700 SGR (96.77%)</strong> will be burned
            </li>
            <li>
              Burn execution: <strong>October 28, 2025</strong>
            </li>
            <li>Your existing tokens remain unaffected</li>
            <li>Trading continues on exchanges</li>
          </ul>

          <h3>🎮 Service Impact:</h3>
          <ul>
            <li>
              NFT minting/evolution: <strong>Disabled</strong>
            </li>
            <li>
              Lottery system: <strong>Closed</strong>
            </li>
            <li>
              Telegram bot: <strong>Offline</strong>
            </li>
            <li>
              Your NFTs: <strong>Remain safe on-chain</strong>
            </li>
          </ul>

          <h3>⏰ Timeline:</h3>
          <ul>
            <li>
              <strong>Oct 27:</strong> Services terminate
            </li>
            <li>
              <strong>Oct 28:</strong> SGR token burn
            </li>
            <li>
              <strong>Oct 29:</strong> Burn verification published
            </li>
          </ul>
        </div>
      ),
      btn,
      key,
      onClose: () => {
        localStorage.setItem('important-notice', 'true');
      },
    });
  }, []);

  const setGlobalConfig = useCallback(async () => {
    if (typeof document !== 'undefined') {
      const globalConfig = await getGlobalConfig();
      const colorObj = {
        ...globalConfig.themeColor,
        ...globalConfig.functionalColor,
        ...globalConfig.neutralColor,
      };
      Object.entries(colorObj).forEach((ele) => {
        document?.body.style.setProperty(`--${ele[0]}`, ele[1]);
      });
    }
  }, []);

  useEffectOnce(() => {
    setGlobalConfig();
  });

  useEffect(() => {
    if (pageData?.moduleList.length) {
      const hash = window.location.hash;
      const id = hash ? hash.split('#')[1] : '';
      if (id) {
        const timer = setTimeout(() => {
          const doc = document.getElementById(id);
          if (doc) {
            doc.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
          clearTimeout(timer);
        }, 500);
      }
    }
  }, [pageData?.moduleList.length]);

  return (
    <main className="home-page">
      <NavHeader path={ROUTER.DEFAULT} data={headerData} />
      <div className="empty-container" style={{ height: 80 }}></div>

      {Array.isArray(pageData?.moduleList) &&
        pageData?.moduleList?.map((module, index) => {
          if (module.key === ModuleType.BrandModule) {
            return (
              <BrandModule key={pageData.key + '_' + index + '_' + module.key} type={uaType} moduleData={module} />
            );
          }
          if (module.key === ModuleType.GraphicTextModule) {
            return <GraphicTextModule key={pageData.key + '_' + index + '_' + module.key} module={module} />;
          }
          if (module.key === ModuleType.CardListModule) {
            return <CardListModule key={pageData.key + '_' + index + '_' + module.key} moduleData={module} />;
          }
          if (module.key === ModuleType.PartnersModule) {
            return <PartnersModule key={pageData.key + '_' + index + '_' + module.key} module={module} />;
          }
          if (module.key === ModuleType.FeatureCardModule) {
            return <FeatureCardModule key={pageData.key + '_' + index + '_' + module.key} module={module} />;
          }
          if (module.key === ModuleType.InfiniteScrollCarouselModule) {
            return <InfiniteScrollCarouselModule key={pageData.key + '_' + index + '_' + module.key} module={module} />;
          }
          if (module.key === ModuleType.ButtonBelowTextModule) {
            return <ButtonBelowTextModule key={pageData.key + '_' + index + '_' + module.key} module={module} />;
          }
          if (module.key === ModuleType.TabsModule) {
            return <TabsModule key={pageData.key + '_' + index + '_' + module.key} module={module} />;
          }
          if (module.key === ModuleType.CollapseModule) {
            return <CollapseModule key={pageData.key + '_' + index + '_' + module.key} module={module} />;
          }
          return <></>;
        })}

      <NavFooter data={footerData} />
    </main>
  );
}
