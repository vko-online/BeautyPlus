import React from 'react'
import { Headline } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Page from 'src/components/Page'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({}: Props) {
  return (
    <Page>
      <Headline>Screen</Headline>
    </Page>
  )
}
