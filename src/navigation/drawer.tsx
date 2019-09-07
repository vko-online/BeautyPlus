import React, { useContext, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import {
  DrawerItemsProps, NavigationScreenProp, DrawerNavigationState, withNavigation
} from 'react-navigation'
import { Avatar, Text, Drawer, Subheading, Caption, Switch, Dialog, Portal, Button, Paragraph, Badge } from 'react-native-paper'
import { Scene, Hpane, Vpane } from 'view-on-steroids'
import { extraLightGray } from 'src/constants/Colors'
import { ThemeContext } from '../../App'
// import { logout } from '../actions/auth'

interface Props extends DrawerItemsProps {
  navigation: NavigationScreenProp<DrawerNavigationState>
}
function User () {
  return (
    <Hpane padding={10} justifyContent='flex-start' alignItems='center'>
      <Avatar.Image source={require('src/assets/images/robot-dev.png')} />
      <Vpane marginLeft={10}>
        <Subheading>Medet Tleukabiluly</Subheading>
        <View style={s.premium}>
          <Image style={s.premiumIcon} source={require('src/assets/icons/dplus.png')} />
          <Text style={s.premiumText}>ACTIVATED</Text>
        </View>
      </Vpane>
    </Hpane>
  )
}
function DrawerComponent ({ navigation }: Props) {
  const [visible, setVisiblity] = useState(false)
  const themeName = useContext<string>(ThemeContext)
  return (
    <View style={s.container}>
      <User />
      <Drawer.Section title='Account'>
        <Drawer.Item label='Profile' icon='account-circle' />
        <Hpane alignItems='center' justifyContent='space-between' paddingRight={30}>
          <Drawer.Item label='Shopping cart' icon='shopping-cart' />
          <Badge style={{ alignSelf: 'center' }}>3</Badge>
        </Hpane>
        <Drawer.Item label='Favorites' icon='format-list-bulleted' />
      </Drawer.Section>
      <Drawer.Section title='Premium'>
        <Drawer.Item
          label='Upgrade plan'
          icon={() => (
            <Image
              style={s.premiumIcon}
              source={require('src/assets/icons/dplus.png')}
            />
          )}
          onPress={() => navigation.navigate('About')}
        />
        <Drawer.Item label='Benefits' icon='ondemand-video' onPress={() => navigation.navigate('About')} />
      </Drawer.Section>
      <Drawer.Section title='Preferences'>
        <Drawer.Item label='Settings' icon='settings' />
        <Hpane alignItems='center' justifyContent='space-between' paddingRight={30}>
          <Drawer.Item label='Dark' icon='lightbulb-outline' />
          <Switch value={themeName === 'dark'} />
        </Hpane>
      </Drawer.Section>
      <Drawer.Item label='Log out' icon='exit-to-app' onPress={() => setVisiblity(true)} />
      <Portal>
        <Dialog
          visible={visible}
          style={{ backgroundColor: '#fff' }}
          onDismiss={() => setVisiblity(false)}>
          <Dialog.Title>Exit</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to logout?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode='text' onPress={() => setVisiblity(false)}>Cancel</Button>
            <Button mode='text' onPress={() => console.log('logout')}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  premium: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#404040',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 2
  },
  premiumIcon: {
    width: 25,
    height: 25
  },
  premiumText: {
    fontFamily: 'montserrat-medium',
    marginHorizontal: 10,
    color: extraLightGray
  }
})

export default withNavigation(DrawerComponent)
