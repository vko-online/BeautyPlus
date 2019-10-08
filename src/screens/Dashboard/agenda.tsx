import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {
  IconButton,
  Text
} from 'react-native-paper'
import Page from 'src/components/Page'
import Client from './client'
import { Hpane } from 'view-on-steroids'

interface Props {
}
export default function ({}: Props) {
  return (
    <Page>
      <Hpane>
        <Client name='החפשמ םש' date={new Date()} />
        <Client name='החפשמ םש' date={new Date()} />
      </Hpane>
    </Page>
  )
}
