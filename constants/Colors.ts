/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#0a7ea4';

export const Colors: { [key in Themes]: ColorVariants } & {
  misc: { [key: string]: string };
} = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    boxBg: '#ddd',
    primaryBg: '#aaa',
    secondaryBg: '#BABABA',
    dangerBg: '#E14A3E',
    successBg: '#00AE40',
    warningBg: '#FFD60A',
    itemBg: '#f2f2f2',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    boxBg: '#333',
    primaryBg: '#777777',
    secondaryBg: '#404040',
    dangerBg: '#D13A2E',
    successBg: '#00AE40',
    warningBg: '#FFD60A',
    itemBg: '#2B2B2B',
  },
  misc: {
    gray: '#777',
    link: '#0a7ea4',
    todoPill: '#D13A2E',
    todoPillText: '#DF766D',
    activePill: '#00A6E0',
    activePillText: '#40CDFF',
    completedPill: '#00AE40',
    completedPillText: '#00CC4B',
  },
};

export type Themes = 'light' | 'dark';

export type ColorVariants = {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  boxBg: string;
  primaryBg: string;
  secondaryBg: string;
  dangerBg: string;
  successBg: string;
  warningBg: string;
  itemBg: string;
};
