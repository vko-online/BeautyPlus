import React, { ReactNode } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

interface Props extends ViewStyle {
  children?: ReactNode
}
export default function ({ children, ...style }: Props) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff'
  }
})
