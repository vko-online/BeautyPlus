import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Modal, Title } from 'react-native-paper'
import Page from 'src/components/Page'
import Background from 'src/components/background'
import { orangedark } from 'src/constants/Colors'
import { TextInput } from 'src/components/Inputs'
import { Formik } from 'formik'
import * as yup from 'yup'
import { addClient } from 'src/components/api'

const schema = yup.object({
  clientName: yup.string().required(),
  phone: yup.string().required()
})

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
        <Formik
          initialValues={{
            clientName: '',
            phone: ''
          }}
          onSubmit={async (values) => {
            const data = await addClient(values.clientName, values.phone)
            console.log('data', data)
            onDismiss()
          }}
          validationSchema={schema}
        >
          {({ setFieldValue, values, handleSubmit }) => (
            <Page flex={1} flexGrow={1} alignSelf='stretch' padding={20} justifyContent='space-evenly'>
              <Title style={s.title}>הוספת לקוח חדש</Title>
              <View>
                <TextInput
                  placeholder='שם הלקוח'
                  value={values.clientName}
                  onChangeText={value => setFieldValue('clientName', value)}
                />
                <TextInput
                  placeholder='סלולרי'
                  style={{ marginTop: 20 }}
                  value={values.phone}
                  onChangeText={value => setFieldValue('phone', value)}
                />
              </View>
              <Button
                mode='contained'
                dark
                style={{ marginTop: 20, width: 150, alignSelf: 'center' }}
                theme={{ colors: { primary: orangedark } }}
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
              >
                שמור
              </Button>
            </Page>
          )}
        </Formik>
      </Background>
    </Modal>
  )
}

const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'LevenimMT-Bold',
    color: orangedark,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
