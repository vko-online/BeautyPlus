import { DefaultTheme, Theme } from 'react-native-paper'

export const tintColor = '#2f95dc'
export const activeIcon = '#1DA1F2'
export const primary = '#1DA1F2'
export const black = '#14171A'
export const darkGray = '#657786'
export const lightGray = '#AAB8C2'
export const extraLightGray = '#E1E8ED'
export const extraExtraLightGray = '#F5F8FA'
export const white = '#FFFFFF'

export default {
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff'
}

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 1,
  colors: {
    ...DefaultTheme.colors,
    primary: primary,
    background: white,
    text: black,
    accent: darkGray,
    backdrop: lightGray,
    disabled: extraLightGray,
    error: 'red',
    placeholder: lightGray,
    surface: extraExtraLightGray
  },
  fonts: {
    light: 'montserrat-light',
    medium: 'montserrat-medium',
    regular: 'montserrat-regular',
    thin: 'montserrat-thin'
  }
}
