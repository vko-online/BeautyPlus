import { createBrowserApp } from '@react-navigation/web'
import { createSwitchNavigator } from 'react-navigation'

import MainNavigator, { authNavigator as AuthNavigator } from './MainNavigator'

const switchNavigator: any = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainNavigator,
  Auth: AuthNavigator
})

switchNavigator.path = ''

export default createBrowserApp(switchNavigator, { history: 'hash' })
