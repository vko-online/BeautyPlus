import React, { useState, createContext } from 'react'
import { Platform, YellowBox, StatusBar, I18nManager } from 'react-native'
import { Provider } from 'react-native-paper'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { theme } from 'src/constants/Colors'
import AppNavigator from 'src/navigation/AppNavigator'
import Page from 'src/components/Page'

I18nManager.forceRTL(true)
YellowBox.ignoreWarnings(['Require cycle'])
export const ThemeContext = createContext('light')
export default function App (props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    return (
      <Provider theme={theme}>
        <AppNavigator />
      </Provider>
    )
  }
}

async function loadResourcesAsync () {
  await Promise.all([
    Asset.loadAsync([
      require('src/assets/images/robot-dev.png'),
      require('src/assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      'montserrat-light': require('src/assets/fonts/Montserrat-Light.ttf'),
      'montserrat-thin': require('src/assets/fonts/Montserrat-Thin.ttf'),
      'montserrat-medium': require('src/assets/fonts/Montserrat-Medium.ttf'),
      'montserrat-regular': require('src/assets/fonts/Montserrat-Regular.ttf'),
      'levenim-regular': require('src/assets/fonts/lvnm.ttf'),
      'levenim-bold': require('src/assets/fonts/lvnmbd.ttf')
    })
  ])
}

function handleLoadingError (error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading (setLoadingComplete) {
  setLoadingComplete(true)
}
