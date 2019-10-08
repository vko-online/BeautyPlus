import React, { ReactNode } from 'react'
import { Hpane } from 'view-on-steroids'
import { graydark } from 'src/constants/Colors'
import { ViewStyle } from 'react-native'

interface Props {
  children?: ReactNode
  style?: ViewStyle
}
export default function ({ children, style }: Props) {
  return (
    <Hpane alignItems='center' backgroundColor={graydark} {...style}>
      {children}
    </Hpane>
  )
}
