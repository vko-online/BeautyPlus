import React, { PureComponent } from 'react'
import { Image } from 'react-native'
import {
  DrawerItemsProps, NavigationScreenProp, DrawerNavigationState
} from 'react-navigation'
import { Avatar, Text, Drawer, Subheading, Caption, Divider, Dialog, Portal, Button, Paragraph } from 'react-native-paper'
// import { connect } from 'react-redux'
import { Scene, Hpane, Vpane } from 'view-on-steroids'

// import { logout } from '../actions/auth'

interface Props extends DrawerItemsProps {
  navigation: NavigationScreenProp<DrawerNavigationState>
}
interface State {
  visible: boolean
}

class DrawerComponent extends PureComponent<Props, State> {
  state: State = {
    visible: false
  }
  showDialog = () => this.setState({ visible: true })
  hideDialog = () => this.setState({ visible: false })
  handleSignOut = () => {
    // const { logout } = this.props
    // this.hideDialog()
    // logout()
  }
  renderUser = () => {
    return (
      <Hpane padding={20} justifyContent='flex-start' alignItems='center'>
        <Avatar.Image source={require('../assets/images/robot-dev.png')} />
        <Vpane marginLeft={20}>
          <Subheading>Medet Tleukabiluly</Subheading>
          <Caption>747 91 991 53</Caption>
        </Vpane>
      </Hpane>
    )
  }
  render () {
    const {
      navigation
    } = this.props
    const { visible } = this.state
    return (
      <Scene paddingTop={30}>
        {this.renderUser()}
        <Drawer.Section>
          <Drawer.Item active label='Profile' icon='settings' />
          <Drawer.Item label='Favorites' icon='format-list-bulleted' />
          <Drawer.Item label='My account' icon='account-circle' />
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item label='Premium' icon='check' onPress={() => navigation.navigate('About')} />
        </Drawer.Section>
        <Drawer.Item label='Log out' icon='exit-to-app' onPress={this.showDialog} />
        <Portal>
          <Dialog
             visible={visible}
             style={{ backgroundColor: '#fff' }}
             onDismiss={this.hideDialog}>
            <Dialog.Title>Exit</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode='text' onPress={this.hideDialog}>Cancel</Button>
              <Button mode='text' onPress={this.handleSignOut}>Logout</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Scene>
    )
  }
}

// const select = ({ auth }) => ({
//   auth
// })

// const action = (dispatch) => ({
//   logout: () => dispatch(logout())
// })

// export default connect(select, action)(DrawerComponent)
export default DrawerComponent
