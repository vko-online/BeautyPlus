import React, { ReactNode } from 'react'
import { StyleSheet, Platform, ImageBackground, StyleProp, ViewStyle, View } from 'react-native'
import Header from '../screens/Add/header'
interface Props {
  onDismiss?: () => void
  children: ReactNode
  style?: StyleProp<ViewStyle>
  showHeader?: boolean
}
export default function ({ children, onDismiss, style, showHeader = true }: Props) {
  return (
    <ImageBackground
      source={require('./Background.png')}
      style={[s.background, style]}
      resizeMode='stretch'
    >
      {
        showHeader && (
          <Header onPress={onDismiss} style={{ backgroundColor: 'transparent' }} />
        )
      }
      {children}
    </ImageBackground>
  )
}

const s = StyleSheet.create({
  background: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'stretch'
  }
})
