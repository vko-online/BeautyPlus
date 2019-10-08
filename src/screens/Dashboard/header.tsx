import React, { useState } from 'react'
import { IconButton, Text, Menu, Divider } from 'react-native-paper'
import { Hpane } from 'view-on-steroids'
import { white, graydark } from 'src/constants/Colors'

interface Props {
  text?: string
}
export default function ({ text = 'September 1-7' }: Props) {
  const [visible, setVisibility] = useState(false)
  return (
    <>
      <Hpane alignItems='center' backgroundColor={graydark}>
        <Menu
          visible={visible}
          onDismiss={() => setVisibility(false)}
          anchor={
            <IconButton icon='more-vert' theme={iconTheme} onPress={() => setVisibility(true)} />
          }
        >
          <Menu.Item onPress={() => null} title='Item 1' />
          <Menu.Item onPress={() => null} title='Item 2' />
          <Divider />
          <Menu.Item onPress={() => null} title='Item 3' />
        </Menu>
        <IconButton icon='add' theme={iconTheme} />
        <IconButton icon='today' theme={iconTheme} />
        <IconButton icon='chevron-left' theme={iconTheme} />
        <Text style={{ color: white }}>{text}</Text>
        <IconButton icon='chevron-right' theme={iconTheme} />
      </Hpane>
    </>
  )
}

const iconTheme = { colors: { text: white } }
