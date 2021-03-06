import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Dropdown } from 'react-native-material-dropdown'
import { Ionicons } from 'react-native-vector-icons'
import TopBar from 'src/components/TopBar'
import { white, black, gray } from 'src/constants/Colors'

interface Props {
  delimeter: number
  setDelimeter: (val: number) => void
}
export default function ({ delimeter, setDelimeter }: Props) {
  return (
    <TopBar style={{ borderTopColor: white, borderTopWidth: StyleSheet.hairlineWidth }}>
      <Dropdown
        value={delimeter.toString()}
        data={delimeters}
        rippleCentered
        rippleInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}
        renderBase={() => (
          <View style={s.base}>
            <Ionicons name='md-arrow-dropdown' size={22} color={gray} />
            <Text style={s.baseText}>{delimeter}</Text>
          </View>
        )}
        onChangeText={(val) => setDelimeter(Number(val))}
        labelFontSize={13}
        style={s.dropdownInput}
        containerStyle={s.dropdown}
      />
    </TopBar>
  )
}

const delimeters = [{ value: '15' }, { value: '20' }, { value: '30' } ]
const s = StyleSheet.create({
  dropdown: {
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'rgb(170, 184, 194)',
    // borderRadius: 3,
    width: 56,
    // height: 60,
    marginLeft: 7
    // padding: 0
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },
  base: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  baseText: {
    marginRight: 6,
    color: black,
    fontFamily: 'LevenimMT-Bold'
  },
  dropdownInput: {
    color: '#fff',
    margin: 0,
    padding: 0
  }
})
