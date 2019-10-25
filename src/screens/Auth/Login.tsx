import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Button, Modal, Title } from 'react-native-paper'
import Page from 'src/components/Page'
import Background from 'src/components/background'
import { orangedark } from 'src/constants/Colors'
import { TextInput } from 'src/components/Inputs'
import { withNavigation, NavigationScreenProp } from 'react-navigation'
import Layout from 'src/constants/Layout'
import { Vpane } from 'view-on-steroids'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
function Screen ({ navigation }: Props) {
  return (
    <Background showHeader={false}>
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
            />
            <TextInput
              placeholder='סיסמה'
              style={{ marginTop: 20 }}
            />
          </Vpane>
          <Button
            mode='contained'
            dark
            style={s.button}
            theme={{ colors: { primary: orangedark }, roundness: 5 }}
            contentStyle={{ height: 50 }}
            onPress={() => navigation.navigate('Dashboard')}
          >
            כניסה
          </Button>
        </Page>
      </Page>
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
