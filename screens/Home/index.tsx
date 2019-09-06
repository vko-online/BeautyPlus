import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  SectionList,
  SectionListData
} from 'react-native'
import { Headline, Appbar, Button, Title, Avatar, Banner } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import { NavigationScreenProp } from 'react-navigation'

import Post from './Post'
import data from './_data.json'
import { lightGray, extraExtraLightGray } from 'constants/Colors'
function noop () {
  // noop
}
interface IHeader {
  section: SectionListData<{ title: string }>
}
function SectionHeader ({ section: { title } }: IHeader) {
  return null
}
function ItemSeparator () {
  return <View style={{ backgroundColor: extraExtraLightGray, height: 10, width: '100%' }} />
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Appbar.Header theme={{ colors: { primary: '#fff' } }}>
        <TouchableOpacity onPress={navigation.openDrawer}>
          <Avatar.Image size={40} source={require('assets/images/robot-dev.png')} />
        </TouchableOpacity>
        <Appbar.Content title='Discover' />
        <Appbar.Action icon='settings' />
      </Appbar.Header>
      <SectionList
        style={{ padding: 10, backgroundColor: extraExtraLightGray }}
        sections={data}
        renderSectionHeader={SectionHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index }) => (
          <Post
            key={index}
            post={item}
            onPress={noop}
            onRightPress={noop}
          />
        )}
        initialNumToRender={3}
      />
    </View>
  )
}

Screen.navigationOptions = {
  header: null
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
