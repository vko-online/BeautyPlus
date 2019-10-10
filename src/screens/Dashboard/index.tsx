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
import 'twix'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
const today = new Date()
export default function Screen ({}: Props) {
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
          <Divider />
          <Menu.Item
            onPress={() => {
              setOrderVisible(true)
              setVisibility(false)
            }}
            title='add order'
            key='add order'
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
        <Agenda delimeter={delimeter} dates={dates} showSingle={todayView} />
      </Page>
    </Page>
  )
}

Screen.navigationOptions = {
  header: null
}
