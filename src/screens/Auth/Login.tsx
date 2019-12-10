import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Snackbar, Title } from 'react-native-paper'
import Page from 'src/components/Page'
import Background from 'src/components/background'
import { orangedark } from 'src/constants/Colors'
import { TextInput } from 'src/components/Inputs'
import { withNavigation, NavigationScreenProp } from 'react-navigation'
import Layout from 'src/constants/Layout'
import { Vpane } from 'view-on-steroids'
import AsyncStorage from '@react-native-community/async-storage'
import { Formik } from 'formik'
import * as yup from 'yup'
import { login } from 'src/components/api'
import { Text } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar'

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
})

interface Props {
  navigation: NavigationScreenProp<any, any>
}
function Screen ({ navigation }: Props) {
  const [visible, setVisible] = useState(false)
  async function getData () {
    try {
      const value = await AsyncStorage.getItem('username')
      if (value !== null) {
        navigation.navigate('DashboardStack')
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // tslint:disable-next-line: no-floating-promises
    getData()
  }, [])

  return (
    <Background showHeader={false}>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={schema}
        onSubmit={async (values) => {
          console.log('values', values)
          const data = await login(values.username, values.password)
          console.log('data', data)
          if (typeof data === 'object') {
            console.log('data')
            await AsyncStorage.setItem('username', data.UserName)
            navigation.navigate('DashboardStack')
          } else {
            setVisible(true)
          }
        }}
      >
        {({ setFieldValue, handleSubmit, values }) => (
          <Page flex={1} flexGrow={1} alignSelf='stretch' padding={20} justifyContent='flex-start'>
            <View style={s.head}>
              <Image
                style={s.logo}
                source={require('src/assets/images/logo_long.png')}
                resizeMode='contain'
              />
            </View>
            <Page flex={1} alignSelf='stretch' justifyContent='flex-end'>
              <Vpane height={140} marginBottom={140} justifyContent='space-evenly' alignItems='stretch'>
                <TextInput
                  placeholder='שם משתמש'
                  value={values.username}
                  autoCapitalize='none'
                  onChangeText={value => setFieldValue('username', value)}
                />
                <TextInput
                  placeholder='סיסמה'
                  style={{ marginTop: 20 }}
                  value={values.password}
                  secureTextEntry
                  onChangeText={value => setFieldValue('password', value)}
                />
              </Vpane>
              <Button
                mode='contained'
                dark
                style={s.button}
                theme={{ colors: { primary: orangedark }, roundness: 5 }}
                contentStyle={{ height: 50 }}
                onPress={handleSubmit}
              >
                כניסה
              </Button>
            </Page>
          </Page>
        )}
      </Formik>
      <Snackbar onDismiss={() => setVisible(false)} visible={visible}>
        Invalid login or password
      </Snackbar>
    </Background>
  )
}

Screen.navigationOptions = {
  header: null
}

const s = StyleSheet.create({
  head: {
    alignItems: 'flex-start'
  },
  logo: {
    marginTop: 40,
    width: (Layout.window.width / 3) * 2,
    alignSelf: 'flex-start'
  },
  button: {
    marginTop: 20,
    marginBottom: 50,
    width: 150,
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    fontFamily: 'LevenimMT-Bold',
    color: orangedark,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default withNavigation(Screen)
