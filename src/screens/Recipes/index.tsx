import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Appbar, Text } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from 'src/components/Header'
import Info, { data } from 'src/components/Info'
import Recipe from './Recipe'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Header />
      <FlatList
        data={[1]}
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
