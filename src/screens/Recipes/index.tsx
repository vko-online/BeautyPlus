import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from 'src/components/Header'
import Recipe from './Recipe'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Header />
      <FlatList
        data={[]}
        keyExtractor={(item, index) => `${index}`}
        renderItem={item => <Recipe recipe={item} />}
      />
    </View>
  )
}
Screen.navigationOptions = {
  header: null
}
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
