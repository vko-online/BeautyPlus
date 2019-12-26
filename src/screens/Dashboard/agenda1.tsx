import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  I18nManager
} from 'react-native'
import { Text, Headline, Surface, TouchableRipple } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/he'
import { groupBy, memoize } from 'lodash'
import { Hpane, Vpane } from 'view-on-steroids'
import { gray, lightGray, black, pink, white } from 'src/constants/Colors'
import Layout from 'src/constants/Layout'
import { Ionicons } from 'react-native-vector-icons'
import { Order } from './index'
import { CalendarEvent, User } from 'src/components/api'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
const direction = I18nManager.isRTL ? 'row-reverse' : 'row'
interface RangeProps {
  group: Group
  days: Array<Date | string>
  orders: CalendarEvent[]
  delimeter: number
  onPress: (order: CalendarEvent) => void
}
interface ExtractOrders {
  day: Date
  gr: Date
  delimeter: number
}
function extractOrders ({ day, gr, delimeter }: ExtractOrders, orders: CalendarEvent[]) {
  return orders
  .filter(v =>
    moment(v.StartDateTime, 'DD/MM/YYYY hh:mm:ss').isBetween(
      moment(day).set('hours', moment(gr).get('hours')).set('minutes', moment(gr).get('minutes')),
      moment(day).set('hours', moment(gr).get('hours')).set('minutes', moment(gr).get('minutes') + delimeter),
      'minutes',
      '[)'
    )
  )
}
function hashCode (str) { // java String#hashCode
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB (i) {
  let c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}
// const extract = memoize<(arg: ExtractOrders, orders: CalendarEvent[]) => CalendarEvent[]>(extractOrders)
function Range ({ group, days, orders, delimeter, onPress }: RangeProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}
    >
      {
        Object.keys(group).map((time, index) => (// 12:00
          group[time].map((gr, indx) => (
            <Hpane key={indx} flexDirection={direction}>
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
                      const dayDate = day as Date
                      const slotOrders = extractOrders({ day: dayDate, gr, delimeter }, orders)
                      return (
                        <View key={i} style={[s.range, indx === 0 && s.rangeFirst]}>
                          {
                            slotOrders.map((order, si) => (
                              <TouchableOpacity
                                key={si}
                                onPress={() => onPress(order)}
                                style={[
                                  s.slotOrder, {
                                    backgroundColor: `#${intToRGB(hashCode(order.EventId))}`,
                                    height: timeRangeHeight * (moment(order.StartDateTime, 'DD/MM/YYYY hh:mm:ss').diff(moment(order.EndDateTime, 'DD/MM/YYYY hh:mm:ss'), 'minutes')) / delimeter
                                  }
                                ]}
                              >
                                <Vpane width={80 / slotOrders.length}>
                                  <Text style={{ color: white, fontWeight: 'bold', fontSize: 10 }} numberOfLines={1}>
                                    {
                                      slotOrders.length > 1 ? null : `${order.IsLocked === '1' ? '🔒' : ''} ${moment(order.StartDateTime, 'DD/MM/YYYY hh:mm:ss').format('hh:mm')} - ${moment(order.EndDateTime, 'DD/MM/YYYY hh:mm:ss').format('hh:mm')}`
                                    }
                                  </Text>
                                  <Text style={{ color: white, fontSize: 12 }} numberOfLines={1}>
                                    {
                                      slotOrders.length > 1 ? null : order.ClientName
                                    }
                                  </Text>
                                </Vpane>
                              </TouchableOpacity>
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
  orders: CalendarEvent[]
  employees: User[]
  id: string
  onPress: (order: CalendarEvent) => void
  onSet: (id: string) => void
}
export default function ({ employees, delimeter, dates, showSingle, orders, id, onSet, onPress }: Props) {
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

  const otherEmployees = employees.filter(v => v.Id !== id)
  const activeEmployee = employees.find(v => v.Id === id)

  return (
    <Vpane alignItems='stretch'>
      <Surface style={{ elevation: 3 }}>
        {
          showSingle ? (
            <Hpane flexDirection={direction} justifyContent='flex-start'>
              <View style={[s.headerDate, s.headerDateSingle]}>
                <Text style={s.headerText}>{moment(days[1]).format('MMM DD')}</Text>
              </View>
            </Hpane>
          ) : (
            <Hpane flexDirection={direction} justifyContent='flex-start'>
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
            <Hpane flexDirection={direction} justifyContent='flex-start'>
              <Vpane
                paddingTop={10}
                alignItems='center'
                borderWidth={StyleSheet.hairlineWidth}
                borderColor={lightGray}
                opacity={1}
                width={(Layout.window.width - timeRangeWidth) / 3}>
                <Ionicons name='ios-contact' size={30} />
                <Text style={{ color: '#87CEFA' }}>{activeEmployee ? activeEmployee.UserName : 'Loading'}</Text>
              </Vpane>
              <Vpane
                paddingTop={10}
                alignItems='center'
                borderWidth={StyleSheet.hairlineWidth}
                borderColor={lightGray}
                opacity={1}
                width={(Layout.window.width - timeRangeWidth) / 3}>
                <Ionicons name='ios-contact' size={30} />
                <Text style={{ color: '#87CEFA' }}>{activeEmployee ? activeEmployee.UserName : 'Loading'}</Text>
              </Vpane>
              <Vpane
                paddingTop={10}
                alignItems='center'
                borderWidth={StyleSheet.hairlineWidth}
                borderColor={lightGray}
                opacity={1}
                width={(Layout.window.width - timeRangeWidth) / 3}>
                <Ionicons name='ios-contact' size={30} />
                <Text style={{ color: '#87CEFA' }}>{activeEmployee ? activeEmployee.UserName : 'Loading'}</Text>
              </Vpane>
            </Hpane>
          ) : (
            <Hpane flexDirection={direction}>
              {
                otherEmployees.slice(0, 1).map((employee, index) => (
                  <TouchableRipple key={index} onPress={() => onSet(employee.Id)}>
                    <Vpane
                      paddingTop={10}
                      alignItems='center'
                      borderWidth={StyleSheet.hairlineWidth}
                      borderColor={lightGray}
                      opacity={0.5}
                      width={(Layout.window.width - timeRangeWidth) / 3}>
                      <Ionicons name='ios-contact' size={30} />
                      <Text style={{ color: '#87CEFA' }}>{employee.UserName}</Text>
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
                <Text style={{ color: '#87CEFA' }}>{activeEmployee ? activeEmployee.UserName : 'Loading'}</Text>
              </Vpane>
              {
                otherEmployees.slice(1).map((employee, index) => (
                  <TouchableRipple key={index} onPress={() => onSet(employee.Id)}>
                    <Vpane
                      paddingTop={10}
                      alignItems='center'
                      borderWidth={StyleSheet.hairlineWidth}
                      borderColor={lightGray}
                      opacity={0.5}
                      width={width / 3}>
                      <Ionicons name='ios-contact' size={30} />
                      <Text style={{ color: '#87CEFA' }}>{employee.UserName}</Text>
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
        onPress={onPress}
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
    fontFamily: 'LevenimMT-Bold'
  },
  slotOrder: {
    flex: 1,
    padding: 5,
    borderRadius: 4
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: 'black'
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
    flexDirection: 'row',
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
