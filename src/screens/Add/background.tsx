import React, { ReactNode } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import Header from './header'
interface Props {
  onDismiss: () => void
  children: ReactNode
}
export default function ({ children, onDismiss }: Props) {
  return (
    <ImageBackground
        source={require('./Background.png')}
        style={s.background}
        resizeMode='stretch'
      >
        <Header onPress={onDismiss} style={{ backgroundColor: 'transparent' }} />
        {children}
    </ImageBackground>
  )
}

const s = StyleSheet.create({
  background: {
    flex: 1
  }
})
