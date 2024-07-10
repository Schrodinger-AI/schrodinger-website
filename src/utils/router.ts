import { NavigationType, ROUTER } from '@/constants/enum';
import router from 'next/router';

export function jumpOrScrollToTop(path: ROUTER, callback?: () => void): void {
  if (path === router.pathname) {
    window.scrollTo(0, 0);
    callback?.();
  } else {
    window.open(path, '_self');
  }
}

export function openWithBlank(url: string, target = '_blank'): void {
  const newWindow = window.open(url, target);
  if (newWindow) {
    newWindow.opener = null;
  }
}

export function openOriginWithBlank(pathname: string): void {
  openWithBlank(window.location.origin + pathname);
}

export function switchPage(type: NavigationType, path?: string | ROUTER, callback?: () => void): void {
  if (!type || !path) return;
  switch (type) {
    case NavigationType.ROUTE:
      jumpOrScrollToTop(path as ROUTER, callback);
      break;
    case NavigationType.OPEN_NEW_TAB:
      openWithBlank(path);
      callback?.();
      break;
    case NavigationType.OPEN_NEW_TAB_DISCOVER:
      console.log('=====openExternalLink OPEN_NEW_TAB_DISCOVER');
      openExternalLink(path);
      callback?.();
      break;
    default:
      break;
  }
}

export function isPortkeyApp() {
  const ua = navigator.userAgent;
  return ua.indexOf('Portkey did Mobile') !== -1;
}

export const openExternalLink: Window['open'] = (url, target = '_blank') => {
  console.log('=====openExternalLink', url);
  if (!url) return null;
  if (isPortkeyApp()) {
    if (typeof url !== 'string') url = url.toString();
    window.location.href = url;
    return null;
  } else {
    return window.open(url, target);
  }
};
