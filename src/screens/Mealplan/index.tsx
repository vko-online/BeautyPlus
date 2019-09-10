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
      <Header title='Mealplans' />
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
          Create meal plans to your upcoming weeks
        </Caption>
      </Vpane>
      <Accordion title='Your meal plan for this week' visible>
        <Weeks />
      </Accordion>
      {/* <Accordion title='Perfectly mastered meal plans from experts'>
        <View style={{ padding: 20, flex: 1 }}>
          <Weeks />
        </View>
      </Accordion> */}
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
