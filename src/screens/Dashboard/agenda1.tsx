import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity} from 'react-native'
import { Text, Headline, TouchableRipple } from 'react-native-paper'
import moment from 'moment'
import { groupBy } from 'lodash'
import { Hpane, Vpane } from 'view-on-steroids'
import { gray, graydark, white, lightGray, black, pink } from 'src/constants/Colors'
import Layout from 'src/constants/Layout'
import { Ionicons } from '@expo/vector-icons'

function getRangeOfDates (start, end, key, delimeter, arr = []) {
  if (start.isAfter(end)) throw new Error('start must precede end')
  const next = moment(start).add(delimeter, key).startOf(key)
  if (next.isAfter(end, key)) return arr
  return getRangeOfDates(next, end, key, delimeter, arr.concat(next))

}
interface Group {
  [key: string]: Date[]
}

const timeRangeHeight = 40
const timeRangeWidth = 70
const TIMERANGE = 'TIMERANGE'
interface RangeProps {
  group: Group
  days: Array<Date | string>
}
function Range ({ group, days }: RangeProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      {
        Object.keys(group).map((time, index) => (
          group[time].map((gr, indx) => (
            <Hpane key={`${index}-${indx}`} flexDirection='row-reverse'>
                {
                  days.map((day, i) => {
                    if (typeof day === 'string' && day === TIMERANGE) {
                      const groupTime = moment(gr).format('HH')
                      return (
                        <Hpane
                          key={indx}
                          width={timeRangeWidth}
                          paddingHorizontal={10}
                          alignItems='flex-start'
                          borderTopColor={gray}
                          borderTopWidth={indx === 0 ? StyleSheet.hairlineWidth : 0}
                        >
                          <View
                            style={[
                              s.slot,
                              (group[time].length - 1 !== indx) && s.slotBorder]
                            }>
                            <Text style={s.timerangeText}>{moment(gr).format('mm')}</Text>
                          </View>
                          {
                            indx === 0 && (
                              <Headline style={s.timerangeText}>{groupTime}</Headline>
                            )
                          }
                        </Hpane>
                      )
                    } else {
                      return (
                        <View key={`${index}-${indx}-${i}`} style={[s.range, indx === 0 && s.rangeFirst]} />
                      )
                    }
                  })
                }
              </Hpane>
          ))
        ))
      }
    </ScrollView>
  )
}

interface Props {
  delimeter: number
}
export default function ({ delimeter }: Props) {
  const employees = [{
    name: 'John',
    id: 0
  }, {
    name: 'Katrin',
    id: 1
  }, {
    name: 'Sebastian',
    id: 2
  }]
  const [activeId, setId] = useState(employees[0].id)
  const date = new Date()
  const startOfDay = moment(date).set('hour', 8).set('minute', 60 - delimeter)
  const endOfDay = moment(date).set('hour', 17).set('minute', 60 - delimeter)
  const slices = getRangeOfDates(startOfDay, endOfDay, 'minute', delimeter)
  const group = groupBy(slices, (slice) => moment(slice).hour())
  Object.keys(group).forEach(key => {
    group[key].sort((a, b) => {
      const _a = moment(a).get('minutes')
      const _b = moment(b).get('minutes')
      if (_b === 0) {
        return 1
      }
      return _a - _b
    })
  })
  const days = [moment(date).add(-1, 'day').toDate(), date, moment(date).add(1, 'day').toDate(), TIMERANGE]

  const otherEmployees = employees.filter(v => v.id !== activeId)
  const activeEmployee = employees.find(v => v.id === activeId)
  return (
    <Vpane alignItems='stretch'>
      <Hpane flexDirection='row-reverse' justifyContent='flex-start'>
        {
          days.map((day, index) => {
            if (typeof day === 'string' && day === TIMERANGE) {
              return null
            } else {
              return (
                <View key={index} style={s.headerDate}>
                  <Text style={s.headerText}>{moment(day).format('MMM DD')}</Text>
                </View>
              )
            }
          })
        }
      </Hpane>
      <Hpane flexDirection='row-reverse'>
        {
          otherEmployees.slice(0, 1).map((employee, index) => (
            <TouchableRipple key={index} onPress={() => setId(employee.id)}>
              <Vpane
                paddingTop={10}
                alignItems='center'
                borderWidth={StyleSheet.hairlineWidth}
                borderColor={lightGray}
                opacity={0.5}
                width={(Layout.window.width - timeRangeWidth) / 3}>
                <Ionicons name='ios-contact' size={30} />
                <Text>{employee.name}</Text>
              </Vpane>
            </TouchableRipple>
          ))
        }
        <Vpane
          paddingTop={10}
          alignItems='center'
          borderWidth={StyleSheet.hairlineWidth}
          borderColor={lightGray}
          opacity={1}
          width={(Layout.window.width - timeRangeWidth) / 3}>
          <Ionicons name='ios-contact' size={30} />
          <Text>{activeEmployee.name}</Text>
        </Vpane>
        {
          otherEmployees.slice(1).map((employee, index) => (
            <TouchableRipple key={index} onPress={() => setId(employee.id)}>
              <Vpane
                paddingTop={10}
                alignItems='center'
                borderWidth={StyleSheet.hairlineWidth}
                borderColor={lightGray}
                opacity={0.5}
                width={(Layout.window.width - timeRangeWidth) / 3}>
                <Ionicons name='ios-contact' size={30} />
                <Text>{employee.name}</Text>
              </Vpane>
            </TouchableRipple>
          ))
        }
        <View style={{ width: (Layout.window.width - timeRangeWidth) / 3 }} />
      </Hpane>
      <Range
        group={group}
        days={days}
      />
    </Vpane>
  )
}

const s = StyleSheet.create({
  headerDate: {
    width: (Layout.window.width - timeRangeWidth) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: pink
  },
  headerText: {
    color: black,
    fontFamily: 'levenim-bold'
  },
  timerange: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: gray
  },
  timerangeText: {
    color: gray
  },
  slotBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: gray
  },
  slot: {
    height: timeRangeHeight,
    justifyContent: 'center'
  },
  range: {
    width: (Layout.window.width - timeRangeWidth) / 3,
    height: timeRangeHeight,
    minHeight: timeRangeHeight,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderLeftColor: gray,
    borderBottomColor: gray
  },
  rangeFirst: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: gray
  }
})
