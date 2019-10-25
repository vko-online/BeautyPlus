import { Platform } from 'react-native'
import { createStackNavigator, StackNavigatorConfig } from 'react-navigation'

import Dashboard from 'src/screens/Dashboard'
import Login from 'src/screens/Auth/Login'

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
    Login
  },
  config
)

AuthStack.path = ''

const rootNavigator: any = createStackNavigator({
  DashboardStack
}, {
  initialRouteName: 'DashboardStack',
  headerMode: 'none'
})

rootNavigator.path = ''

const authNavigator: any = createStackNavigator({
  AuthStack
}, {
  initialRouteName: 'AuthStack',
  headerMode: 'none'
})

authNavigator.path = ''

export { authNavigator }

export default rootNavigator
