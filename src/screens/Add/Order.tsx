import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Modal, Title, TextInput } from 'react-native-paper'
import Page from 'src/components/Page'
import Header from './header'
import { orangedark, reddark, black, white } from 'src/constants/Colors'
import { Dropdown } from 'react-native-material-dropdown'
import { Hpane } from 'view-on-steroids'

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
      <Page padding={20} justifyContent='space-evenly' backgroundColor='#fff'>
        <View>
          <Title style={s.title}>02.09.19</Title>
          <Title style={s.title}>12.00</Title>
        </View>
        <View>
          <TextInput
            placeholder='חוקלה םש'
            mode='outlined'
          />
          <Dropdown
            label='םידבוע'
            data={data}
            labelSize={16}
            style={s.dropdownInput}
            containerStyle={s.dropdown}
          />
          <TextInput
            placeholder='ןופלט'
            style={{ marginTop: 20 }}
            mode='outlined'
          />
          <Dropdown
            data={data}
            labelSize={16}
            containerStyle={s.dropdown}
            style={s.dropdownInput}
            label='לופיטה םש'
          />
          <TextInput
            placeholder='תורעה'
            style={{ marginTop: 20 }}
            mode='outlined'
          />
        </View>
        <Hpane alignItems='center'>
          <Button
            mode='contained'
            dark
            style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
            theme={{ colors: { primary: orangedark } }}
          >
            רומש
          </Button>
          <Button
            mode='contained'
            dark
            style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
            theme={{ colors: { primary: reddark } }}
          >
            לוטיב
          </Button>
        </Hpane>
      </Page>
    </Modal>
  )
}

const data = [{
  value: 'Banana'
}, {
  value: 'Mango'
}, {
  value: 'Pear'
}]

const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'levenim-bold',
    color: black,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  dropdown: {
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: white,
    borderColor: 'rgb(170, 184, 194)',
    borderRadius: 3,
    height: 58
  },
  dropdownInput: {
    borderWidth: 0
  }
})
