/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors: {[key: string]: ColorVariants} = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primaryBg: '#f2f2f2',
    secondaryBg: '#fff',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primaryBg: '#1D1D1D',
    secondaryBg: '#2B2B2B',
  },
};

export type ColorVariants = {
    text: string,
    background: string,
    tint: string,
    icon: string,
    tabIconDefault: string,
    tabIconSelected: string,
    primaryBg: string,
    secondaryBg: string,
}
