import React from 'react'
import {
  StyleSheet,
  Image,
  View
} from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'

interface TestKitchenProps {
  onPress?: () => void
}
export function TestKitchen ({ onPress }: TestKitchenProps) {
  return (
    <TouchableRipple style={s.button} onPress={onPress}>
      <View style={s.container}>
        <Image style={s.image} source={require('src/assets/icons/verified_check.png')} />
        <Text style={s.text}>Test Kitchen</Text>
      </View>
    </TouchableRipple>
  )
}

const s = StyleSheet.create({
  button: {
    margin: 10,
    alignSelf: 'flex-end'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  image: {
    width: 45,
    height: 45,
    zIndex: 2
  },
  text: {
    zIndex: 1,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    marginLeft: -18,
    marginRight: 5,
    marginTop: -2,
    paddingVertical: 7,
    paddingLeft: 14,
    paddingRight: 6,
    backgroundColor: '#2b95e9',
    color: '#fff'
  }
})
