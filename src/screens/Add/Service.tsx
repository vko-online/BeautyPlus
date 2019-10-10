import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Modal, Title, Text } from 'react-native-paper'
import Page from 'src/components/Page'
import { orangedark, gray, black, white } from 'src/constants/Colors'
import Background from 'src/components/background'
import { Dropdown } from 'react-native-material-dropdown'
import { Ionicons } from '@expo/vector-icons'
import { TextInput } from 'src/components/Inputs'

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
              numberOfLines={1}
            />
            <View style={s.multiline}>
              <TextInput
                placeholder='לופיט ןמז'
                numberOfLines={1}
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
            </View>
          </View>
          <Button
            mode='contained'
            dark
            style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
            theme={{ colors: { primary: orangedark }, roundness: 5 }}
            contentStyle={{ height: 50 }}
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
  multiline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    width: 50
  },
  base: {
    height: 57.6,
    maxHeight: 58,
    width: 60,
    marginRight: -17,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  baseText: {
    marginRight: 10,
    fontSize: 16,
    color: black,
    fontFamily: 'levenim-regular'
  },
  item: {
    fontFamily: 'levenim-regular',
    fontSize: 16
  }
})
