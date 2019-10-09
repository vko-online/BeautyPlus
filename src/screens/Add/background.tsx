import React, { ReactNode } from 'react'
import { StyleSheet, Platform, ImageBackground, StyleProp, ViewStyle, View } from 'react-native'
import Header from './header'
interface Props {
  onDismiss: () => void
  children: ReactNode
  style?: StyleProp<ViewStyle>
}
export default function ({ children, onDismiss, style }: Props) {
  return (
    <ImageBackground
      source={require('./Background.png')}
      style={[s.background, style]}
      resizeMode='stretch'
    >
      <Header onPress={onDismiss} style={{ backgroundColor: 'transparent', paddingTop: Platform.OS === 'ios' && 30 }} />
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
