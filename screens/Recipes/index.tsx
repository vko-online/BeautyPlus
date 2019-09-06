import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Appbar.Header theme={{ colors: { primary: '#fff' } }}>
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Avatar.Image size={40} source={require('assets/images/robot-dev.png')} />
        </TouchableOpacity>
        <Appbar.Content title='Recipes' />
        <Appbar.Action icon='settings' />
      </Appbar.Header>
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
