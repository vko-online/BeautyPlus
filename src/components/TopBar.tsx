import React, { ReactNode } from 'react'
import { Hpane } from 'view-on-steroids'
import { graydark } from 'src/constants/Colors'
import { ViewStyle, Platform, StyleProp } from 'react-native'

interface Props {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}
export default function ({ children, style }: Props) {
  return (
    <Hpane alignItems='center' backgroundColor={graydark} {...style}>
      {children}
    </Hpane>
  )
}
