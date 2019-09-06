import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Headline } from 'react-native-paper'

export default function Screen () {
  return (
    <ScrollView style={styles.container}>
      <Headline>About</Headline>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
})
