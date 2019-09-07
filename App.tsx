import React, { useState, useContext, createContext } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider, Theme, DefaultTheme } from 'react-native-paper'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { theme, themeDark } from 'src/constants/Colors'
import AppNavigator from 'src/navigation/AppNavigator'

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
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
        {/* <ThemeContext.Provider value='dark'> */}
          <Provider theme={theme}>
            <AppNavigator />
          </Provider>
        {/* </ThemeContext.Provider> */}
      </View>
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
      // This is the font that we are using for our tab bar
      // ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'montserrat-light': require('src/assets/fonts/Montserrat-Light.ttf'),
      'montserrat-thin': require('src/assets/fonts/Montserrat-Thin.ttf'),
      'montserrat-medium': require('src/assets/fonts/Montserrat-Medium.ttf'),
      'montserrat-regular': require('src/assets/fonts/Montserrat-Regular.ttf')
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
