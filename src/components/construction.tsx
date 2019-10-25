import React from 'react'
import { Image } from 'react-native'
import Page from 'src/components/Page'

export default function () {
  return (
    <Page justifyContent='center' alignItems='center'>
      <Image source={require('src/assets/images/under.png')} resizeMode='contain' style={{ width: 300 }} />
    </Page>
  )
}
