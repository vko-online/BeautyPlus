import { Platform, Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, StackNavigatorConfig, createDrawerNavigator } from 'react-navigation'

import Dashboard from 'src/screens/Dashboard'
import Auth from 'src/screens/Auth'

import { black, activeIcon } from 'src/constants/Colors'

const config: StackNavigatorConfig = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
})

const DashboardStack: any = createStackNavigator(
  {
    Dashboard
  },
  config
)

DashboardStack.path = ''

const AuthStack: any = createStackNavigator(
  {
    Auth
  },
  config
)

AuthStack.path = ''

const rootNavigator: any = createStackNavigator({
  DashboardStack,
  AuthStack
}, {
  initialRouteName: 'DashboardStack'
})

rootNavigator.path = ''

export default rootNavigator
