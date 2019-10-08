import React from 'react'
import { Headline } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from './header'
import Page from 'src/components/Page'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({}: Props) {
  return (
    <Page>
      <Header />
      <Headline>Dashboard</Headline>
    </Page>
  )
}

Screen.navigationOptions = {
  header: null
}
