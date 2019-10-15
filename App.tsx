import React, { useState } from 'react'
import { YellowBox, StatusBar, I18nManager } from 'react-native'
import { Provider } from 'react-native-paper'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { theme, graydark } from 'src/constants/Colors'
import AppNavigator from 'src/navigation/AppNavigator'

I18nManager.allowRTL(true)
I18nManager.forceRTL(true)
YellowBox.ignoreWarnings(['Require cycle'])
export default function App () {
  I18nManager.forceRTL(true)
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    I18nManager.forceRTL(true)
    return (
      <Provider theme={theme}>
        <StatusBar barStyle='light-content' backgroundColor={graydark} />
        <AppNavigator />
      </Provider>
    )
  }
}

async function loadResourcesAsync () {
  await Promise.all([
    Asset.loadAsync([
      require('src/components/Background.png')
    ]),
    Font.loadAsync({
      'MaterialCommunityIcons': require('src/assets/fonts/MaterialCommunityIcons.ttf'),
      'levenim-regular': require('src/assets/fonts/lvnm.ttf'),
      'levenim-bold': require('src/assets/fonts/lvnmbd.ttf')
    })
  ])
}

function handleLoadingError (error) {
  console.warn(error)
}

function handleFinishLoading (setLoadingComplete) {
  setLoadingComplete(true)
  I18nManager.forceRTL(true)
}
