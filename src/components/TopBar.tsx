import React, { ReactNode } from 'react'
import { ViewStyle, Platform, StyleProp, I18nManager } from 'react-native'
import { Hpane } from 'view-on-steroids'
import { graydark } from 'src/constants/Colors'

interface Props {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}
const direction = I18nManager.isRTL ? 'row-reverse' : 'row'
export default function ({ children, style }: Props) {
  return (
    <Hpane alignItems='center' backgroundColor={graydark} flexDirection={direction} {...style}>
      {children}
    </Hpane>
  )
}
