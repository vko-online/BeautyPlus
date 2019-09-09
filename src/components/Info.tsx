import React, { useState, useCallback } from 'react'
import {
  Animated,
  View,
  StyleSheet
} from 'react-native'
import {
  Text,
  TouchableRipple,
  Subheading,
  Caption,
  Button,
  Paragraph,
  Divider
} from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Vpane, Hpane } from 'view-on-steroids'
import { black, extraLightGray, darkGray, primary } from 'src/constants/Colors'

const netCardsColor = '#fc6b03'
const fatColor = '#f1c40e'
const proteinColor = primary

type Serving = 'Per serving' | 'Per dinner'
type Value = {
  percent: number
  gramms: number
}
interface Props {
  info: {
    type: Serving
    netCards: Value
    fat: Value
    protein: Value
    kcal: number
  }
}
function Slide ({
  info: {
    type,
    netCards,
    fat,
    protein,
    kcal
  }
}: Props = data) {
  const [namesVisible, setNamesVisibility] = useState(false)
  const [value] = useState(new Animated.Value(0))

  const onToggle = useCallback(() => {
    if (namesVisible) {
      Animated.timing(value, {
        duration: 300,
        toValue: 0
      }).start(() => {
        setNamesVisibility(false)
      })
    } else {
      Animated.timing(value, {
        duration: 300,
        toValue: 1
      }).start(() => {
        setNamesVisibility(true)
      })
    }
  }, [namesVisible, value, setNamesVisibility])
  const top = value.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0]
  })
  return (
    <Vpane opacity={0.8}>
      <TouchableRipple style={s.container} onPress={onToggle}>
        <Animated.View style={[s.animation, { top }]}>
          <View style={s.row}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={[s.block, s.blockNetCarbs, { flex: Math.max(netCards.percent / 100, 0.2) }]}
              colors={[netCardsColor, fatColor]}
            >
              <Text style={s.text}>net carbs</Text>
            </LinearGradient>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={[s.block, s.blockFat, { flex: Math.max(fat.percent / 100, 0.2) }]}
              colors={[fatColor]}
            >
              <Text style={s.text}>fat</Text>
            </LinearGradient>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={[s.block, s.blockProtein, { flex: Math.max(protein.percent / 100, 0.2) }]}
              colors={[fatColor, proteinColor]}
            >
              <Text style={s.text}>protein</Text>
            </LinearGradient>
          </View>
          <View style={s.row}>
            <View style={[s.block, s.blockNetCarbs, { flex: Math.max(netCards.percent / 100, 0.2) }]}>
              <Text style={s.text}>{netCards.percent}% ({netCards.gramms}g)</Text>
            </View>
            <View style={[s.block, s.blockFat, { flex: Math.max(fat.percent / 100, 0.2) }]}>
              <Text style={s.text}>{fat.percent}% ({fat.gramms}g)</Text>
            </View>
            <View style={[s.block, s.blockProtein, { flex: Math.max(protein.percent / 100, 0.2) }]}>
              <Text style={s.text}>{protein.percent}% ({protein.gramms}g)</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableRipple>
      <Hpane alignItems='center' height={40} justifyContent='flex-start' paddingHorizontal={20}>
        <Text style={s.text}>kcal {kcal}</Text>
        <Text style={[s.text, { fontSize: 20, marginHorizontal: 10 }]}>•</Text>
        <Text style={[s.text, { color: darkGray }]}>{type}</Text>
      </Hpane>
      {/* <Hpane>
        <Text>
          We don't recommend counting calories.
          <Button mode='text'>Here's why.</Button>
        </Text>
      </Hpane> */}
    </Vpane>
  )
}

const s = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    height: 40,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: 'rgba(54, 54, 54, 0.7)',
    shadowRadius: 10,
    shadowOpacity: 1
  },
  animation: {
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0
  },
  row: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  text: {
    fontFamily: 'montserrat-medium',
    color: black,
    fontSize: 15
  },
  block: {
    alignItems: 'center',
    paddingHorizontal: 4,
    height: 40,
    justifyContent: 'center'
  },
  blockNetCarbs: {
    backgroundColor: netCardsColor
  },
  blockFat: {
    backgroundColor: fatColor
  },
  blockProtein: {
    backgroundColor: proteinColor
  }
})

export const data: Props = {
  info: {
    type: 'Per serving',
    kcal: 1015,
    netCards: {
      percent: 2,
      gramms: 4
    },
    fat: {
      gramms: 87,
      percent: 78
    },
    protein: {
      percent: 20,
      gramms: 51
    }
  }
}
export default Slide
