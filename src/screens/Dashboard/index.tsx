import React, { useState } from 'react'
import { Headline, Menu, IconButton, Divider } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from './header'
import Page from 'src/components/Page'
import AddClient from 'src/screens/Add/Client'
import AddService from 'src/screens/Add/Service'
import AddOrder from 'src/screens/Add/Order'
import { iconTheme } from 'src/constants/Colors'
import Agenda from './agenda'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({}: Props) {
  const [visible, setVisibility] = useState(false)
  const [clientVisible, setClientVisible] = useState(false)
  const [orderVisible, setOrderVisible] = useState(false)
  const [serviceVisible, setServiceVisible] = useState(false)

  return (
    <Page>
      <Header>
        <Menu
          visible={visible}
          onDismiss={() => setVisibility(false)}
          anchor={
            <IconButton icon='more-vert' theme={iconTheme} onPress={() => setVisibility(true)} />
          }
        >
          <Menu.Item
            onPress={() => {
              setClientVisible(true)
              setVisibility(false)
            }}
            title='שדח חוקל תפסוה'
            key='add client'
          />
          <Menu.Item
            onPress={() => {
              setServiceVisible(true)
              setVisibility(false)
            }}
            title='שדח לופיט תפסוה'
            key='add service'
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setOrderVisible(true)
              setVisibility(false)
            }}
            title='add order'
            key='add order'
          />
        </Menu>
      </Header>
      <Headline>Dashboard</Headline>
      <AddClient visible={clientVisible} onDismiss={() => setClientVisible(false)} />
      <AddService visible={serviceVisible} onDismiss={() => setServiceVisible(false)} />
      <AddOrder visible={orderVisible} onDismiss={() => setOrderVisible(false)} />
      <Page>
        <Agenda />
      </Page>
    </Page>
  )
}

Screen.navigationOptions = {
  header: null
}
