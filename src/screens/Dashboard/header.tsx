import React, { useState, ReactNode } from 'react'
import { IconButton, Text, Menu, Divider } from 'react-native-paper'
import { withNavigation, NavigationScreenProp } from 'react-navigation'
import { white, graydark, iconTheme } from 'src/constants/Colors'
import TopBar from 'src/components/TopBar'
import { Platform } from 'react-native'

interface Props {
  text?: string
  children: ReactNode
}
function Header ({ children, text = 'September 1-7' }: Props) {
  return (
    <TopBar style={{ paddingTop: Platform.OS === 'ios' && 30 }}>
      <IconButton icon='chevron-right' theme={iconTheme} />
      <Text style={{ color: white }}>{text}</Text>
      <IconButton icon='chevron-left' theme={iconTheme} />
      <IconButton icon='today' theme={iconTheme} />
      <IconButton icon='add' theme={iconTheme} />
      {children}
    </TopBar>
  )
}

export default withNavigation(Header)
