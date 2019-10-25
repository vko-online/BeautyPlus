import React, { useState } from 'react'
import { YellowBox, StatusBar, I18nManager } from 'react-native'
import { Provider } from 'react-native-paper'
import { theme, graydark } from 'src/constants/Colors'
import AppNavigator from 'src/navigation/AppNavigator'

I18nManager.allowRTL(true)
I18nManager.forceRTL(true)
YellowBox.ignoreWarnings(['Require cycle'])
export default function App () {
  return (
    <Provider theme={theme}>
      <StatusBar barStyle='light-content' backgroundColor={graydark} />
      <AppNavigator />
    </Provider>
  )
}
