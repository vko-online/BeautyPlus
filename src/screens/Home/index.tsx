import React, { useRef } from 'react'
import {
  StyleSheet,
  Image,
  View,
  SectionList,
  SectionListData
} from 'react-native'
import { Button, TouchableRipple, Subheading, Caption, IconButton } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import BottomSheet from 'react-native-raw-bottom-sheet'
import { extraExtraLightGray, darkGray } from 'src/constants/Colors'
import Header from 'src/components/Header'
import Post from './Post'
import data from './_data.json'
import Sheet from './Sheet'
import { Hpane, Vpane } from 'view-on-steroids';
function noop () {
  // noop
}
interface IHeader {
  section: SectionListData<{ title: string }>
}
function SectionHeader ({ section: { title } }: IHeader) {
  return null
}
function ItemSeparator () {
  return <View style={{ backgroundColor: extraExtraLightGray, height: 10, width: '100%' }} />
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}
export default function Screen ({ navigation }: Props) {
  const bottomSheetRef = useRef<BottomSheet>()
  const filterSheetRef = useRef<BottomSheet>()
  return (
    <View style={s.container}>
      <Header title='Discover' onPress={() => filterSheetRef.current.open()} />
      <SectionList
        style={{ paddingHorizontal: 10, backgroundColor: extraExtraLightGray }}
        sections={data}
        renderSectionHeader={SectionHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item, index }) => (
          <Post
            key={index}
            post={item}
            onPress={noop}
            onRightPress={() => bottomSheetRef.current.open()}
          />
        )}
        initialNumToRender={3}
      />
      <Sheet refItem={filterSheetRef} height={310}>
        <Image style={{ alignSelf: 'center', width: 150, height: 150 }} source={require('src/assets/images/delivery.gif')} />
        <TouchableRipple onPress={noop}>
          <Hpane alignSelf='center' justifyContent='flex-start' alignItems='flex-start'>
            <IconButton icon='sort' color='rgb(101, 119, 134)' style={{ marginTop: 5 }} />
            <Vpane>
              <Subheading style={s.sortingText}>Show recent posts by interest</Subheading>
              <Caption>You can change this anytime</Caption>
            </Vpane>
          </Hpane>
        </TouchableRipple>
        <Button
          icon='settings'
          mode='text'
          uppercase={false}
          onPress={noop}
          theme={{ colors: { primary: darkGray } }}
        >
          Other content settings
        </Button>
      </Sheet>
      <Sheet refItem={bottomSheetRef}>
        <Button
          icon='add'
          mode='text'
          uppercase={false}
          onPress={noop}
          theme={{ colors: { primary: darkGray } }}
        >
          Add to meal plan
        </Button>
        <Button
          icon='add-shopping-cart'
          mode='text'
          uppercase={false}
          onPress={noop}
          theme={{ colors: { primary: darkGray } }}
        >
          Add ingredients to shopping cart
        </Button>
        <Button
          icon='favorite'
          mode='text'
          uppercase={false}
          onPress={noop}
          theme={{ colors: { primary: darkGray } }}
        >
          Add to favorites
        </Button>
        <Button
          icon='send'
          mode='text'
          uppercase={false}
          onPress={noop}
          theme={{ colors: { primary: darkGray } }}
        >
          Share
        </Button>
      </Sheet>
    </View>
  )
}

Screen.navigationOptions = {
  header: null
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  sheet: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  sortingText: {
    fontFamily: 'montserrat-medium',
    color: 'rgb(101, 119, 134)'
  }
})
