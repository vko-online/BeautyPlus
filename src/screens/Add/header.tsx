import React from 'react'
import { IconButton } from 'react-native-paper'
import { iconTheme } from 'src/constants/Colors'
import TopBar from 'src/components/TopBar'
import { ViewStyle, StyleProp, Platform } from 'react-native'

interface Props {
  style?: StyleProp<ViewStyle>
  onPress: () => void
}
export default function ({ onPress, style }: Props) {
  return (
    <TopBar style={style}>
      <IconButton icon='close' theme={iconTheme} onPress={onPress} />
    </TopBar>
  )
}
