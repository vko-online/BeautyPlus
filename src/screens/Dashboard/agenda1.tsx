import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native'
import { Text, Headline, Surface, TouchableRipple } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/he'
import { groupBy, memoize } from 'lodash'
import { Hpane, Vpane } from 'view-on-steroids'
import { gray, lightGray, black, pink, white } from 'src/constants/Colors'
import Layout from 'src/constants/Layout'
import { Ionicons } from '@expo/vector-icons'
import { Order } from './index'

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
const width = (Layout.window.width - timeRangeWidth)
interface RangeProps {
  group: Group
  days: Array<Date | string>
  orders: Order[]
  delimeter: number
}
function extractOrders ({ day, gr, delimeter }, orders) {
  return orders
  .filter(v =>
    moment(v.date).isBetween(
      moment(day).set('hours', moment(gr).get('hours')).set('minutes', moment(gr).get('minutes')),
      moment(day).set('hours', moment(gr).get('hours')).set('minutes', moment(gr).get('minutes') + delimeter),
      'minutes',
      '[]'
    )
  )
}
const extract = memoize(extractOrders)
function Range ({ group, days, orders, delimeter }: RangeProps) {
  // function renderGroup () {

  // }
  // function renderGroupTime () {

  // }
  // function renderDay ({ item, index }, time, gr, day, indx) {
  //   const groupTime = moment(gr).format('HH')
  //   if (typeof day === 'string' && day === TIMERANGE) {
  //     return (
  //       <Hpane
  //         key={index}
  //         width={timeRangeWidth}
  //         paddingHorizontal={10}
  //         alignItems='flex-start'
  //         borderTopColor={gray}
  //         borderTopWidth={indx === 0 ? StyleSheet.hairlineWidth : 0}
  //       >
  //         <View
  //           style={[
  //             s.slot,
  //             (group[time].length - 1 !== indx) && s.slotBorder]
  //           }>
  //           <Text style={s.timerangeText}>{moment(gr).format('mm')}</Text>
  //         </View>
  //         {
  //           indx === 0 && (
  //             <Headline style={s.timerangeText}>{groupTime}</Headline>
  //           )
  //         }
  //       </Hpane>
  //     )
  //   } else {
  //     const slotOrders = extract({ day, gr, delimeter }, orders)
  //     return (
  //       <View key={index} style={[s.range, indx === 0 && s.rangeFirst]}>
  //         {
  //           slotOrders.map((order, si) => (
  //             <View
  //               key={si}
  //               style={[
  //                 s.slotOrder, {
  //                   backgroundColor: order.color,
  //                   height: timeRangeHeight * order.duration / delimeter
  //                 }
  //               ]}
  //             >
  //               <Text style={{ color: white }}>
  //                 {
  //                   order.service
  //                 }
  //               </Text>
  //             </View>
  //           ))
  //         }
  //       </View>
  //     )
  //   }
  // }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      {
        Object.keys(group).map((time, index) => (// 12:00
          group[time].map((gr, indx) => (
            <Hpane key={indx} flexDirection='row-reverse'>
                {
                  days.map((day, i) => {// 1, 2, 3
                    const groupTime = moment(gr).format('HH')
                    if (typeof day === 'string' && day === TIMERANGE) {
                      return (
                        <Hpane
                          key={i}
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
                      const slotOrders = extract({ day, gr, delimeter }, orders)
                      return (
                        <View key={i} style={[s.range, indx === 0 && s.rangeFirst]}>
                          {
                            slotOrders.map((order, si) => (
                              <View
                                key={si}
                                style={[
                                  s.slotOrder, {
                                    backgroundColor: order.color,
                                    height: timeRangeHeight * order.duration / delimeter
                                  }
                                ]}
                              >
                                <Text style={{ color: white }}>
                                  {
                                    order.service
                                  }
                                </Text>
                              </View>
                            ))
                          }
                        </View>
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
  dates: Date[]
  showSingle?: boolean
  orders: Order[]
}
export default function ({ delimeter, dates, showSingle, orders }: Props) {
  const employees = [{
    name: 'נתנאל',
    id: 0
  }, {
    name: 'אדם',
    id: 1
  }, {
    name: 'בצלאל',
    id: 2
  }]
  const [activeId, setId] = useState(employees[0].id)
  const date = new Date()
  const startOfDay = moment(date).set('hour', 7).set('minute', 60 - delimeter)
  const endOfDay = moment(date).set('hour', 23).set('minute', 60 - delimeter)
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
  const days = [...dates, TIMERANGE]

  const otherEmployees = employees.filter(v => v.id !== activeId)
  const activeEmployee = employees.find(v => v.id === activeId)

  return (
    <Vpane alignItems='stretch'>
      <Surface style={{ elevation: 3 }}>
        {
          showSingle ? (
            <Hpane flexDirection='row-reverse' justifyContent='flex-start'>
              <View style={[s.headerDate, s.headerDateSingle]}>
                <Text style={s.headerText}>{moment(days[1]).format('MMM DD')}</Text>
              </View>
            </Hpane>
          ) : (
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
          )
        }
        {
          showSingle ? (
            <Hpane flexDirection='row-reverse' justifyContent='flex-start'>
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
            </Hpane>
          ) : (
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
                      width={width / 3}>
                      <Ionicons name='ios-contact' size={30} />
                      <Text>{employee.name}</Text>
                    </Vpane>
                  </TouchableRipple>
                ))
              }
              <View style={{ width: width / 3 }} />
            </Hpane>
          )
        }
      </Surface>
      <Range
        group={group}
        orders={orders}
        days={days}
        delimeter={delimeter}
      />
    </Vpane>
  )
}

const s = StyleSheet.create({
  headerDate: {
    width: width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: pink
  },
  headerDateSingle: {
    width
  },
  headerText: {
    color: black,
    fontFamily: 'levenim-bold'
  },
  slotOrder: {
    width: width / 3,
    padding: 5,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black'
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
    width: width / 3,
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
