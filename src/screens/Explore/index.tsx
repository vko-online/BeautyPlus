import React, { useState, useRef, useCallback } from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Headline, Appbar, Button, Searchbar, Avatar } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import { NavigationScreenProp } from 'react-navigation'

import { MonoText } from 'src/components/StyledText'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  const [focused, setFocus] = useState(false)
  const handlePress = useCallback(() => {
    if (!focused) {
      navigation.toggleDrawer()
    } else {
      setFocus(false)
    }
  }, [focused, setFocus])

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ zIndex: 100 }} theme={{ colors: { primary: '#fff' } }}>
        <Searchbar
          style={{ flex: 1 }}
          icon={focused ? 'keyboard-backspace' : 'menu'}
          onIconPress={handlePress}
          clearIcon='settings'
          clearButtonMode='always'
          placeholder='Search in recipes, meal plans, etc'
          onFocus={() => setFocus(true)}
        />
      </Appbar.Header>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('src/assets/images/robot-dev.png')
                : require('src/assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View>
    </View>
  )
}

Screen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})
