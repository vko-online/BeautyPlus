import React, { useState } from 'react'
import {
  StyleSheet, View
} from 'react-native'
import {
  Text
} from 'react-native-paper'
import Page from 'src/components/Page'
import UnderConstruction from 'src/components/construction'
import { black } from 'src/constants/Colors'
import { Agenda, LocaleConfig } from 'react-native-calendars'
LocaleConfig.locales['he'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
}

LocaleConfig.defaultLocale = 'he'

interface Props {
}

export default function ({}: Props) {
  const [items, setItems] = useState({})

  function renderItem (item) {
    return (
      <View style={[s.item, { height: item.height }]}><Text>{item.name}</Text></View>
    )
  }

  function renderEmptyDate () {
    return (
      <View style={s.emptyDate}><Text>This is empty date!</Text></View>
    )
  }

  function rowHasChanged (r1, r2) {
    return r1.name !== r2.name
  }

  function timeToString (time) {
    const date = new Date(time)
    return date.toISOString().split('T')[0]
  }

  function loadItems (day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000
        const strTime = timeToString(time)
        if (!items[strTime]) {
          items[strTime] = []
          const numItems = Math.floor(Math.random() * 5)
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            })
          }
        }
      }
      const newItems = {}
      Object.keys(items).forEach(key => {
        newItems[key] = items[key]
      })
      setItems(newItems)
    }, 1000)
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  return (
    <Page>
      {/* <UnderConstruction /> */}
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2019-08-16'}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    </Page>
  )
}

const s = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
})
