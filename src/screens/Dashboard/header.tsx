import React, { useState, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { IconButton, Text, Menu, Divider } from 'react-native-paper'
import { withNavigation, NavigationScreenProp } from 'react-navigation'
import { white, graydark, iconTheme } from 'src/constants/Colors'
import TopBar from 'src/components/TopBar'
import { Hpane } from 'view-on-steroids'

interface Props {
  text?: string
  children: ReactNode
  onLeft?: () => void
  onRight?: () => void
  onToday?: () => void
  todayIcon?: string
}
function Header ({
  children,
  text = 'September 1-7',
  onLeft,
  onRight,
  onToday,
  todayIcon = 'today'
 }: Props) {
  return (
    <TopBar style={{ paddingTop: 30 }}>
      <Hpane alignItems='center' flex={1} justifyContent='flex-start'>
        <IconButton icon='chevron-right' theme={iconTheme} onPress={onRight} />
        <View style={s.view}>
          <Text style={s.text}>{text}</Text>
        </View>
        <IconButton icon='chevron-left' theme={iconTheme} onPress={onLeft} />
      </Hpane>
      <Hpane alignItems='center'>
        <IconButton icon={todayIcon} theme={iconTheme} onPress={onToday} />
        <IconButton icon='add' theme={iconTheme} />
        {children}
      </Hpane>
    </TopBar>
  )
}

const s = StyleSheet.create({
  view: {
    paddingTop: 2,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: white,
    fontSize: 16
  }
})

export default withNavigation(Header)
