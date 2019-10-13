import React, { useState } from 'react'
import { Portal, Menu, IconButton, Divider } from 'react-native-paper'
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

interface Props {
  navigation: NavigationScreenProp<any, any>
}
const today = new Date()
export default function Screen ({}: Props) {
  const [orders] = useState(data)
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
        todayIcon={todayView ? 'today' : 'date-range'}
      >
        <Menu
          visible={visible}
          onDismiss={() => setVisibility(false)}
          anchor={
            <IconButton icon='more-vert' theme={iconTheme} onPress={() => setVisibility(true)} />
          }
        >
          <Menu.Item
            onPress={() => {
              setClientVisible(true)
              setVisibility(false)
            }}
            title='שדח חוקל תפסוה'
            key='add client'
          />
          <Menu.Item
            onPress={() => {
              setServiceVisible(true)
              setVisibility(false)
            }}
            title='שדח לופיט תפסוה'
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
        <Agenda
          orders={orders}
          delimeter={delimeter}
          dates={dates}
          showSingle={todayView}
        />
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
const services = [
  'תספורת', 'חתך ציפורניים', 'זקן לקצץ', 'צבע שיער'
]
const colors = [
  '#0000FF',
  '#00008B',
  '#A52A2A',
  '#800000',
  '#808080',
  '#696969',
  '#008000',
  '#006400',
  '#FFA500',
  '#FF8C00',
  '#FFC0CB',
  '#FF69B4'
]
function createEvent () {
  return {
    service: faker.random.arrayElement(services),
    color: faker.random.arrayElement(colors),
    duration: faker.random.number({
      min: 30,
      max: 60,
      precision: 30
    }),
    date: faker.date.between(new Date(2019, 9, 11, 9, 0), new Date(2019, 9, 13, 17, 30))
  }
}
const data = Array.from({ length: faker.random.number({ min: 10, max: 30 }) }, createEvent)

Screen.navigationOptions = {
  header: null
}
