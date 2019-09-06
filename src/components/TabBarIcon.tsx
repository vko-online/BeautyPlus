import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from 'src/constants/Colors'

interface Props {
  name: string
  focused: boolean
  icon?: ImageSourcePropType
  iconActive?: ImageSourcePropType
}
export default function TabBarIcon ({ name, focused, icon, iconActive }: Props) {
  if (icon) {
    if (focused) {
      return iconActive
    }
    return icon
  }
  return (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  )
}
