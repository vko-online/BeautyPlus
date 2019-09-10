import React, { useRef, useState } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { Title, Paragraph, Subheading, Headline, IconButton, Caption, Text, Button, TouchableRipple } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import { Rating } from 'react-native-ratings'
import Info, { data } from 'src/components/Info'
import { Hpane } from 'view-on-steroids'
import { Ionicons as Icon } from '@expo/vector-icons'
import BottomSheet from 'react-native-raw-bottom-sheet'
import { primary, darkGray, extraLightGray, lightRed, extraExtraLightGray } from 'src/constants/Colors'
import { TestKitchen } from 'src/components/Badges'
import Sheet from 'src/components/Sheet'

function HDivider () {
  return (
    <View style={{
      backgroundColor: darkGray,
      height: 30,
      width: StyleSheet.hairlineWidth,
      marginHorizontal: 10
    }} />
  )
}

interface Recipe {}
interface Props {
  recipe: Recipe
}
export default function Recipe ({ recipe }: Props) {
  const [favorited, setFav] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const testKitchenRef = useRef<BottomSheet>()
  return (
    <View style={s.container}>
      <ImageBackground
        source={require('./DD-382.jpg')}
        style={s.image}
      >
        <TestKitchen onPress={() => testKitchenRef.current.open()} />
        <Headline style={s.title}>Keto Caesar salad</Headline>
      </ImageBackground>
      <Hpane borderBottomWidth={1} borderBottomColor={extraLightGray} justifyContent='space-between' alignItems='center'>
        <Hpane justifyContent='flex-start' alignItems='center'>
          <Rating
            ratingCount={5}
            imageSize={25}
            type='star'
            ratingBackgroundColor='transparent'
            style={{ marginHorizontal: 20, marginVertical: 10 , alignSelf: 'flex-start' } as any}
          />
          <Caption>Based on 34 reviews</Caption>
        </Hpane>
        <Hpane justifyContent='flex-end' alignItems='center'>
          {/* <Icon name='ios-chatboxes' color={darkGray} size={25} style={{ margin: 10 }} /> */}
          <IconButton icon='print' color={darkGray} size={25} />
          {
            favorited
              ? <IconButton icon='favorite' color={lightRed} size={25} onPress={() => setFav(false)} />
              : <IconButton icon='favorite-border' color={darkGray} size={25} onPress={() => setFav(true)} />
          }
          {
            addedToCart
              ? <IconButton icon='remove-shopping-cart' color={lightRed} size={25} onPress={() => setAddedToCart(false)} />
              : <IconButton icon='add-shopping-cart' color={darkGray} size={25} onPress={() => setAddedToCart(true)} />
          }
        </Hpane>
      </Hpane>
      <Hpane justifyContent='flex-start' alignItems='center'>
        <Hpane justifyContent='center' alignItems='center' flex={.33}>
          <IconButton icon='watch-later' color={darkGray} />
          <Text>10 + 25 min</Text>
        </Hpane>
        <HDivider />
        <Hpane justifyContent='center' alignItems='center' flex={.33}>
          <IconButton icon='power-settings-new' color={darkGray} />
          <Text>Easy</Text>
        </Hpane>
        <HDivider />
        <TouchableRipple>
          <Hpane justifyContent='center' alignItems='center' flex={.33}>
            <IconButton icon='chat' color={darkGray} />
            <Text>Discussion</Text>
          </Hpane>
        </TouchableRipple>
      </Hpane>
      <Subheading style={s.content}>
        A true keto salad classic. Moist chicken and crispy bacon on a bed of crunchy Romain lettuce. In our version, we don't skimp on the dressing or the parmesan cheese!
      </Subheading>
      <Info
        info={data.info}
      />
      <Sheet
        refItem={testKitchenRef}
        height={314}
      >
        <View style={s.verified}>
          <Image style={s.secure} source={require('src/assets/images/secure.gif')} />
          <Title style={{ textAlign: 'center' }}>Test kitched verified</Title>
          <Paragraph>
            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
          </Paragraph>
          <Caption>
            From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage.
          </Caption>
        </View>
      </Sheet>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1
  },
  verified: {
    marginHorizontal: 20
  },
  secure: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  image: {
    height: 300,
    width: '100%',
    position: 'relative'
  },
  content: {
    paddingHorizontal: 20,
    marginVertical: 10
  },
  title: {
    backgroundColor: 'rgba(4, 4, 4, 0.4)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    color: '#fff'
  }
})
