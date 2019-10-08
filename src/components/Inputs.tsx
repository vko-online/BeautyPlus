import React from 'react'
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  StyleProp,
  ViewStyle
} from 'react-native'
import { black, white, pink, gray } from 'src/constants/Colors'

interface Props extends TextInputProps {
  style?: StyleProp<ViewStyle>
}
export function TextInput ({ style, ...other }: Props) {
  return (
    <RNTextInput
      style={[s.input, style]}
      {...other}
    />
  )
}

const s = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: gray,
    backgroundColor: white,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 15,
    fontSize: 20,
    flex: 1,
    minHeight: 58,
    textAlign: 'right',
    fontFamily: 'levenim-regular'
  }
})
