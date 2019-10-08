import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

interface Props {
  children?: ReactNode
}
export default function ({ children }: Props) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
