import { parseString } from 'react-native-xml2js'
import moment from 'moment'
import { get } from 'lodash'

const defaults = {
  url: 'http://www.hairsoft.co.il',
  user: 'medet',
  token: '162F6FCF3A35C84E6B288A51CA3E5FE88392E66823A869C659AC01BCBD216DA4',
  format: 'DDMMYYYYhhmm'
}

function getUrl (params = {}) {
  const val = {
    ...params,
    token: defaults.token
  }
  const query = Object
    .keys(val)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(val[k]))
    .join('&')

  return `${defaults.url}/api.aspx?${query}`
}

interface User {
  Id: string
  UserName: string
  UserPassword: string
  UserGroupId: string
  CompanyName: string
  Email: string
  FullName: string
  ColorId: string
}
export function getUsers (): Promise<User[]> {
  const url = getUrl({
    action: 'GetUsers'
  })
  return fetch(url).then(res => res.json()).then(res => res.response.items)
}

export function calendarAddEvent (
  userName: string,
  startDateTime: number,
  endDateTime: number,
  clientName: string,
  eventName: string,
  eventDescription: string,
  addbyUsername: number
  ): Promise<void> {
  const url = getUrl({
    action: 'CalendarAddEvent',
    userName,
    startDateTime,
    endDateTime,
    clientName,
    eventName,
    eventDescription,
    addbyUsername
  })
  return fetch(url).then(res => res.json()).then(res => res.response.items)
}

interface GetCalendarEvents {
  from: Date
}
export function getCalendarEvents ({ from }: GetCalendarEvents) {
  
}

export interface CalendarEvent {
  id: string
  userId: number
  startDate: Date
  endDate: Date
  clientName: string
  serviceName: string
  serviceDescription: string
  addedByUserId: number
  isLocked: boolean
  createdDate: Date
  color: string
}