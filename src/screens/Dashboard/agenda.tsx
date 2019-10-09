import React, { useState } from 'react'
import {
  StyleSheet, View,
  SectionList
} from 'react-native'
import {
  IconButton,
  Text
} from 'react-native-paper'
import Page from 'src/components/Page'
import Client from './client'
import Pane, { Hpane } from 'view-on-steroids'
import { groupBy } from 'lodash'
import TopBar from 'src/components/TopBar'
import UnderConstruction from 'src/components/construction'
import { white, graydark, gray, black } from 'src/constants/Colors'
import { Dropdown } from 'react-native-material-dropdown'
import { Ionicons } from '@expo/vector-icons'
import { generateSlots } from './calendar'

interface Props {
}
export default function ({}: Props) {
  const [menuVisible, setMenuVisible] = useState(false)
  const [delimeter, setDelimeter] = useState(20)
  return (
    <Page>
      <TopBar style={{ borderTopColor: white, borderTopWidth: StyleSheet.hairlineWidth }}>
        <Dropdown
          value={delimeter}
          data={delimeters}
          rippleCentered
          rippleInsets={{ top: 0, left: 0, right: 0, bottom: 0 }}
          renderBase={() => (
            <View style={s.base}>
              <Ionicons name='md-arrow-dropdown' size={22} color={gray} />
              <Text style={s.baseText}>20</Text>
            </View>
          )}
          onChangeText={(val) => setDelimeter(Number(val))}
          labelFontSize={13}
          style={s.dropdownInput}
          containerStyle={s.dropdown}
        />
      </TopBar>
      <UnderConstruction />
      {/* <Hpane>
        <SectionList
          sections={data}
          ListHeaderComponent={(
            <Hpane>
              {
                employess.slice(0, 3).map((employee, index) => (
                  <Client key={index} name={employee} date={new Date()} />
                ))
              }
            </Hpane>
          )}
          renderItem={({ item, index }) => (
            <Pane borderWidth={1} borderColor='#000' height={30} key={index}>
              {null}
            </Pane>
          )}
        />
      </Hpane> */}
    </Page>
  )
}

const workingStart = '9:00'
const workingEnd = '18:00'
const employess = ['emp1', 'emp2', 'emp3', 'emp4', 'emp5']
const delimeters = [{ value: '20' }, { value: '30' }, { value: '60' } ]
const data = [{
  title: 'TITLE',
  data: generateSlots(new Date(2019, 9, 8, 9, 0, 6), new Date(2019, 9, 8, 18, 0, 6), 20),
  data1: [{
    name: 'החפשמ םש',
    startTime: new Date(2019, 9, 8, 14, 55, 6),
    endTime: new Date(2019, 9, 8, 15, 15, 6)
  }, {
    name: 'החפשמ םש',
    startTime: new Date(2019, 9, 7, 12, 55, 6),
    endTime: new Date(2019, 9, 7, 13, 15, 6)
  }, {
    name: 'החפשמ םש',
    startTime: new Date(2019, 9, 9, 14, 25, 6),
    endTime: new Date(2019, 9, 9, 15, 35, 6)
  }]
}]

const s = StyleSheet.create({
  dropdown: {
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'rgb(170, 184, 194)',
    // borderRadius: 3,
    width: 56,
    // height: 60,
    marginLeft: 20
    // padding: 0
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start'
  },
  base: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10
  },
  baseText: {
    marginRight: 6,
    color: black,
    fontFamily: 'levenim-bold'
  },
  dropdownInput: {
    color: '#fff',
    margin: 0,
    padding: 0
  }
})
