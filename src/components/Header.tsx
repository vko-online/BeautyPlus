import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Appbar, Avatar } from 'react-native-paper'
import { NavigationScreenProp, withNavigation } from 'react-navigation'

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  onPress?: () => void
  navigation: NavigationScreenProp<any, any>
}
function Header ({ navigation, title = 'Diet Doctor', subtitle, icon = 'filter', onPress }: Props) {
  return (
    <Appbar.Header style={{ zIndex: 100 }} theme={{ colors: { primary: '#fff' } }}>
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.openDrawer}>
        <Avatar.Image size={40} source={require('src/assets/images/robot-dev.png')} />
      </TouchableOpacity>
      <Appbar.Content title={title} subtitle={subtitle} />
      <Appbar.Action icon={icon} onPress={onPress} />
    </Appbar.Header>
  )
}

export default withNavigation(Header)
