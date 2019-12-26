import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { Button, Modal, Text, Title, TextInput as RNTextInput, IconButton } from 'react-native-paper'
import Page from 'src/components/Page'
import { orangedark, reddark, black, white, gray, graydark } from 'src/constants/Colors'
import { Dropdown } from 'react-native-material-dropdown'
import { Hpane } from 'view-on-steroids'
import { TextInput } from 'src/components/Inputs'
import { Ionicons } from 'react-native-vector-icons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import TopBar from 'src/components/TopBar'
import moment from 'moment'
import { addCalendarEvent, getUsers, User, CalendarEvent, updateCalendarEvent } from 'src/components/api'
import useForm from 'react-hook-form'
import {
  Formik
} from 'formik'
import * as yup from 'yup'

const schema = yup.object({
  userName: yup.string().required(),
  phone: yup.string(),
  startDateTime: yup.date().required(),
  clientName: yup.string().required(),
  eventName: yup.string().required(),
  eventDescription: yup.string()
})
interface Props {
  visible: boolean
  selectedOrder?: CalendarEvent
  onDismiss: () => void
}
export default function ({ visible = false, selectedOrder, onDismiss }: Props) {
  const [employees, setEmployees] = useState<User[]>([])
  async function fetchUsers () {
    const users = await getUsers()
    setEmployees(users)
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  const [pickerVisible, setPickerVisibility] = useState(false)
  const onSubmit = async form => {
    const item = data.find(v => v.value === form.eventName)
    const endDateTime = moment(form.startDateTime).add(item.duration, 'minutes').toDate()
    if (selectedOrder) {
      const usr = employees.find(v => v.UserName === form.userName)
      await updateCalendarEvent({
        eventId: selectedOrder.EventId,
        clientName: form.clientName,
        startDateTime: moment(form.startDateTime).format('DDMMYYYYHHmm'),
        endDateTime: moment(endDateTime).format('DDMMYYYYHHmm'),
        eventDescription: form.eventDescription,
        eventName: form.eventName,
        userId: usr ? usr.Id : selectedOrder.UserId
      })
    } else {
      await addCalendarEvent(
        form.userName,
        moment(form.startDateTime).format('DDMMYYYYHHmm'),
        moment(endDateTime).format('DDMMYYYYHHmm'),
        form.clientName,
        form.eventName,
        form.eventDescription
      )
    }
    onDismiss()
  }
  let user: User
  if (selectedOrder) {
    user = employees.find(v => v.Id === selectedOrder.UserId)
  }
  return (
    <Modal
      onDismiss={onDismiss}
      visible={visible}
      dismissable
      contentContainerStyle={{ flex: 1 }}
    >
      <TopBar style={{ backgroundColor: '#fff' }}>
        <IconButton icon='close' color={graydark} onPress={onDismiss} />
      </TopBar>
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
          userName: user ? user.UserName : '',
          phone: '',
          startDateTime: selectedOrder ? moment(selectedOrder.StartDateTime, 'DD/MM/YYYY hh:mm:ss').toDate() : new Date(),
          clientName: selectedOrder ? selectedOrder.ClientName : '',
          eventName: selectedOrder ? selectedOrder.EventName : data[0].value,
          eventDescription: selectedOrder ? selectedOrder.EventDescription : ''
        }}
      >
        {({ errors, setFieldValue, values, handleSubmit }) => (
          <Page padding={20} justifyContent='flex-start' backgroundColor='#fff'>
            <ScrollView showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView behavior='padding'>
                <Text style={s.baseText}>תאריך וזמן הטפול</Text>
                <TouchableOpacity onPress={() => setPickerVisibility(true)} style={s.datetime}>
                  <>
                    <Title style={s.title}>{moment(values.startDateTime).format('DD.MM.YYYY')}</Title>
                    <Title style={s.title}>{moment(values.startDateTime).format('HH:mm')}</Title>
                  </>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={pickerVisible}
                  mode='datetime'
                  is24Hour
                  date={values.startDateTime}
                  minuteInterval={15}
                  onConfirm={(date) => {
                    setPickerVisibility(false)
                    setFieldValue('startDateTime', date)
                  }}
                  onCancel={() => setPickerVisibility(false)}
                />
                <View style={{ paddingVertical: 15 }}>
                  <Dropdown
                    data={employees.map(v => ({ value: v.UserName }))}
                    value={values.userName}
                    labelFontSize={16}
                    style={s.dropdown}
                    testID='UserName'
                    onChangeText={text => setFieldValue('userName', text)}
                    renderBase={() => (
                      <View style={s.base}>
                        <Ionicons name='md-arrow-dropdown' size={22} color={gray} />
                        <Text style={s.baseText}>{values.userName || 'שם העובד'}</Text>
                      </View>
                    )}
                  />
                </View>
                <View style={{ paddingVertical: 15 }}>
                  <TextInput
                    placeholder='שם הלקוח'
                    testID='clientName'
                    value={values.clientName}
                    onChangeText={text => setFieldValue('clientName', text)}
                  />
                </View>
                <View style={{ paddingVertical: 15 }}>
                  <TextInput
                    placeholder='טלפון'
                    testID='phone'
                    style={{ marginTop: 20 }}
                    value={values.phone}
                    onChangeText={text => setFieldValue('phone', text)}
                  />
                </View>
                <View style={{ paddingVertical: 15 }}>
                  <Dropdown
                    data={data}
                    value={values.eventName}
                    labelFontSize={16}
                    style={s.dropdown}
                    testID='EventName'
                    onChangeText={text => {
                      const item = data.find(v => v.value === text)
                      const startDateTime = values.startDateTime
                      setFieldValue('eventName', text, true)
                      setFieldValue('endDateTime', moment(startDateTime).add(item.duration, 'minutes').toDate())
                    }}
                    renderBase={() => (
                      <View style={s.base}>
                        <Ionicons name='md-arrow-dropdown' size={22} color={gray} />
                        <Text style={s.baseText}>{values.eventName || 'שם הטיפול'}</Text>
                      </View>
                    )}
                  />
                </View>
                <View style={{ paddingVertical: 15 }}>
                  <TextInput
                    placeholder='הערות'
                    testID='description'
                    value={values.eventDescription}
                    onChangeText={text => setFieldValue('eventDescription', text)}
                  />
                </View>
                <Hpane alignItems='center' flex={1}>
                  <Button
                    mode='contained'
                    dark
                    style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
                    theme={{ colors: { primary: orangedark }, roundness: 5 }}
                    contentStyle={{ height: 50 }}
                    onPress={handleSubmit}
                  >
                    שמור
                  </Button>
                  <Button
                    mode='contained'
                    dark
                    style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
                    theme={{ colors: { primary: reddark }, roundness: 5 }}
                    contentStyle={{ height: 50 }}
                    onPress={onDismiss}
                  >
                    ביטול
                  </Button>
                </Hpane>
              </KeyboardAvoidingView>
            </ScrollView>
          </Page>
        )}
      </Formik>
    </Modal>
  )
}

const data = [{
  value: 'זקן לקצץ',
  duration: 30
}, {
  value: 'חתך ציפורניים',
  duration: 40
}, {
  value: 'תספורת',
  duration: 60
}, {
  value: 'צבע שיער',
  duration: 20
}, {
  value: 'תספורת אישה + פן ארוך',
  duration: 60
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
  baseTextRed: {
    marginRight: 10,
    fontSize: 16,
    color: 'red',
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
  },
  datetime: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray
  }
})
