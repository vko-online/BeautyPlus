import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {
  IconButton,
  Text
} from 'react-native-paper'
import Pane, { Vpane } from 'view-on-steroids'
import moment from 'moment'
import 'moment/locale/he'

interface Props {
  date: Date
  name: string
}
export default function ({ date = new Date(), name = 'החפשמ םש' }: Props) {
  return (
    <Vpane alignItems='center' justifyContent='flex-start'>
      <Pane backgroundColor='#acacac' justifyContent='center' alignItems='center'>
        <Text>{moment(date).calendar('L')}</Text>
      </Pane>
      <IconButton icon='account-circle' size={40} />
      <Text>{name}</Text>
    </Vpane>
  )
}
