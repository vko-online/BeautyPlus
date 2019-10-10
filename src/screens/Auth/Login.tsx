import React from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Button, Modal, Title } from 'react-native-paper'
import Page from 'src/components/Page'
import Background from 'src/components/background'
import { orangedark } from 'src/constants/Colors'
import { TextInput } from 'src/components/Inputs'
import { withNavigation, NavigationScreenProp } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
function Screen ({ navigation }: Props) {
  return (
    <Background showHeader={false}>
      <Page flex={1} flexGrow={1} alignSelf='stretch' padding={20} justifyContent='space-evenly'>
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
          onPress={() => navigation.navigate('Dashboard')}
        >
          רומש
        </Button>
      </Page>
    </Background>
  )
}

Screen.navigationOptions = {
  header: null
}

const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'levenim-bold',
    color: orangedark,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default withNavigation(Screen)
