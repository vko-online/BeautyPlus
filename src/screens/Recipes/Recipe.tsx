import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Title } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'

interface Recipe {}
interface Props {
  recipe: Recipe
}
export default function Recipe ({ recipe }: Props) {
  return (
    <View>
      <Title></Title>
    </View>
  )
}
