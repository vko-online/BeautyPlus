import React, { useRef } from 'react'
import {
  StyleSheet,
  Image,
  View,
  SectionList,
  SectionListData
} from 'react-native'
import { Button, TouchableRipple, Subheading, Caption, IconButton, Headline, Surface } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import { Hpane, Vpane } from 'view-on-steroids'
// import SvgUri from 'react-native-svg-uri'
import { extraExtraLightGray, darkGray, extraLightGray } from 'src/constants/Colors'
import Header from 'src/components/Header'
import BottomSheet from 'react-native-raw-bottom-sheet'
import Sheet from 'src/components/Sheet'
import Post from './Post'
import data from './_data.json'
function noop () {
  // noop
}
interface IHeader {
  section: SectionListData<{ title: string }>
}
function SectionHeader ({ section: { title } }: IHeader) {
  return (
    <View style={s.header}>
      <View style={[s.surface, { top: 2, right: 0, left: 35 }]}>
        <Headline style={{ color: '#fff' }}>{title}</Headline>
      </View>
      <View style={[s.surface, { top: 3, right: 3, left: 22 }]}>
        <Headline style={{ color: '#fff' }}>{title}</Headline>
      </View>
      <View style={[s.surface, { top: 6, right: 6, left: 10 }]}>
        <Headline style={{ color: '#fff' }}>{title}</Headline>
      </View>
      <View style={[s.surface, { top: 10, right: 9, left: 0 }]}>
        <Headline style={{ color: '#fff' }}>{title}</Headline>
      </View>
    </View>
  )
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
        style={s.list}
        sections={data}
        keyExtractor={(item, index) => `${index}`}
        renderSectionHeader={SectionHeader}
        // ItemSeparatorComponent={ItemSeparator}
        renderItem={({ section, index }) => {
          if (index % 2 !== 0) return null
          let items = []
          for (let i = index; i < index + 2; i++) {
            if (i >= section.data.length) {
              break
            }

            items.push((
              <Post
                key={i}
                post={section.data[i]}
                onPress={noop}
                onRightPress={() => bottomSheetRef.current.open()}
              />
            ))
          }

          return (
            <View
              key={index}
              style={{
                paddingHorizontal: 3,
                flexDirection: 'row',
                justifyContent: 'flex-start'
              }}
            >
              {items}
            </View>
          )
        }}
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
  list: {
    backgroundColor: extraExtraLightGray
  },
  sheet: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  sortingText: {
    fontFamily: 'montserrat-medium',
    color: 'rgb(101, 119, 134)'
  },
  header: {
    backgroundColor: '#fff',
    position: 'relative',
    marginHorizontal: 3,
    height: 60
  },
  surface: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    borderBottomWidth: 0,
    paddingVertical: 10,
    backgroundColor: '#434343',
    paddingHorizontal: 15
  }
})
