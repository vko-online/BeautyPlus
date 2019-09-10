import React, { useState, useCallback } from 'react'
import {
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  View,
  ImageSourcePropType,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponder,
  TouchableOpacity
} from 'react-native'
import { Text } from 'react-native-paper'
import { Hpane } from 'view-on-steroids'
import { lightRed } from 'src/constants/Colors'
const { width } = Dimensions.get('window')

const initialValues: Day[] = [{
  name: 'Mon',
  fullname: 'Monday',
  meals: [{
    title: 'Low-carb blueberry smoothie',
    type: 'breakfast',
    image: require('src/assets/meals/mon/1.jpg')
  }, {
    title: 'Low-carb zucchini and walnut salad',
    type: 'Lunch',
    image: require('src/assets/meals/mon/2.jpg')
  }, {
    title: 'Low-carb moussaka',
    type: 'Dinner',
    image: require('src/assets/meals/mon/3.jpg')
  }]
}, {
  name: 'Tue',
  fullname: 'Tuesday',
  meals: [{
    title: 'Judy’s fabulous low-carb oatmeal',
    type: 'breakfast',
    image: require('src/assets/meals/tue/1.jpg')
  }, {
    title: 'Keto Caprese omelet',
    type: 'Lunch',
    image: require('src/assets/meals/tue/2.jpg')
  }, {
    title: 'Broccoli and cauliflower gratin with sausage',
    type: 'Dinner',
    image: require('src/assets/meals/tue/3.jpg')
  }]
}, {
  name: 'Wed',
  fullname: 'Wednesday',
  meals: [{
    title: 'Keto frittata with fresh spinach',
    type: 'breakfast',
    image: require('src/assets/meals/wed/1.jpg')
  }, {
    title: 'Low-carb rutabaga fritters with avocado',
    type: 'Lunch',
    image: require('src/assets/meals/wed/2.jpg')
  }, {
    title: 'Zoodles with creamy salmon sauce',
    type: 'Dinner',
    image: require('src/assets/meals/wed/3.jpg')
  }]
}, {
  name: 'Thu',
  fullname: 'Thursday',
  meals: [{
    title: 'Low-carb coconut cream with berries',
    type: 'breakfast',
    image: require('src/assets/meals/thu/1.jpg')
  }, {
    title: 'Salad in a jar',
    type: 'Lunch',
    image: require('src/assets/meals/thu/2.jpg')
  }, {
    title: 'Creamy low-carb Tuscan shrimp',
    type: 'Dinner',
    image: require('src/assets/meals/thu/3.jpg')
  }]
}, {
  name: 'Fri',
  fullname: 'Friday',
  meals: [{
    title: 'Mushroom omelet',
    type: 'breakfast',
    image: require('src/assets/meals/fri/1.jpg')
  }, {
    title: 'Low-carb fried kale and broccoli salad',
    type: 'Lunch',
    image: require('src/assets/meals/fri/2.jpg')
  }, {
    title: 'Low-carb eggplant pizza',
    type: 'Dinner',
    image: require('src/assets/meals/fri/3.jpg')
  }]
}, {
  name: 'Sat',
  fullname: 'Saturday',
  meals: [{
    title: 'Low-carb eggplant hash with eggs',
    type: 'breakfast',
    image: require('src/assets/meals/sat/1.jpg')
  }, {
    title: 'Keto quesadillas',
    type: 'Lunch',
    image: require('src/assets/meals/sat/2.jpg')
  }, {
    title: 'Creamy low-carb cauliflower mushroom risotto',
    type: 'Dinner',
    image: require('src/assets/meals/sat/3.jpg')
  }]
}, {
  name: 'Sun',
  fullname: 'Sunday',
  meals: [{
    title: 'Keto pancakes with berries and whipped cream',
    type: 'breakfast',
    image: require('src/assets/meals/sun/1.jpg')
  }, {
    title: 'Jill\'s cheese crusted omelet',
    type: 'Lunch',
    image: require('src/assets/meals/sun/2.jpg')
  }, {
    title: 'Easy protein noodle low-carb lasagna',
    type: 'Dinner',
    image: require('src/assets/meals/sun/3.jpg')
  }]
}]
const initialPosition = { x: 0, y: 0 }
interface Meal {
  title: string
  type: string
  image: ImageSourcePropType
}
interface Day {
  name: string
  fullname: string
  meals: Meal[]
}
interface DayProps {
  name: string
  fullname: string
  source: ImageSourcePropType
  onPress?: () => void
}
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
function Day ({ name, fullname, source, onPress }: DayProps) {
  const d = new Date()
  const dayName = days[d.getDay()]
  const isToday = fullname.toLowerCase() === dayName.toLowerCase()
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImageBackground source={source} style={s.day}>
        <Text>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}
function Weeks () {
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState({
    x: activeIndex * width / initialValues.length,
    y: 0
  })

  const handleMove = useCallback((
   evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
    ) => {
    setPosition({
      x: position.x + gestureState.dx,
      y: position.y
    })
  }, [position, setPosition])

  const handleRelease = useCallback((
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const positionX = e.nativeEvent.pageX - e.nativeEvent.locationX
    const diff = width / initialValues.length
    const v = Math.round(positionX / diff)
    setActiveIndex(v)
    // could add animation here :thinking:
    setPosition({
      x: v * diff,
      y: position.y
    })
  }, [position, setPosition, setActiveIndex])

  // definitely need animation here
  const handleClick = useCallback((index) => {
    console.log('index', index)
    const diff = width / initialValues.length
    setActiveIndex(index)
    // could add animation here :thinking:
    setPosition({
      x: index * diff,
      y: position.y
    })
  }, [position, setActiveIndex, setPosition])

  const pan = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: handleMove,
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: handleRelease,
    onShouldBlockNativeResponder: (evt, gestureState) => true
  })
  return (
    <View style={s.container}>
      <Hpane>
        {
          initialValues.map((item, index) => (
            <Day
              key={index}
              name={item.name}
              fullname={item.fullname}
              source={item.meals[0].image}
              onPress={() => {
                console.log('click')
                handleClick(index)
              }}
            />
          ))
        }
      </Hpane>
      <View style={[s.indicator, { top: position.y, left: position.x }]} {...pan.panHandlers} />
      <FlatList
        data={initialValues[activeIndex].meals}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => <Meal name={item.title} source={item.image} type={item.type} />}
      />
    </View>
  )
}

interface MeapProps {
  name: string
  type: string
  source: ImageSourcePropType
}
function Meal ({ name, type, source }: MeapProps) {
  return (
    <ImageBackground source={source} style={s.meal}>
      <Text>{name}</Text>
    </ImageBackground>
  )
}

const height = 200
const s = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  meal: {
    padding: 10,
    margin: 5,
    width,
    height: height
  },
  day: {
    padding: 10,
    opacity: 0.8,
    height: height,
    margin: 5,
    width: width / initialValues.length - 10,
    flexGrow: 1
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
    borderWidth: 7,
    borderColor: lightRed,
    borderRadius: 5,
    width: width / initialValues.length,
    height: height + 10
  }
})

export default Weeks
