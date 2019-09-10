import React, { useState, useCallback, useEffect, Fragment } from 'react'
import {
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  View,
  ImageSourcePropType,
  GestureResponderEvent,
  PanResponderGestureState,
  PanResponder,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent
} from 'react-native'
import { Text, Title } from 'react-native-paper'
import { Hpane } from 'view-on-steroids'
import { lightRed } from 'src/constants/Colors'
// const { width } = Dimensions.get('window')
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

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
/**
 * this component lacks flexbox
 * need refactoring regarding the width props
 */
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
  width: number
}
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
function Day ({ name, fullname, source, onPress, width }: DayProps) {
  const d = new Date()
  const dayName = days[d.getDay() - 1]
  const isToday = fullname.toLowerCase() === dayName.toLowerCase()
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImageBackground source={source} style={[s.day, { width } ]}>
        <Text style={{ flex: 1, fontSize: 10, fontWeight: 'bold' }}>{name}</Text>
        {
          isToday && <Text style={[s.today, { width }]}>TODAY</Text>
        }
      </ImageBackground>
    </TouchableOpacity>
  )
}
function Weeks () {
  const d = new Date()
  const initialWeekIndex = d.getDay() - 1
  const [width, setWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(initialWeekIndex)
  const [position, setPosition] = useState({
    x: initialWeekIndex * width / initialValues.length,
    y: 0
  })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width
    setWidth(width)
    setPosition({
      x: activeIndex * width / initialValues.length,
      y: 0
    })
  }, [width])

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
    const posIndex = Math.round(positionX / diff)
    const normalizedPos = Math.min(posIndex, initialValues.length - 1)
    setActiveIndex(normalizedPos)
    // could add animation here :thinking:
    setPosition({
      x: normalizedPos * diff,
      y: position.y
    })
  }, [position, setPosition, setActiveIndex])

  // definitely need animation here
  const handleClick = useCallback((index) => {
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
    <View style={s.container} onLayout={handleLayout}>
      {
        (width > 0) && (
          <Fragment>
            <Hpane>
              {
                initialValues.map((item, index) => (
                  <Day
                    key={index}
                    width={width / initialValues.length - 10}
                    name={item.name}
                    fullname={item.fullname}
                    source={item.meals[0].image}
                    onPress={() => handleClick(index)}
                  />
                ))
              }
            </Hpane>
            <View style={[s.indicator, { width: width / initialValues.length, top: position.y, left: position.x }]} {...pan.panHandlers} />
            <FlatList
              data={initialValues[activeIndex].meals}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item, index }) => (
                <Meal
                  width={width}
                  index={index}
                  name={item.title}
                  source={item.image}
                  type={item.type}
                />
              )}
            />
          </Fragment>
        )
      }
    </View>
  )
}

interface MeapProps {
  index: number
  name: string
  type: string
  source: ImageSourcePropType
  width: number
}
function Meal ({ name, index, type, source, width }: MeapProps) {
  const [animation, setValue] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration : 500,
      delay: index * 100
    }).start()
    return () => {
      animation.setValue(0)
    }
  })
  return (
    <AnimatedImageBackground source={source} style={[s.meal, { width, opacity: animation }]}>
      <Title style={s.mealTitle}>{name}</Title>
    </AnimatedImageBackground>
  )
}

const height = 100
const s = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  meal: {
    padding: 10,
    margin: 5,
    height: height
  },
  mealTitle: {
    color: '#fff',
    alignSelf: 'flex-start',
    textShadowColor: '#000',
    textShadowOffset: { height: 0, width: 0 },
    textShadowRadius: 5,
    elevation: 2
  },
  day: {
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
    // opacity: 0.8,
    height: height,
    margin: 5,
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
    height: height + 10
  },
  today: {
    fontSize: 11,
    backgroundColor: lightRed,
    alignSelf: 'center',
    flexShrink: 1,
    textAlign: 'center',
    color: '#fff'
  }
})

export default Weeks