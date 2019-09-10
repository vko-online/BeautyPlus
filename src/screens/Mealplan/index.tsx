import React, { useState, useCallback, useRef } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Avatar, Title, Button, Caption } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import { Hpane, Vpane } from 'view-on-steroids'
import BottomSheet from 'react-native-raw-bottom-sheet'
import Sheet from 'src/components/Sheet'
import Header from 'src/components/Header'
import { darkGray } from 'src/constants/Colors'
import Accordion from 'src/components/Accordion'
import Weeks from './weeks'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Header />
      <Vpane padding={20} alignItems='stretch'>
        <Hpane justifyContent='space-between' alignItems='center'>
          <Title>Create new meal plan</Title>
          <Button
            uppercase={false}
            mode='outlined'
            theme={{ colors: { primary: darkGray } }}
            onPress={() => null}
          >
            Create now
          </Button>
        </Hpane>
        <Caption>
          Create meal plans to your upcoming weeks, or selecte from mastered meal plans from exterts
        </Caption>
      </Vpane>
      <Accordion title='Your meal plan for this week' visible>
        <View style={{ padding: 20 }}>
          <Weeks />
        </View>
      </Accordion>
      <Accordion title='Perfectly mastered meal plans from experts'>
        <View style={{ padding: 20 }}>
          <Weeks />
        </View>
      </Accordion>
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
