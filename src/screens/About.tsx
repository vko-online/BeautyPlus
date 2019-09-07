import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Appbar, Headline } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={{ zIndex: 100 }} theme={{ colors: { primary: '#fff' } }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title='About' />
      </Appbar.Header>
      <Headline>About</Headline>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
