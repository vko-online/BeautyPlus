import React, { useState, useEffect } from 'react'
import { Portal, Menu, IconButton, ActivityIndicator } from 'react-native-paper'
import { NavigationScreenProp } from 'react-navigation'
import Header from './header'
import Page from 'src/components/Page'
import AddClient from 'src/screens/Add/Client'
import AddService from 'src/screens/Add/Service'
import AddOrder from 'src/screens/Add/Order'
import { iconTheme } from 'src/constants/Colors'
import Agenda from './agenda1'
import Timerange from './timerange'
import moment from 'moment'
import faker from 'faker'
import 'twix'
import { getCalendarEvents, CalendarEvent } from 'src/components/api'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
const today = new Date()
export default function Screen ({}: Props) {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Array<CalendarEvent>>([])
  const [visible, setVisibility] = useState(false)
  const [clientVisible, setClientVisible] = useState(false)
  const [orderVisible, setOrderVisible] = useState(false)
  const [serviceVisible, setServiceVisible] = useState(false)
  const [delimeter, setDelimeter] = useState(20)
  const [todayView, setTodayView] = useState(false)
  const [dates, setDates] = useState([
    moment(today).add(-1, 'days').toDate(),
    today,
    moment(today).add(1, 'days').toDate()
  ])
  useEffect(() => {
    getCalendarEvents({
      from: dates[0]
    }).then((data: Array<CalendarEvent>) => {
      setOrders(data)
      setLoading(false)
    }).catch(console.warn)
  }, [dates])
  const range = moment(dates[0]).twix(dates[dates.length - 1], { allDay: true }).format()

  function goBack () {
    setDates(dates.map(v => moment(v).add(-1, 'days').toDate()))
  }
  function goForward () {
    setDates(dates.map(v => moment(v).add(1, 'days').toDate()))
  }
  return (
    <Page>
      <Header
        text={todayView ? moment(dates[1]).format('MMM DD') : range}
        onLeft={goBack}
        onRight={goForward}
        onAdd={() => setOrderVisible(true)}
        onToday={() => setTodayView(!todayView)}
        todayIcon={todayView ? 'calendar-today' : 'calendar-week'}
      >
        <Menu
          visible={visible}
          onDismiss={() => setVisibility(false)}
          anchor={
            <IconButton icon='dots-vertical' theme={iconTheme} onPress={() => setVisibility(true)} />
          }
        >
          <Menu.Item
            onPress={() => {
              setClientVisible(true)
              setVisibility(false)
            }}
            title='הוספת לקוח חדש'
            key='add client'
          />
          <Menu.Item
            onPress={() => {
              setServiceVisible(true)
              setVisibility(false)
            }}
            title='הוספת םיפול חרש'
            key='add service'
          />
        </Menu>
      </Header>
      <Portal>
        <AddClient visible={clientVisible} onDismiss={() => setClientVisible(false)} />
        <AddService visible={serviceVisible} onDismiss={() => setServiceVisible(false)} />
        <AddOrder visible={orderVisible} onDismiss={() => setOrderVisible(false)} />
      </Portal>
      <Page>
        <Timerange delimeter={delimeter} setDelimeter={setDelimeter} />
        {
          loading ? (
            <Page justifyContent='center' alignItems='center'>
              <ActivityIndicator />
            </Page>
          ) : (
            <Agenda
              orders={orders}
              delimeter={delimeter}
              dates={dates}
              showSingle={todayView}
            />
          )
        }
      </Page>
    </Page>
  )
}

export interface Order {
  date: Date
  service: string
  duration: number
  color: string
}

Screen.navigationOptions = {
  header: null
}
