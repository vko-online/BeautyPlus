import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Modal, Title, TextInput } from 'react-native-paper'
import Page from 'src/components/Page'
import Header from './header'
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
      <Header onPress={onDismiss} />
      <ImageBackground
        source={require('./Background.png')}
        style={s.background}
        resizeMode='stretch'
      >
        <Page padding={20} justifyContent='space-evenly' backgroundColor='transparent'>
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
      </ImageBackground>
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
  },
  background: {
    flex: 1
  }
})
