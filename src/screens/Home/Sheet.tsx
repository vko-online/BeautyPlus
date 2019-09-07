import React, { RefObject, ReactNode } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Headline, Appbar, Button, Title, Avatar, IconButton, Menu } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import BottomSheet from 'react-native-raw-bottom-sheet'
import { darkGray } from 'src/constants/Colors'
const { width } = Dimensions.get('window')
function noop () {
  // noop
}

function BottomSheetHeader () {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 36,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#eee'
    }}>
      <View style={{ width: 50, height: 6, borderRadius: 10, backgroundColor: '#eee' }} />
    </View>
  )
}

interface BottomSheetFooterProps {
  onPress?: () => void
}
function BottomSheetFooter ({ onPress }: BottomSheetFooterProps) {
  return (
    <View style={{
      width: '100%',
      height: 40,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#eee'
    }}>
      <Button
        mode='text'
        icon='close'
        uppercase={false}
        onPress={onPress}
        theme={{ colors: { primary: darkGray } }}
      >
        Close
      </Button>
    </View>
  )
}

interface Props {
  refItem: RefObject<BottomSheet>
  children: ReactNode
  height?: number
}
export default function Sheet ({ refItem, children, height }: Props) {
  const length = React.Children.count(children)
  return (
    <BottomSheet
      ref={refItem}
      height={height ? height : (length + 2) * 36}
      closeOnDragDown
      closeOnPressMask
      duration={250}
      customStyles={{
        wrapper: {
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: 'stretch'
        }
      }}
    >
      <View style={{ width, alignItems: 'stretch' }}>
        <BottomSheetHeader />
        {children}
        <BottomSheetFooter onPress={() => refItem.current.close()} />
      </View>
    </BottomSheet>
  )
}
