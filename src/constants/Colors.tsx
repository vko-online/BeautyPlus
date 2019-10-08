import { DefaultTheme, Theme } from 'react-native-paper'

export const tintColor = '#2f95dc'
export const activeIcon = '#1DA1F2'
export const primary = '#1DA1F2'
export const primaryDark = '#333333'
export const black = '#14171A'
export const darkGray = '#657786'
export const lightGray = '#AAB8C2'
export const extraLightGray = '#E1E8ED'
export const extraExtraLightGray = '#F5F8FA'
export const white = '#FFFFFF'
export const lightRed = '#fc6b03'

export const tabIconDefault = '#ccc'
export const tabIconSelected = tintColor
export const tabBar = '#fefefe'
export const errorBackground = 'red'
export const errorText = '#fff'
export const warningBackground = '#EAEB5E'
export const warningText = '#666804'
export const noticeBackground = tintColor
export const noticeText = '#fff'

export const blue = '#0000FF'
export const bluedark = '#00008B'
export const brown = '#A52A2A'
export const browndark = '#800000'
export const gray = '#808080'
export const graydark = '#696969'
export const green = '#008000'
export const greendark = '#006400'
export const orange = '#FFA500'
export const orangedark = '#FF8C00'
export const pink = '#FFC0CB'
export const pinkdark = '#FF69B4'
export const red = '#FF0000'
export const reddark = '#8B0000'

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 1,
  dark: false,
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

export const themeDark: Theme = {
  ...theme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryDark,
    background: black,
    text: black,
    accent: darkGray,
    backdrop: lightGray,
    disabled: extraLightGray,
    error: 'red',
    placeholder: lightGray,
    surface: extraExtraLightGray
  }
}
