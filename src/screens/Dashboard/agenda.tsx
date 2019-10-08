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
import { white } from 'src/constants/Colors'
import { Dropdown } from 'react-native-material-dropdown'
import { generateSlots } from './calendar'

interface Props {
}
export default function ({}: Props) {
  const [menuVisible, setMenuVisible] = useState(false)
  const [delimeter, setDelimeter] = useState(20)
  return (
    <Page>
      <TopBar>
        <Dropdown
          label='20'
          value={delimeter}
          data={delimeters}
          onChangeText={(val) => setDelimeter(Number(val))}
          labelFontSize={16}
          style={s.dropdownInput}
          containerStyle={s.dropdown}
        />
      </TopBar>
      <Hpane>
        <SectionList
          sections={data}
          ListHeaderComponent={(
            <Hpane>
              {
                employess.slice(0, 3).map((employee, index) => (
                  <Client name={employee} date={new Date()} />
                ))
              }
            </Hpane>
          )}
          renderItem={({ item, index }) => (
            <Pane borderWidth={1} borderColor='#000' height={30}>
              {null}
            </Pane>
          )}
        />
      </Hpane>
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
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: white,
    borderColor: 'rgb(170, 184, 194)',
    borderRadius: 3,
    height: 58,
    width: 30
  },
  dropdownInput: {
    borderWidth: 0
  }
})