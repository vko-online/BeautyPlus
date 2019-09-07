import React from 'react'
import { Platform, Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, StackNavigatorConfig, createDrawerNavigator } from 'react-navigation'

import Drawer from './drawer'
import TabBarIcon from 'src/components/TabBarIcon'
import Home from 'src/screens/Home'
import ExploreScreen from 'src/screens/Explore'
import RecipesScreen from 'src/screens/Recipes'
import MealplanScreen from 'src/screens/Mealplan'
import AboutScreen from 'src/screens/About'

import { black, activeIcon } from 'src/constants/Colors'

const config: StackNavigatorConfig = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
})

const HomeStack: any = createStackNavigator(
  {
    Home
  },
  config
)

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => {
    if (focused) {
      return <Image style={[s.iconHome, s.active]} source={require('src/assets/icons/home.png')} />
    }
    return <Image style={s.iconHome} source={require('src/assets/icons/home.png')} />
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
      return <Image style={[s.iconSearch, s.active]} source={require('src/assets/icons/search.png')} />
    }
    return <Image style={s.iconSearch} source={require('src/assets/icons/search.png')} />
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
      return <Image style={[s.icon, s.active]} source={require('src/assets/icons/recipes.png')} />
    }
    return <Image style={s.icon} source={require('src/assets/icons/recipes.png')} />
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
      return <Image style={[s.iconMealplan, s.active]} source={require('src/assets/icons/mealplan.png')} />
    }
    return <Image style={s.iconMealplan} source={require('src/assets/icons/mealplan.png')} />
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
    width: 38,
    height: 38,
    tintColor: black
  },
  iconHome: {
    width: 52,
    height: 52,
    tintColor: black
  },
  iconSearch: {
    width: 36,
    height: 36,
    tintColor: black
  },
  iconMealplan: {
    width: 42,
    height: 42,
    tintColor: black
  },
  active: {
    tintColor: activeIcon
  }
})
export default rootNavigator
