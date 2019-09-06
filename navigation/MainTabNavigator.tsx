import React from 'react'
import { Platform, Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, StackNavigatorConfig, createDrawerNavigator } from 'react-navigation'

import Drawer from './drawer'
import TabBarIcon from '../components/TabBarIcon'
import Screen from '../screens/Home'
import ExploreScreen from '../screens/Explore'
import RecipesScreen from '../screens/Recipes'
import MealplanScreen from '../screens/Mealplan'
import AboutScreen from '../screens/About'

import { black, activeIcon } from '../constants/Colors'

const config: StackNavigatorConfig = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
})

const HomeStack: any = createStackNavigator(
  {
    Home: Screen
  },
  config
)

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <Image style={[s.icon, s.active]} source={require('../assets/icons/home.png')} />
    }
    return <Image style={s.icon} source={require('../assets/icons/home.png')} />
  }
}

HomeStack.path = ''

const ExploreStack: any = createStackNavigator(
  {
    Explore: ExploreScreen
  },
  config
)

ExploreStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <Image style={[s.icon, s.active]} source={require('../assets/icons/search.png')} />
    }
    return <Image style={s.icon} source={require('../assets/icons/search.png')} />
  }
}

ExploreStack.path = ''

const RecipesStack: any = createStackNavigator(
  {
    Recipes: RecipesScreen
  },
  config
)

RecipesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <Image style={[s.icon, s.active]} source={require('../assets/icons/recipes.png')} />
    }
    return <Image style={s.icon} source={require('../assets/icons/recipes.png')} />
  }
}

RecipesStack.path = ''

const MealplanStack: any = createStackNavigator(
  {
    Meaplan: MealplanScreen
  },
  config
)

MealplanStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <Image style={[s.icon, s.active]} source={require('../assets/icons/mealplan.png')} />
    }
    return <Image style={s.icon} source={require('../assets/icons/mealplan.png')} />
  }
}

MealplanStack.path = ''

const tabNavigator: any = createBottomTabNavigator({
  HomeStack,
  ExploreStack,
  RecipesStack,
  MealplanStack
}, {
  tabBarOptions: {
    showLabel: false
  }
})

tabNavigator.path = ''

const rootNavigator: any = createDrawerNavigator({
  Tabs: tabNavigator,
  About: AboutScreen
}, {
  initialRouteName: 'Tabs',
  contentComponent: (props) => <Drawer {...props} />
})

rootNavigator.path = ''

const s = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    tintColor: black
  },
  active: {
    tintColor: activeIcon
  }
})
export default rootNavigator
