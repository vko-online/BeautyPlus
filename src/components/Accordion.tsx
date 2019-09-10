import React, { ReactNode, Fragment, useState, useCallback } from 'react'
import {
  View
} from 'react-native'
import {
  TouchableRipple,
  Title,
  IconButton
} from 'react-native-paper'
import { Hpane } from 'view-on-steroids'

interface Props {
  title: string
  children: ReactNode
  visible?: boolean
}
export default function ({ title, children, visible: initialVisibility = false }: Props) {
  const [visible, toggleVisibility] = useState(initialVisibility)

  const handlePress = useCallback(() => {
    toggleVisibility(!visible)
  }, [visible, toggleVisibility])

  return (
    <View style={{ flex: 1 }}>
      <TouchableRipple onPress={handlePress}>
        <Hpane alignItems='center' justifyContent='flex-start'>
          {
            visible ? <IconButton icon='keyboard-arrow-down' /> : <IconButton icon='keyboard-arrow-up' />
          }
          <Title>{title}</Title>
        </Hpane>
      </TouchableRipple>
      {visible && children}
    </View>

  )
}
