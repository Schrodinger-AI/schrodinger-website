export enum NavigationType {
  NOT_JUMP = 1, // do not jump
  ROUTE = 2, // routing Jump
  OPEN_NEW_TAB = 3, // open the URL in a new tab
  OPEN_NEW_TAB_DISCOVER = 4, // When accessing in Discover, open a new page within Discover
}

export enum DEVICE_TYPE {
  Android,
  IOS,
  WebChrome,
  WebNotChrome,
}

export enum NAV_TYPE {
  DEFAULT,
}

export enum ROUTER {
  DEFAULT = '/',
}
