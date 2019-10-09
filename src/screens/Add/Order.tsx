import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Button, Modal, Text, Title } from 'react-native-paper'
import Page from 'src/components/Page'
import Header from './header'
import { orangedark, reddark, black, white, gray } from 'src/constants/Colors'
import { Dropdown } from 'react-native-material-dropdown'
import { Hpane } from 'view-on-steroids'
import { TextInput } from 'src/components/Inputs'
import { Ionicons } from '@expo/vector-icons'

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
      <Header onPress={onDismiss} style={{ paddingTop: Platform.OS === 'ios' && 30 }} />
      <Page padding={20} justifyContent='space-evenly' backgroundColor='#fff'>
        <View>
          <Title style={s.title}>02.09.19</Title>
          <Title style={s.title}>12.00</Title>
        </View>
        <View>
          <TextInput
            placeholder='חוקלה םש'
          />
          <TextInput
            placeholder='ןופלט'
            style={{ marginTop: 20 }}
          />
          <Dropdown
            data={data}
            labelFontSize={16}
            style={s.dropdown}
            renderBase={() => (
              <View style={s.base}>
                <Ionicons name='md-arrow-dropdown' size={22} color={gray} />
                <Text style={s.baseText}>20</Text>
              </View>
            )}
          />
          <TextInput
            placeholder='תורעה'
            style={{ marginTop: 20 }}
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
    minHeight: 58,
    height: 58
  },
  baseText: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
    color: black,
    fontFamily: 'levenim-regular'
  },
  base: {
    marginTop: 20,
    height: 57.6,
    maxHeight: 58,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: white,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray,
    paddingHorizontal: 10,
    paddingVertical: 15
  }
})
