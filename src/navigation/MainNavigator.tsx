import { Platform } from 'react-native'
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation'

import Dashboard from 'src/screens/Dashboard'
import Login from 'src/screens/Auth/Login'

import AddService from 'src/screens/Add/Service'
import AddOrder from 'src/screens/Add/Order'
import AddClient from 'src/screens/Add/Client'

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

const AddStack: any = createStackNavigator(
  {
    AddService,
    AddOrder,
    AddClient
  },
  {
    ...config,
    mode: 'modal'
  }
)

AddStack.path = ''

const AuthStack: any = createStackNavigator(
  {
    Login
  },
  config
)

AuthStack.path = ''

const rootNavigator: any = createStackNavigator({
  DashboardStack,
  AddStack
}, {
  initialRouteName: 'DashboardStack',
  headerMode: 'none'
})

rootNavigator.path = ''

const authNavigator: any = createStackNavigator({
  AuthStack
}, {
  initialRouteName: 'AuthStack'
})

authNavigator.path = ''

export { authNavigator }

export default rootNavigator
