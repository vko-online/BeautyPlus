import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Modal, Title, TextInput } from 'react-native-paper'
import Page from 'src/components/Page'
import Background from './background'
import { orangedark } from 'src/constants/Colors'

interface Props {
  visible: boolean
  onDismiss: () => void
}
export default function ({ visible = false, onDismiss }: Props) {
  return (
    <Modal
      onDismiss={onDismiss}
      visible={visible}
      dismissable
      contentContainerStyle={{ flex: 1 }}
    >
      <Background onDismiss={onDismiss}>
        <Page flex={1} flexGrow={1} alignSelf='stretch' padding={20} justifyContent='space-evenly' backgroundColor='red'>
          <Title style={s.title}>שדח חוקל תפסוה</Title>
          <View>
            <TextInput
              placeholder='לופיטה םש'
            />
            <TextInput
              placeholder='ירלולס'
              style={{ marginTop: 20 }}
            />
          </View>
          <Button
            mode='contained'
            dark
            style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
            theme={{ colors: { primary: orangedark } }}
          >
            רומש
          </Button>
        </Page>
      </Background>
    </Modal>
  )
}

const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'levenim-bold',
    color: orangedark,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
