import React, { useState } from 'react'
import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native'
import { Button, Modal, Text, Title, TextInput as RNTextInput, IconButton } from 'react-native-paper'
import Page from 'src/components/Page'
import Header from './header'
import { orangedark, reddark, black, white, gray, graydark } from 'src/constants/Colors'
import { Dropdown } from 'react-native-material-dropdown'
import { Hpane } from 'view-on-steroids'
import { TextInput } from 'src/components/Inputs'
import { Ionicons } from 'react-native-vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import TopBar from 'src/components/TopBar'
import moment from 'moment'

interface Props {
  visible: boolean
  onDismiss: () => void
}
export default function ({ visible = false, onDismiss }: Props) {
  const [pickerVisible, setPickerVisibility] = useState(false)
  const [orderDate, setOrderDate] = useState(new Date())
  function handleDatePicked (date) {
    console.log('A date has been picked: ', date)
    setOrderDate(date)
    setPickerVisibility(false)
  }
  return (
    <Modal
      onDismiss={onDismiss}
      visible={visible}
      dismissable
      contentContainerStyle={{ flex: 1 }}
    >
      <TopBar style={{ backgroundColor: '#fff' }}>
        <IconButton icon='close' color='#fff' onPress={onDismiss} />
      </TopBar>
      <Page padding={20} justifyContent='flex-start' backgroundColor='#fff'>
        <TouchableOpacity onPress={() => setPickerVisibility(true)}>
          <>
            <Title style={s.title}>{moment(orderDate).format('DD.MM.YYYY')}</Title>
            <Title style={s.title}>{moment(orderDate).format('HH:mm')}</Title>
          </>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={pickerVisible}
          mode='datetime'
          onConfirm={handleDatePicked}
          onCancel={() => setPickerVisibility(false)}
        />
        <View style={{ paddingVertical: 15 }}>
          <TextInput
            placeholder='שם הלקוח'
          />
        </View>
        <View style={{ paddingVertical: 15 }}>
          <TextInput
            placeholder='טלפון'
            style={{ marginTop: 20 }}
          />
        </View>
        <View style={{ paddingVertical: 15 }}>
          <Dropdown
            data={data}
            labelFontSize={16}
            style={s.dropdown}
            renderBase={() => (
              <View style={s.base}>
                <Ionicons name='md-arrow-dropdown' size={22} color={gray} />
                <Text style={s.baseText}>שם הטיפול</Text>
              </View>
            )}
          />
        </View>
        <View style={{ paddingVertical: 15 }}>
          <TextInput
            placeholder='הערות'
          />
        </View>
        <Hpane alignItems='center' flex={1}>
          <Button
            mode='contained'
            dark
            style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
            theme={{ colors: { primary: orangedark }, roundness: 5 }}
            contentStyle={{ height: 50 }}
          >
            שמור
          </Button>
          <Button
            mode='contained'
            dark
            style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
            theme={{ colors: { primary: reddark }, roundness: 5 }}
            contentStyle={{ height: 50 }}
          >
            ביטול
          </Button>
        </Hpane>
      </Page>
    </Modal>
  )
}

const data = [{
  value: 'זקן לקצץ'
}, {
  value: 'חתך ציפורניים'
}, {
  value: 'תספורת'
}, {
  value: 'צבע שיער'
}]

const s = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'LevenimMT-Bold',
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
    fontFamily: 'LevenimMT'
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
