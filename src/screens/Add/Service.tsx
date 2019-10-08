import React, { useState } from 'react'
import { StyleSheet, View, Picker } from 'react-native'
import { Button, Modal, Title, TextInput } from 'react-native-paper'
import Page from 'src/components/Page'
import Header from './header'
import { orangedark } from 'src/constants/Colors'
import Background from './background'

interface Props {
  visible: boolean
  onDismiss: () => void
}
export default function ({ visible = false, onDismiss }: Props) {
  const [duration, setDuration] = useState(initialValue.value)
  return (
    <Modal
      onDismiss={onDismiss}
      visible={visible}
      dismissable
      contentContainerStyle={{ flex: 1 }}
    >
      <Background onDismiss={onDismiss}>
        <Page padding={20} justifyContent='space-evenly' backgroundColor='transparent'>
          <Title style={s.title}>שדח לופיט תפסוה</Title>
          <View>
            <TextInput
              placeholder='לופיטה םש'
            />
            <View style={s.inputs}>
              <TextInput
                placeholder='לופיט ןמז'
                style={{ flex: 1, paddingRight: 50 }}
              />
              <Picker
                selectedValue={duration}
                style={s.dropdown}
                itemStyle={s.item}
                onValueChange={(itemValue) =>
                  setDuration(itemValue)
                }>
                {
                  data.map((item, key) => (
                    <Picker.Item label={item.value} value={item.value} key={key} />
                  ))
                }
              </Picker>
            </View>
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
const data = [{
  value: '10'
}, {
  value: '15'
}, {
  value: '20'
}, {
  value: '30'
}, {
  value: '60'
}, {
  value: '120'
}, {
  value: '180'
}]
const initialValue = data[0]
const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'levenim-bold',
    color: orangedark,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  inputs: {
    position: 'relative',
    marginTop: 20
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50
  },
  item: {
    fontFamily: 'levenim-regular',
    fontSize: 16
  }
})
