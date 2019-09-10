import React, { useState, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
// import { GiftedChat } from 'react-native-gifted-chat'
import Header from 'src/components/Header'

type User = {
  _id: number
  name: string
  avatar: string
}
type Message = {
  _id: number
  text: string
  createdAt: Date
  user: User
}
const initialMessages = [{
  _id: 1,
  text: 'That recipe is awesome 😍',
  createdAt: new Date(),
  user: {
    _id: 2,
    name: 'Jessica',
    avatar: 'https://placeimg.com/140/140/any'
  }
}]

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  // const onSend = useCallback((newMessages = []) => {
  //   setMessages(GiftedChat.append(messages, newMessages))
  // }, [messages])

  return (
    <View style={s.container}>
      <Header />
      <Text>Discussion chat here</Text>
      {/* <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      /> */}
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
